/*==========================================================*
 * PouchDB migration engine (Alembic-style)                 *
 * Tracks revision in settings._id = "dbVersion"            *
 *==========================================================*/

var DB_VERSION_DOC_ID = "dbVersion";

/** @type {Array<{revision: string, down_revision: string|null, message: string, upgrade: Function, downgrade?: Function}>} */
var MIGRATIONS = [];

/**
 * Register a migration. Call from each versions/*.js script.
 * @param {{revision: string, down_revision: string|null, message: string, upgrade: Function, downgrade?: Function}} migration
 */
function registerMigration(migration) {
    if (!migration || !migration.revision) {
        throw new Error("Migration must have a revision");
    }
    if (typeof migration.upgrade !== "function") {
        throw new Error("Migration " + migration.revision + " must define upgrade()");
    }
    if (MIGRATIONS.some(m => m.revision === migration.revision)) {
        throw new Error("Duplicate migration revision: " + migration.revision);
    }
    MIGRATIONS.push(migration);
}

/**
 * Build ordered upgrade chain starting from down_revision === null (base).
 * @returns {Array}
 */
function buildMigrationChain() {
    var byDown = {};
    for (var i = 0; i < MIGRATIONS.length; i++) {
        var key = MIGRATIONS[i].down_revision === null || MIGRATIONS[i].down_revision === undefined
            ? "__base__"
            : MIGRATIONS[i].down_revision;
        if (byDown[key]) {
            throw new Error("Multiple migrations branch from " + key);
        }
        byDown[key] = MIGRATIONS[i];
    }

    var chain = [];
    var current = byDown["__base__"];
    while (current) {
        chain.push(current);
        current = byDown[current.revision];
    }

    if (chain.length !== MIGRATIONS.length) {
        throw new Error("Migration chain is broken or has unreachable revisions");
    }
    return chain;
}

/**
 * @param {PouchDB.Database} settingsDb
 * @returns {Promise<{_id: string, _rev?: string, revision: string|null}>}
 */
async function getDbVersionDoc(settingsDb) {
    try {
        return await settingsDb.get(DB_VERSION_DOC_ID);
    } catch (err) {
        if (err.name === "not_found" || err.status === 404) {
            return { _id: DB_VERSION_DOC_ID, revision: null };
        }
        throw err;
    }
}

/**
 * @param {PouchDB.Database} settingsDb
 * @param {string} revision
 * @param {object} existingDoc
 */
async function setDbVersion(settingsDb, revision, existingDoc) {
    var doc = {
        _id: DB_VERSION_DOC_ID,
        revision: revision
    };
    if (existingDoc && existingDoc._rev) {
        doc._rev = existingDoc._rev;
    }
    var result = await settingsDb.put(doc);
    existingDoc._rev = result.rev;
    existingDoc.revision = revision;
    return existingDoc;
}

/**
 * Run all pending upgrades (and optionally downgrades) against live DBs.
 * @param {{settings: PouchDB.Database, recordsDBX: PouchDB.Database, beyBladeDBX: PouchDB.Database}} dbs
 * @param {{target?: string|null}} [opts] - target revision; omit to upgrade to head
 */
async function runMigrations(dbs, opts) {
    opts = opts || {};
    var chain = buildMigrationChain();
    var head = chain.length ? chain[chain.length - 1].revision : null;
    var target = opts.target !== undefined ? opts.target : head;

    var versionDoc = await getDbVersionDoc(dbs.settings);
    var current = versionDoc.revision;

    console.log("DB migration: current=" + current + " target=" + target);

    if (current === target) {
        console.log("DB migration: already at target revision");
        return current;
    }

    var currentIndex = current === null ? -1 : chain.findIndex(m => m.revision === current);
    if (current !== null && currentIndex === -1) {
        throw new Error("Unknown DB revision in settings: " + current);
    }

    var targetIndex = target === null ? -1 : chain.findIndex(m => m.revision === target);
    if (target !== null && targetIndex === -1) {
        throw new Error("Unknown target migration revision: " + target);
    }

    var context = {
        settings: dbs.settings,
        recordsDBX: dbs.recordsDBX,
        beyBladeDBX: dbs.beyBladeDBX
    };

    // Upgrade
    if (targetIndex > currentIndex) {
        for (var i = currentIndex + 1; i <= targetIndex; i++) {
            var up = chain[i];
            console.log("DB migration upgrade " + up.revision + ": " + up.message);
            await up.upgrade(context);
            versionDoc = await setDbVersion(dbs.settings, up.revision, versionDoc);
            console.log("DB migration upgrade " + up.revision + " complete");
        }
    }

    // Downgrade
    if (targetIndex < currentIndex) {
        for (var j = currentIndex; j > targetIndex; j--) {
            var down = chain[j];
            if (typeof down.downgrade !== "function") {
                throw new Error("Migration " + down.revision + " has no downgrade()");
            }
            console.log("DB migration downgrade " + down.revision + ": " + down.message);
            await down.downgrade(context);
            var prevRevision = down.down_revision === undefined ? null : down.down_revision;
            versionDoc = await setDbVersion(dbs.settings, prevRevision, versionDoc);
            console.log("DB migration downgrade " + down.revision + " complete");
        }
    }

    return versionDoc.revision;
}
