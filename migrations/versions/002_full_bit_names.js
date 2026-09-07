/*
 * Revision 002 - expand ratchet+bit abbreviations in stored names
 * Old: "ImpactDrake 0-80E" (ratchet.abbv + bit.abbv)
 * New: "ImpactDrake 0-80 Elevate" (full part names via BeyBlade.findName)
 */

/**
 * @param {object} build
 * @returns {string|null}
 */
function fullBeyName_002(build) {
    if (!build || build.blade == null || build.bit == null) {
        return null;
    }
    return BeyBlade.fromBuild(build).findName();
}

registerMigration({
    revision: "002",
    down_revision: "001",
    message: "Rebuild bey names: bit abbreviations -> full names",

    /**
     * @param {{beyBladeDBX: PouchDB.Database, recordsDBX: PouchDB.Database}} context
     */
    async upgrade(context) {
        var updatedBeys = 0;
        var beyResult = await context.beyBladeDBX.allDocs({ include_docs: true });

        for (var i = 0; i < beyResult.rows.length; i++) {
            var doc = beyResult.rows[i].doc;
            if (!doc || doc._id.indexOf("_design/") === 0 || !doc.build) {
                continue;
            }

            var newName = fullBeyName_002(doc.build);
            if (!newName) {
                continue;
            }
            if (doc.build.name === newName && doc.title === newName) {
                continue;
            }

            doc.build.name = newName;
            doc.title = newName;
            await context.beyBladeDBX.put(doc);
            updatedBeys++;
        }

        var updatedRecords = 0;
        var recResult = await context.recordsDBX.allDocs({ include_docs: true });

        for (var j = 0; j < recResult.rows.length; j++) {
            var vsDoc = recResult.rows[j].doc;
            if (!vsDoc || vsDoc._id.indexOf("_design/") === 0) {
                continue;
            }

            var changed = false;

            if (vsDoc.bey1) {
                var name1 = fullBeyName_002(vsDoc.bey1);
                if (name1 && vsDoc.bey1.name !== name1) {
                    vsDoc.bey1.name = name1;
                    changed = true;
                }
            }
            if (vsDoc.bey2) {
                var name2 = fullBeyName_002(vsDoc.bey2);
                if (name2 && vsDoc.bey2.name !== name2) {
                    vsDoc.bey2.name = name2;
                    changed = true;
                }
            }
            if (vsDoc.bey1 && vsDoc.bey2 && vsDoc.bey1.name && vsDoc.bey2.name) {
                var newTitle = vsDoc.bey1.name + " vs " + vsDoc.bey2.name;
                if (vsDoc.title !== newTitle) {
                    vsDoc.title = newTitle;
                    changed = true;
                }
            }

            if (changed) {
                await context.recordsDBX.put(vsDoc);
                updatedRecords++;
            }
        }

        console.log("002: complete (beys=" + updatedBeys + ", records=" + updatedRecords + ")");
    }
});
