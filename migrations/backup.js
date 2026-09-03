/*==========================================================*
 * Rolling database backup                                  *
 * Saved before upgrade or import; one snapshot in PouchDB  *
 *==========================================================*/

var BACKUP_DB_NAME = "BeyBuilderX_migration_backup";
var BACKUP_DOC_ID = "snapshot";

/**
 * @param {PouchDB.Database} db
 * @returns {Promise<object[]>}
 */
async function fetchAllDocsForBackup(db) {
    var result = await db.allDocs({ include_docs: true });
    return result.rows.map(function (row) {
        var doc = Object.assign({}, row.doc);
        delete doc._rev;
        return doc;
    });
}

/**
 * @param {{beyBladeDBX: PouchDB.Database, recordsDBX: PouchDB.Database, settings: PouchDB.Database}} dbs
 * @returns {Promise<{beyBladeDBX: object[], recordsDBX: object[], settings: object[]}>}
 */
async function dumpDatabases(dbs) {
    return {
        beyBladeDBX: await fetchAllDocsForBackup(dbs.beyBladeDBX),
        recordsDBX: await fetchAllDocsForBackup(dbs.recordsDBX),
        settings: await fetchAllDocsForBackup(dbs.settings)
    };
}

/**
 * @param {{beyBladeDBX: PouchDB.Database, recordsDBX: PouchDB.Database, settings: PouchDB.Database}} dbs
 * @returns {Promise<boolean>}
 */
async function databasesHaveUserData(dbs) {
    var bey = await dbs.beyBladeDBX.allDocs({ limit: 1 });
    var records = await dbs.recordsDBX.allDocs({ limit: 1 });
    return bey.total_rows > 0 || records.total_rows > 0;
}

/**
 * @param {string} isoCreatedAt
 * @returns {string}
 */
function formatBackupCreatedAt(isoCreatedAt) {
    if (!isoCreatedAt) {
        return "Unknown time";
    }
    var date = new Date(isoCreatedAt);
    if (isNaN(date.getTime())) {
        return isoCreatedAt;
    }
    return date.toLocaleString();
}

/**
 * @param {{beyBladeDBX: PouchDB.Database, recordsDBX: PouchDB.Database, settings: PouchDB.Database}} dbs
 * @param {{from: string|null, to: string|null, reason: string}} meta
 */
async function saveBackup(dbs, meta) {
    var backupDb = new PouchDB(BACKUP_DB_NAME);
    var data = await dumpDatabases(dbs);
    var createdAt = new Date().toISOString();
    var doc = {
        _id: BACKUP_DOC_ID,
        createdAt: createdAt,
        fromRevision: meta.from,
        toRevision: meta.to,
        reason: meta.reason,
        beyBladeDBX: data.beyBladeDBX,
        recordsDBX: data.recordsDBX,
        settings: data.settings
    };

    try {
        var existing = await backupDb.get(BACKUP_DOC_ID);
        doc._rev = existing._rev;
    } catch (err) {
        if (err.name !== "not_found" && err.status !== 404) {
            throw err;
        }
    }

    await backupDb.put(doc);
    console.log("Backup saved (" + meta.reason + ") at " + formatBackupCreatedAt(createdAt));
}

/**
 * @returns {Promise<{createdAt: string, createdAtLabel: string, fromRevision: string|null, toRevision: string|null, reason: string}|null>}
 */
async function getBackupInfo() {
    var backupDb = new PouchDB(BACKUP_DB_NAME);
    try {
        var doc = await backupDb.get(BACKUP_DOC_ID);
        return {
            createdAt: doc.createdAt || null,
            createdAtLabel: formatBackupCreatedAt(doc.createdAt),
            fromRevision: doc.fromRevision,
            toRevision: doc.toRevision,
            reason: doc.reason
        };
    } catch (err) {
        if (err.name === "not_found" || err.status === 404) {
            return null;
        }
        throw err;
    }
}

/**
 * @returns {Promise<{beyBladeDBX: object[], recordsDBX: object[], settings: object[]}>}
 */
async function getBackupExportData() {
    var backupDb = new PouchDB(BACKUP_DB_NAME);
    var snapshot = await backupDb.get(BACKUP_DOC_ID);

    if (!snapshot.beyBladeDBX || !snapshot.recordsDBX || !snapshot.settings) {
        throw new Error("Backup snapshot is missing database data");
    }

    return {
        beyBladeDBX: snapshot.beyBladeDBX,
        recordsDBX: snapshot.recordsDBX,
        settings: snapshot.settings
    };
}

/**
 * Destroy live DBs and restore from the rolling backup snapshot.
 * @returns {Promise<{beyBladeDBX: PouchDB.Database, recordsDBX: PouchDB.Database, settings: PouchDB.Database}>}
 */
async function restoreBackup() {
    var backupDb = new PouchDB(BACKUP_DB_NAME);
    var snapshot = await backupDb.get(BACKUP_DOC_ID);

    if (!snapshot.beyBladeDBX || !snapshot.recordsDBX || !snapshot.settings) {
        throw new Error("Backup snapshot is missing database data");
    }

    var liveBey = new PouchDB("BeyBladesX");
    var liveRecords = new PouchDB("RecordX");
    var liveSettings = new PouchDB("settings");

    await liveBey.destroy();
    await liveRecords.destroy();
    await liveSettings.destroy();

    liveBey = new PouchDB("BeyBladesX");
    liveRecords = new PouchDB("RecordX");
    liveSettings = new PouchDB("settings");

    if (snapshot.beyBladeDBX.length) {
        await liveBey.bulkDocs(snapshot.beyBladeDBX);
    }
    if (snapshot.recordsDBX.length) {
        await liveRecords.bulkDocs(snapshot.recordsDBX);
    }
    if (snapshot.settings.length) {
        await liveSettings.bulkDocs(snapshot.settings);
    }

    console.log("Backup restored");
    return {
        beyBladeDBX: liveBey,
        recordsDBX: liveRecords,
        settings: liveSettings
    };
}

/**
 * @param {{beyBladeDBX: PouchDB.Database, recordsDBX: PouchDB.Database, settings: PouchDB.Database}} dbs
 */
function assignDatabaseGlobals(dbs) {
    beyBladeDBX = dbs.beyBladeDBX;
    recordsDBX = dbs.recordsDBX;
    settings = dbs.settings;
}
