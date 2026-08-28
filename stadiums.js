/*==========================================================*
 * Stadium definitions for Beyblade X match recording       *
 *==========================================================*/

/** @type {{id: string, name: string}[]} */
var stadiums = [
    { id: "xtreme",   name: "TT Xtreme Stadium" },
    { id: "wide",     name: "Wide Xtreme Stadium" },
    { id: "double",   name: "Double Xtreme Stadium" },
    { id: "infinity", name: "Infinity Stadium" },
    { id: "hxtreme",  name: "Hasbro Xtreme Stadium" },
    { id: "drop",     name: "Drop Attack Stadium" },
    { id: "cnc",      name: "Clash and Carry Stadium" },
    { id: "sneak",    name: "Sneak Attack Stadium" }
];

/** Default stadium for new matches and legacy migration */
var DEFAULT_STADIUM_ID = "xtreme";

/**
 * @param {string} stadiumId
 * @returns {string}
 */
function getStadiumName(stadiumId) {
    for (var i = 0; i < stadiums.length; i++) {
        if (stadiums[i].id === stadiumId) {
            return stadiums[i].name;
        }
    }
    return stadiumId || "Unknown stadium";
}

/**
 * Sort index for catalog order; unknown IDs sort last
 * @param {string} stadiumId
 * @returns {number}
 */
function getStadiumSortIndex(stadiumId) {
    for (var i = 0; i < stadiums.length; i++) {
        if (stadiums[i].id === stadiumId) {
            return i;
        }
    }
    return 999;
}

/**
 * Compare two stadium IDs by catalog order (for Array.sort)
 * @param {string} stadiumIdA
 * @param {string} stadiumIdB
 * @returns {number}
 */
function compareStadiumIds(stadiumIdA, stadiumIdB) {
    return getStadiumSortIndex(stadiumIdA) - getStadiumSortIndex(stadiumIdB);
}

/**
 * Canonical vsRecord _id: sortedBey1_sortedBey2_stadiumId
 * (Bey ids may contain spaces; stadium IDs must not contain underscores)
 * @param {string} id1
 * @param {string} id2
 * @param {string} stadiumId
 * @returns {string}
 */
function vsRecordId(id1, id2, stadiumId) {
    var sorted = [id1, id2].slice().sort();
    return sorted[0] + "_" + sorted[1] + "_" + stadiumId;
}
