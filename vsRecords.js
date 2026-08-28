/*==========================================================*
 * vsRecord helpers (schema, orientation, queries)          *
 *==========================================================*/

/** UI dropdown "none" -> wildcard for BeyBlade.matchesPartsFilter */
function partsFilterFromUi(bitChip, over, blade, assist, rachet, bit) {
    return {
        bitChip: bitChip === "none" ? null : bitChip,
        over: over === "none" ? null : over,
        blade: blade === "none" ? null : blade,
        assist: assist === "none" ? null : assist,
        rachet: rachet === "none" ? null : rachet,
        bit: bit === "none" ? null : bit
    };
}

/** Order two beys so bey1 is the alphabetically-first id. */
function orderBeysForVsRecord(beyA, beyB) {
    if (beyA.id <= beyB.id) {
        return { bey1: beyA, bey2: beyB };
    }
    return { bey1: beyB, bey2: beyA };
}

function emptyVsScores() {
    return {
        wko: 0, lko: 0,
        wso: 0, lso: 0,
        wbst: 0, lbst: 0,
        wx: 0, lx: 0,
        draws: 0
    };
}

/**
 * Win/loss fields from the perspective of perspectiveBeyId.
 * Stored docs are always bey1-oriented (alphabetical first id).
 */
function vsStatsFromPerspective(vsDoc, perspectiveBeyId) {
    var scores = vsDoc.scores;
    if (vsDoc.bey1Id === perspectiveBeyId) {
        return {
            wko: scores.wko, lko: scores.lko,
            wso: scores.wso, lso: scores.lso,
            wbst: scores.wbst, lbst: scores.lbst,
            wx: scores.wx, lx: scores.lx,
            draws: scores.draws,
            opponent: vsDoc.bey2
        };
    }
    return {
        wko: scores.lko, lko: scores.wko,
        wso: scores.lso, lso: scores.wso,
        wbst: scores.lbst, lbst: scores.wbst,
        wx: scores.lx, lx: scores.wx,
        draws: scores.draws,
        opponent: vsDoc.bey1
    };
}

/**
 * Temporary flip of bey1/bey2 + scores for display/aggregation (does not change ids).
 */
function invertVsRecordOrientation(source) {
    var scores = source.scores;
    return {
        _id: source._id,
        type: source.type,
        bey1Id: source.bey2Id,
        bey2Id: source.bey1Id,
        stadiumId: source.stadiumId,
        bey1: source.bey2,
        bey2: source.bey1,
        title: source.bey2.name + " vs " + source.bey1.name,
        scores: {
            wko: scores.lko, lko: scores.wko,
            wso: scores.lso, lso: scores.wso,
            wbst: scores.lbst, lbst: scores.wbst,
            wx: scores.lx, lx: scores.wx,
            draws: scores.draws
        }
    };
}

function buildVsRecordDoc(beyA, beyB, stadiumId) {
    var ordered = orderBeysForVsRecord(beyA, beyB);
    var stadium = stadiumId || DEFAULT_STADIUM_ID;
    return {
        _id: vsRecordId(ordered.bey1.id, ordered.bey2.id, stadium),
        type: "vsRecord",
        bey1Id: ordered.bey1.id,
        bey2Id: ordered.bey2.id,
        stadiumId: stadium,
        bey1: ordered.bey1,
        bey2: ordered.bey2,
        title: ordered.bey1.name + " vs " + ordered.bey2.name,
        scores: emptyVsScores()
    };
}

/** Apply a win/loss/draw onto a bey1-oriented vsRecord (scores nest). */
function applyOutcomeToVsRecord(vsRecord, winnerId, outcome) {
    var winnerIsBey1 = (vsRecord.bey1Id === winnerId);
    switch(outcome) {
        case "KO":
            if (winnerIsBey1) { vsRecord.scores.wko += 1; } else { vsRecord.scores.lko += 1; }
            break;
        case "SO":
            if (winnerIsBey1) { vsRecord.scores.wso += 1; } else { vsRecord.scores.lso += 1; }
            break;
        case "burst":
            if (winnerIsBey1) { vsRecord.scores.wbst += 1; } else { vsRecord.scores.lbst += 1; }
            break;
        case "x":
            if (winnerIsBey1) { vsRecord.scores.wx += 1; } else { vsRecord.scores.lx += 1; }
            break;
        case "draw":
            vsRecord.scores.draws += 1;
            break;
        default:
            console.log("error updating winners and losers");
    }
}

/**
 * vsRecords involving a bey across all stadiums (vsRecords/by_bey, else allDocs).
 * @param {PouchDB} recordsDb
 * @param {string} beyId
 */
function queryVsRecordsForBey(recordsDb, beyId) {
    return recordsDb.query("vsRecords/by_bey", {
        key: beyId,
        include_docs: true
    }).then(function (result) {
        return result.rows
            .map(function (row) { return row.doc; })
            .filter(function (doc) { return !!doc; });
    }).catch(function (err) {
        console.log("queryVsRecordsForBey fallback:", err);
        return recordsDb.allDocs({ include_docs: true }).then(function (all) {
            return all.rows
                .map(function (row) { return row.doc; })
                .filter(function (doc) {
                    return doc && doc.type === "vsRecord"
                        && (doc.bey1Id === beyId || doc.bey2Id === beyId);
                });
        });
    });
}

/**
 * Orient a vsRecord so partsFilter1 maps to bey1 stats for display/aggregation.
 * UI part args use "none" as wildcard. Returns null if no orientation matches.
 */
function orientVsRecordForPartsQuery(doc, bitChip1, over1, blade1, assist1, rachet1, bit1, bitChip2, over2, blade2, assist2, rachet2, bit2) {
    var filter1 = partsFilterFromUi(bitChip1, over1, blade1, assist1, rachet1, bit1);
    var filter2 = partsFilterFromUi(bitChip2, over2, blade2, assist2, rachet2, bit2);
    var partsFilter1OnBey1 = BeyBlade.matchesPartsFilter(doc.bey1, filter1);
    var partsFilter2OnBey2 = BeyBlade.matchesPartsFilter(doc.bey2, filter2);
    if (partsFilter1OnBey1 && partsFilter2OnBey2) {
        return doc;
    }
    var partsFilter1OnBey2 = BeyBlade.matchesPartsFilter(doc.bey2, filter1);
    var partsFilter2OnBey1 = BeyBlade.matchesPartsFilter(doc.bey1, filter2);
    if (partsFilter1OnBey2 && partsFilter2OnBey1) {
        return invertVsRecordOrientation(doc);
    }
    return null;
}
