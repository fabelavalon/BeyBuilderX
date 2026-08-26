/*==========================================================*
 * Revision 001 — keep one vsRecord per matchup pair        *
 * Canonical _id: alphabetically sorted bey ids joined by   *
 * a single space. Drop the reverse-orientation duplicate.  *
 *==========================================================*/

/** Local copy — migrations stay self-contained (do not call main.js). */
function invertVsRecordOrientation_001(source, newId) {
    return {
        _id: newId,
        title: source.defender.name + " vs " + source.challenger.name,
        wko: source.lko,
        lko: source.wko,
        wso: source.lso,
        lso: source.wso,
        wbst: source.lbst,
        lbst: source.wbst,
        wx: source.lx,
        lx: source.wx,
        draws: source.draws,
        challenger: source.defender,
        defender: source.challenger
    };
}

registerMigration({
    revision: "001",
    down_revision: null,
    message: "dedupe vsRecords to alphabetical id order",

    /**
     * @param {{recordsDBX: PouchDB.Database}} context
     */
    async upgrade(context) {
        var recordsDBX = context.recordsDBX;
        var result = await recordsDBX.allDocs({ include_docs: true });
        var docs = result.rows
            .map(function (row) { return row.doc; })
            .filter(function (doc) {
                return doc && doc.challenger && doc.defender
                    && doc.challenger.id && doc.defender.id;
            });

        var byId = {};
        for (var i = 0; i < docs.length; i++) {
            byId[docs[i]._id] = docs[i];
        }

        var processedPairs = {};
        var created = 0;
        var deleted = 0;

        for (var j = 0; j < docs.length; j++) {
            var doc = docs[j];
            var idA = doc.challenger.id;
            var idB = doc.defender.id;
            if (idA === idB) {
                continue;
            }

            var sorted = [idA, idB].slice().sort();
            var canonicalId = sorted[0] + " " + sorted[1];
            var duplicateId = sorted[1] + " " + sorted[0];
            var pairKey = canonicalId;

            if (processedPairs[pairKey]) {
                continue;
            }
            processedPairs[pairKey] = true;

            var canonical = byId[canonicalId];
            var duplicate = byId[duplicateId];

            // Ensure alphabetically-first vsRecord exists before deleting the reverse
            if (!canonical && duplicate) {
                var inverted = invertVsRecordOrientation_001(duplicate, canonicalId);
                await recordsDBX.put(inverted);
                byId[canonicalId] = inverted;
                canonical = inverted;
                created++;
                console.log("001: created canonical vsRecord " + canonicalId);
            }

            if (duplicate && duplicateId !== canonicalId) {
                // Re-fetch for a fresh _rev in case we just wrote related docs
                try {
                    var freshDup = await recordsDBX.get(duplicateId);
                    await recordsDBX.remove(freshDup);
                    delete byId[duplicateId];
                    deleted++;
                    console.log("001: deleted duplicate vsRecord " + duplicateId);
                } catch (err) {
                    if (err.name !== "not_found" && err.status !== 404) {
                        throw err;
                    }
                }
            }
        }

        console.log("001: dedupe complete (created=" + created + ", deleted=" + deleted + ")");
    },

    /**
     * Recreate reverse-orientation duplicates (pre-001 shape).
     * @param {{recordsDBX: PouchDB.Database}} context
     */
    async downgrade(context) {
        var recordsDBX = context.recordsDBX;
        var result = await recordsDBX.allDocs({ include_docs: true });
        var docs = result.rows
            .map(function (row) { return row.doc; })
            .filter(function (doc) {
                return doc && doc.challenger && doc.defender
                    && doc.challenger.id && doc.defender.id;
            });

        var created = 0;
        for (var i = 0; i < docs.length; i++) {
            var doc = docs[i];
            var idA = doc.challenger.id;
            var idB = doc.defender.id;
            if (idA === idB) {
                continue;
            }

            var reverseId = idB + " " + idA;
            try {
                await recordsDBX.get(reverseId);
            } catch (err) {
                if (err.name === "not_found" || err.status === 404) {
                    await recordsDBX.put(invertVsRecordOrientation_001(doc, reverseId));
                    created++;
                } else {
                    throw err;
                }
            }
        }
        console.log("001 downgrade: recreated " + created + " reverse vsRecords");
    }
});
