/*==========================================================*
 * Revision 001 — vsRecord schema v1                        *
 * - Dedupe reverse-orientation pairs                       *
 * - Canonical _id: bey1Id_bey2Id_stadiumId (bey ids sorted)*
 * - Shape: bey1Id, bey2Id, stadiumId, bey1, bey2, scores   *
 * Legacy records migrate to DEFAULT stadium "xtreme".      *
 *==========================================================*/

var DEFAULT_STADIUM_ID_001 = "xtreme";
var VS_RECORDS_DESIGN_ID = "_design/vsRecords";

function scoresFromLegacy_001(doc) {
    if (doc.scores) {
        return {
            wko: doc.scores.wko || 0, lko: doc.scores.lko || 0,
            wso: doc.scores.wso || 0, lso: doc.scores.lso || 0,
            wbst: doc.scores.wbst || 0, lbst: doc.scores.lbst || 0,
            wx: doc.scores.wx || 0, lx: doc.scores.lx || 0,
            draws: doc.scores.draws || 0
        };
    }
    return {
        wko: doc.wko || 0, lko: doc.lko || 0,
        wso: doc.wso || 0, lso: doc.lso || 0,
        wbst: doc.wbst || 0, lbst: doc.lbst || 0,
        wx: doc.wx || 0, lx: doc.lx || 0,
        draws: doc.draws || 0
    };
}

function invertScores_001(scores) {
    return {
        wko: scores.lko, lko: scores.wko,
        wso: scores.lso, lso: scores.wso,
        wbst: scores.lbst, lbst: scores.wbst,
        wx: scores.lx, lx: scores.wx,
        draws: scores.draws
    };
}

/** New-format _id: sortedBey1_sortedBey2_stadiumId (bey ids may contain spaces). */
function vsRecordId_001(id1, id2, stadiumId) {
    var sorted = [id1, id2].slice().sort();
    return sorted[0] + "_" + sorted[1] + "_" + stadiumId;
}

function isNewFormatVsRecord_001(doc) {
    return !!(doc && doc.type === "vsRecord" && doc.stadiumId && doc.bey1Id && doc.bey2Id && doc.scores);
}

function isLegacyVsRecord_001(doc) {
    if (!doc || doc._id.indexOf("_design/") === 0) {
        return false;
    }
    if (isNewFormatVsRecord_001(doc)) {
        return false;
    }
    // Pre-stadium: challenger/defender or flat score fields
    return !!(doc.challenger && doc.defender && doc.challenger.id && doc.defender.id);
}

function buildNewVsRecord_001(bey1, bey2, stadiumId, scores) {
    var sorted = [bey1.id, bey2.id].slice().sort();
    var first = bey1.id === sorted[0] ? bey1 : bey2;
    var second = bey1.id === sorted[0] ? bey2 : bey1;
    var orientedScores = (bey1.id === sorted[0]) ? scores : invertScores_001(scores);
    return {
        _id: vsRecordId_001(first.id, second.id, stadiumId),
        type: "vsRecord",
        bey1Id: first.id,
        bey2Id: second.id,
        stadiumId: stadiumId,
        bey1: first,
        bey2: second,
        title: first.name + " vs " + second.name,
        scores: orientedScores
    };
}

function vsRecordsDesignDoc_001() {
    return {
        _id: VS_RECORDS_DESIGN_ID,
        views: {
            by_bey_pair: {
                map: "function (doc) {\n" +
                    "  if (doc.type === 'vsRecord' && doc.bey1Id && doc.bey2Id) {\n" +
                    "    emit([doc.bey1Id, doc.bey2Id], null);\n" +
                    "  }\n" +
                    "}"
            },
            by_stadium: {
                map: "function (doc) {\n" +
                    "  if (doc.type === 'vsRecord' && doc.stadiumId) {\n" +
                    "    emit(doc.stadiumId, null);\n" +
                    "  }\n" +
                    "}"
            },
            by_bey_and_stadium: {
                map: "function (doc) {\n" +
                    "  if (doc.type === 'vsRecord' && doc.bey1Id && doc.bey2Id && doc.stadiumId) {\n" +
                    "    emit([doc.bey1Id, doc.bey2Id, doc.stadiumId], null);\n" +
                    "  }\n" +
                    "}"
            }
        }
    };
}

async function ensureVsRecordsIndexes_001(recordsDBX) {
    var design = vsRecordsDesignDoc_001();
    try {
        var existing = await recordsDBX.get(VS_RECORDS_DESIGN_ID);
        design._rev = existing._rev;
    } catch (err) {
        if (err.name !== "not_found" && err.status !== 404) {
            throw err;
        }
    }
    await recordsDBX.put(design);
}

registerMigration({
    revision: "001",
    down_revision: null,
    message: "vsRecords: dedupe, stadium id, bey1Id_bey2Id_stadiumId",

    /**
     * Re-run upgrade when already at 001 but legacy docs remain (schema amend).
     */
    async reapplyIf(context) {
        var result = await context.recordsDBX.allDocs({ include_docs: true });
        for (var i = 0; i < result.rows.length; i++) {
            if (isLegacyVsRecord_001(result.rows[i].doc)) {
                return true;
            }
        }
        try {
            await context.recordsDBX.get(VS_RECORDS_DESIGN_ID);
        } catch (err) {
            if (err.name === "not_found" || err.status === 404) {
                return true;
            }
            throw err;
        }
        return false;
    },

    /**
     * @param {{recordsDBX: PouchDB.Database}} context
     */
    async upgrade(context) {
        var recordsDBX = context.recordsDBX;
        var result = await recordsDBX.allDocs({ include_docs: true });
        var docs = result.rows
            .map(function (row) { return row.doc; })
            .filter(function (doc) { return doc && doc._id.indexOf("_design/") !== 0; });

        var byId = {};
        for (var i = 0; i < docs.length; i++) {
            byId[docs[i]._id] = docs[i];
        }

        var processedPairs = {};
        var created = 0;
        var deleted = 0;

        // --- Phase 1: legacy dual / space-id docs → new stadium format ---
        for (var j = 0; j < docs.length; j++) {
            var doc = docs[j];
            if (!isLegacyVsRecord_001(doc)) {
                continue;
            }

            var idA = doc.challenger.id;
            var idB = doc.defender.id;
            if (idA === idB) {
                continue;
            }

            var sorted = [idA, idB].slice().sort();
            var pairKey = sorted[0] + "\0" + sorted[1];
            if (processedPairs[pairKey]) {
                continue;
            }
            processedPairs[pairKey] = true;

            var spaceCanonical = sorted[0] + " " + sorted[1];
            var spaceDuplicate = sorted[1] + " " + sorted[0];
            var canonical = byId[spaceCanonical];
            var duplicate = byId[spaceDuplicate];

            // Prefer alphabetically-first orientation; else invert reverse
            var sourceScores = null;
            var beyFirst = null;
            var beySecond = null;

            if (canonical) {
                if (canonical.challenger.id === sorted[0]) {
                    beyFirst = canonical.challenger;
                    beySecond = canonical.defender;
                    sourceScores = scoresFromLegacy_001(canonical);
                } else {
                    beyFirst = canonical.defender;
                    beySecond = canonical.challenger;
                    sourceScores = invertScores_001(scoresFromLegacy_001(canonical));
                }
            } else if (duplicate) {
                // duplicate is reverse orientation → invert into alphabetical
                sourceScores = invertScores_001(scoresFromLegacy_001(duplicate));
                beyFirst = duplicate.defender;
                beySecond = duplicate.challenger;
            } else {
                continue;
            }

            var newDoc = buildNewVsRecord_001(
                beyFirst,
                beySecond,
                DEFAULT_STADIUM_ID_001,
                sourceScores
            );

            // Don't overwrite an already-migrated stadium record with empty/legacy
            if (!byId[newDoc._id]) {
                await recordsDBX.put(newDoc);
                byId[newDoc._id] = newDoc;
                created++;
                console.log("001: created " + newDoc._id);
            }

            // Remove legacy docs (space-separated ids, any orientation)
            var legacyIds = [spaceCanonical, spaceDuplicate, doc._id];
            for (var k = 0; k < legacyIds.length; k++) {
                var legacyId = legacyIds[k];
                if (!byId[legacyId] || isNewFormatVsRecord_001(byId[legacyId])) {
                    continue;
                }
                try {
                    var fresh = await recordsDBX.get(legacyId);
                    await recordsDBX.remove(fresh);
                    delete byId[legacyId];
                    deleted++;
                    console.log("001: deleted legacy " + legacyId);
                } catch (err) {
                    if (err.name !== "not_found" && err.status !== 404) {
                        throw err;
                    }
                }
            }
        }

        await ensureVsRecordsIndexes_001(recordsDBX);
        console.log("001: complete (created=" + created + ", deleted=" + deleted + ")");
    },

    /**
     * Best-effort reverse: strip stadium, restore space-id challenger form (no dual dupes).
     * @param {{recordsDBX: PouchDB.Database}} context
     */
    async downgrade(context) {
        var recordsDBX = context.recordsDBX;
        var result = await recordsDBX.allDocs({ include_docs: true });
        var created = 0;

        for (var i = 0; i < result.rows.length; i++) {
            var doc = result.rows[i].doc;
            if (!isNewFormatVsRecord_001(doc)) {
                continue;
            }
            var legacyId = doc.bey1Id + " " + doc.bey2Id;
            var legacy = {
                _id: legacyId,
                title: doc.title || (doc.bey1.name + " vs " + doc.bey2.name),
                wko: doc.scores.wko, lko: doc.scores.lko,
                wso: doc.scores.wso, lso: doc.scores.lso,
                wbst: doc.scores.wbst, lbst: doc.scores.lbst,
                wx: doc.scores.wx, lx: doc.scores.lx,
                draws: doc.scores.draws,
                challenger: doc.bey1,
                defender: doc.bey2
            };
            try {
                await recordsDBX.get(legacyId);
            } catch (err) {
                if (err.name === "not_found" || err.status === 404) {
                    await recordsDBX.put(legacy);
                    created++;
                } else {
                    throw err;
                }
            }
            try {
                var fresh = await recordsDBX.get(doc._id);
                await recordsDBX.remove(fresh);
            } catch (err2) {
                if (err2.name !== "not_found" && err2.status !== 404) {
                    throw err2;
                }
            }
        }

        try {
            var design = await recordsDBX.get(VS_RECORDS_DESIGN_ID);
            await recordsDBX.remove(design);
        } catch (err3) {
            if (err3.name !== "not_found" && err3.status !== 404) {
                throw err3;
            }
        }

        console.log("001 downgrade: restored " + created + " space-id vsRecords");
    }
});
