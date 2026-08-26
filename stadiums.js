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

/** Default stadium for new matches and legacy migration. */
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
