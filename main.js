/*==========================================================*
 * BeyBuilder v1.5 for Beyblade X                           *
 * Author: Fabel                                            *
 * Copyright 2023-2026                                      *
 *==========================================================*/

//create beyblade database
var beyBladeDBX = new PouchDB("BeyBladesX");
var recordsDBX = new PouchDB("RecordX");
var settings = new PouchDB("settings");

// set true when runMigrations creates a pre-upgrade backup (for error messaging)
var migrationBackupWasCreated = false;

//import the parts lists
var allBitChips = bitChips;
var allOverBlades = overBlades;
var allBlades = blades;
var allAssists = assistBlades;
var allRachets = rachets;
var allBits = bits;

//create the elements for the buttons that will get generated via this script
var copyStatsbtn = document.createElement("button"); 
var bey1Statbtn = document.createElement("button");
var bey2Statbtn = document.createElement("button");
var showAllBeysbtn = document.createElement("button");
var removeBeybtn = document.createElement("button");
var editBeybtn = document.createElement("button");
var showMatchupbtn = document.createElement("button");
// under the vs records
var recordsSpace = document.getElementById("recordsSpace"); 
var recordsCopybtn = document.createElement("button"); 
var clearHistoryBtn = document.createElement("button"); 
var overlayBtn = document.createElement("button"); 
var overlaySwapBeysBtn = document.createElement("button"); 

//import the elements for the dropdowns...
//...for bey1
var bey1BitChipDropdown = document.getElementById("bey1BitChip"); 
var bey1OverBladeDropdown = document.getElementById("bey1OverBlade"); 
var bey1BladeDropdown = document.getElementById("bey1Blade");
var bey1AssistBladeDropdown = document.getElementById("bey1AssistBlade"); 
var bey1RachetDropdown = document.getElementById("bey1Rachet");
var bey1BitDropdown = document.getElementById("bey1Bit");

//...for bey2
var bey2BitChipDropdown = document.getElementById("bey2BitChip");
var bey2OverBladeDropdown = document.getElementById("bey2OverBlade"); 
var bey2BladeDropdown = document.getElementById("bey2Blade");
var bey2RachetDropdown = document.getElementById("bey2Rachet");
var bey2AssistBladeDropdown = document.getElementById("bey2AssistBlade"); 
var bey2BitDropdown = document.getElementById("bey2Bit");

//...for the parts records
var bitChipDropdown1 = document.getElementById("bitChipR1");
var overBladeDropdown1 = document.getElementById("overBladeR1"); 
var bladeDropdown1 = document.getElementById("bladeR1");
var assistBladeDropdown1 = document.getElementById("assistR1"); 
var rachetDropdown1 = document.getElementById("rachetR1");
var bitDropdown1 = document.getElementById("bitR1");
var bitChipDropdown2 = document.getElementById("bitChipR2"); 
var overBladeDropdown2 = document.getElementById("overBladeR2");
var bladeDropdown2 = document.getElementById("bladeR2");
var assistBladeDropdown2 = document.getElementById("assistR2"); 
var rachetDropdown2 = document.getElementById("rachetR2");
var bitDropdown2 = document.getElementById("bitR2");

// ... for the titles above win/lose buttons
var bey1WinTitle = document.getElementById("bey1-button-title");
var bey2WinTitle = document.getElementById("bey2-button-title");

//...for the dbList
var selectedBey = document.getElementById("dbSelectList");
const dbSelectList = document.getElementById("dbSelectList");

//import elements for the logging...
//..dbBey stats
var dbBeyName = document.getElementById("dbBeyIs");
var dbBeyWeight = document.getElementById("dbBeyWeight");
var dbBeyStats = document.getElementById("dbBeyStats");
var dbWinPercent = document.getElementById("dbWinPercent");
var dbPPW = document.getElementById("dbPPW");
var dbPPL = document.getElementById("dbPPL");
var dbPointDif = document.getElementById("dbPointDif");
var dbBeyKO = document.getElementById("dbBeyKO");
var dbBeySO = document.getElementById("dbBeySO");
var dbBeyBst = document.getElementById("dbBeyBst");
var dbBeyX = document.getElementById("dbBeyX");
var dbBeyDraw = document.getElementById("dbBeyDraw");
var dbBeySpace = document.getElementById("dbBeySpace");

//bey1 stats
var bey1Is = document.getElementById("bey1Is");
var bey1Stats = document.getElementById("bey1Stats");
var bey1KO = document.getElementById("bey1KO");
var bey1SO = document.getElementById("bey1SO");
var bey1Bst = document.getElementById("bey1Bst");
var bey1X = document.getElementById("bey1X");
var bey1Draw = document.getElementById("bey1Draw");

//bey2 stats
var bey2Is = document.getElementById("bey2Is");
var bey2Stats = document.getElementById("bey2Stats");
var bey2KO = document.getElementById("bey2KO");
var bey2SO = document.getElementById("bey2SO");
var bey2Bst = document.getElementById("bey2Bst");
var bey2X = document.getElementById("bey2X");
var bey2Draw = document.getElementById("bey2Draw");

//parts stats
var partIs = document.getElementById("partIs");
var partStats = document.getElementById("partStats");
var partKO = document.getElementById("partKO");
var partSO = document.getElementById("partSO");
var partBst = document.getElementById("partBst");
var partX = document.getElementById("partX");
var partDraw = document.getElementById("partDraw");

// settings
const settingsModal = new bootstrap.Modal(document.getElementById('settings'));
document.getElementById('settings').addEventListener('show.bs.modal', function () {
    updateMigrationBackupSettings();
});
const importModal = new bootstrap.Modal(document.getElementById('areYouSureImport'));
const restoreBackupModal = new bootstrap.Modal(document.getElementById('areYouSureRestoreBackup'));
const restoreBackupConfirmMsg = document.getElementById('restoreBackupConfirmMsg');
const fileInput = document.getElementById('importDbFile');

//theme switcher
var themeSelect = document.getElementById("themeSelect");
var themeLink = document.getElementById("theme");
// checkbox to enable OBS overlay button
const enableOverlayBtnsCheckbox = document.getElementById("enableOverlayBtnsCheckbox");

// error modal
const errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
const errorModalMsg = document.getElementById("errorMsg");

//everything else
var error = document.getElementById("error");
var winners = document.getElementById("winnerLog");
var matchupSpace = document.getElementById("matchupSpace");
var matchupSpaceUser = document.getElementById("matchupSpaceUser");
var matchupBey = document.getElementById("matchupBey");
var matchupBeyUser = document.getElementById("matchupBeyUser");
var matchupHistUser = document.getElementById("matchupHistUser");
var matchupHistStatsTable = document.getElementById("matchupHistStatsTable");
var matchupStatsBeyTitle = document.getElementById("matchupStatsBeyTitle");
var matchupHistCopyButton = document.getElementById("copyHistToClip");
var matchupHistStadiumFilter = document.getElementById("matchupHistStadiumFilter");
var clearHistButton = document.getElementById("clearHist");
// window object for OBS overlay
var scoreOverlayWindow = null;

//used so we dont generate more buttons
var wasCopyMatchupToClipGenerated = false;
var wasClearMatchupHistoryGenerated = false;
var wasCopyFullHistToClipGenerated = false;
var wasOverlayGenerated = false;
var wasSwapGenerated = false;

// settings, pouchDB json objects
var selectedTheme; // pouchDB json with string "name"
var overlaySetting; // pouchDB json with boolean "value"
var selectedStadium; // pouchDB json with string "stadiumId"

// stadium UI
var stadiumSelector = document.getElementById("stadiumSelector");

//global beyblade variables
var bey1;
var bey2;
var dbBey;

//runs on launch, fills dropdowns and database list
function main(){

    console.log("Welcome to BeyBuilder X Version 1.5");
    console.log("called main()");

    bey1BitChipDropdown.value="random";
    bey2BitChipDropdown.value="random";
    bitChipDropdown1.value="none";

    bey1OverBladeDropdown.value="random";
    bey2OverBladeDropdown.value="random";
    overBladeDropdown1.value="none";

    bey1BladeDropdown.value="random";
    bey2BladeDropdown.value="random";
    bladeDropdown1.value="none";

    bey1AssistBladeDropdown.value="random";
    bey2AssistBladeDropdown.value="random";
    assistBladeDropdown1.value="none";

    bey1RachetDropdown.value="random";
    bey2RachetDropdown.value="random";
    rachetDropdown1.value="none";

    bey1BitDropdown.value="random";
    bey2BitDropdown.value="random";
    bitDropdown1.value="none";
    
    //create and populate the drop downs with the parts from the database...
    
    //sort for display purposes, leave original array the same so we can get by ID
    allBitChipsSorted = structuredClone(allBitChips); // JS deep copy crap
    allBitChipsSorted.sort((a, b) => a.name.localeCompare(b.name));
    //...the Bit Chips
    for (var i = 0; i < allBitChipsSorted.length; i++) {
        var options = document.createElement("option");
        var option2 = document.createElement("option");
        var option3 = document.createElement("option");
        var option4 = document.createElement("option");
        options.textContent = allBitChipsSorted[i].name;
        options.value = allBitChipsSorted[i].id;
        option2.textContent = allBitChipsSorted[i].name;
        option2.value = allBitChipsSorted[i].id;
        option3.textContent = allBitChipsSorted[i].name;
        option3.value = allBitChipsSorted[i].id;
        option4.textContent = allBitChipsSorted[i].name;
        option4.value = allBitChipsSorted[i].id;
        bey1BitChipDropdown.appendChild(options);
        bey2BitChipDropdown.appendChild(option2);
        bitChipDropdown1.appendChild(option3);
        bitChipDropdown2.appendChild(option4);

    }

    //sort for display purposes, leave original array the same so we can get by ID
    allOverBladesSorted = structuredClone(allOverBlades); // JS deep copy crap
    allOverBladesSorted.sort((a, b) => a.name.localeCompare(b.name));
    //...the Over Blades
    for (var i = 0; i < allOverBladesSorted.length; i++) {
        var options = document.createElement("option");
        var option2 = document.createElement("option");
        var option3 = document.createElement("option");
        var option4 = document.createElement("option");
        options.textContent = allOverBladesSorted[i].name;
        options.value = allOverBladesSorted[i].id;
        option2.textContent = allOverBladesSorted[i].name;
        option2.value = allOverBladesSorted[i].id;
        option3.textContent = allOverBladesSorted[i].name;
        option3.value = allOverBladesSorted[i].id;
        option4.textContent = allOverBladesSorted[i].name;
        option4.value = allOverBladesSorted[i].id;
        bey1OverBladeDropdown.appendChild(options);
        bey2OverBladeDropdown.appendChild(option2);
        overBladeDropdown1.appendChild(option3);
        overBladeDropdown2.appendChild(option4);

    }
    
    //sort for display purposes, leave original array the same so we can get by ID
    allBladesSorted = structuredClone(allBlades); // JS deep copy crap
    allBladesSorted.sort((a, b) => a.name.localeCompare(b.name));
    //...the Blades
    for (var i = 0; i < allBladesSorted.length; i++) {
        var options = document.createElement("option");
        var option2 = document.createElement("option");
        var option3 = document.createElement("option");
        var option4 = document.createElement("option");
        options.textContent = allBladesSorted[i].name;
        options.value = allBladesSorted[i].id;
        option2.textContent = allBladesSorted[i].name;
        option2.value = allBladesSorted[i].id;
        option3.textContent = allBladesSorted[i].name;
        option3.value = allBladesSorted[i].id;
        option4.textContent = allBladesSorted[i].name;
        option4.value = allBladesSorted[i].id;
        bey1BladeDropdown.appendChild(options);
        bey2BladeDropdown.appendChild(option2);
        bladeDropdown1.appendChild(option3);
        bladeDropdown2.appendChild(option4);

    }

    //sort for display purposes, leave original array the same so we can get by ID
    allAssistsSorted = structuredClone(allAssists); // JS deep copy crap
    allAssistsSorted.sort((a, b) => a.name.localeCompare(b.name));
    //...the Assit Blades
    for (var i = 0; i < allAssistsSorted.length; i++) {
        var options = document.createElement("option");
        var option2 = document.createElement("option");
        var option3 = document.createElement("option");
        var option4 = document.createElement("option");
        options.textContent = allAssistsSorted[i].name;
        options.value = allAssistsSorted[i].id;
        option2.textContent = allAssistsSorted[i].name;
        option2.value = allAssistsSorted[i].id;
        option3.textContent = allAssistsSorted[i].name;
        option3.value = allAssistsSorted[i].id;
        option4.textContent = allAssistsSorted[i].name;
        option4.value = allAssistsSorted[i].id;
        bey1AssistBladeDropdown.appendChild(options);
        bey2AssistBladeDropdown.appendChild(option2);
        assistBladeDropdown1.appendChild(option3);
        assistBladeDropdown2.appendChild(option4);

    }

    //sort for display purposes, leave original array the same so we can get by ID
    allRachetsSorted = structuredClone(allRachets);
    allRachetsSorted.sort((a, b) => a.name.localeCompare(b.name));
    //...the rachets
    for (var i = 0; i < allRachetsSorted.length; i++) {
        var options = document.createElement("option");
        var option2 = document.createElement("option");
        var option3 = document.createElement("option");
        var option4 = document.createElement("option");
        options.textContent = allRachetsSorted[i].name;
        options.value = allRachetsSorted[i].id;
        option2.textContent = allRachetsSorted[i].name;
        option2.value = allRachetsSorted[i].id;
        option3.textContent = allRachetsSorted[i].name;
        option3.value = allRachetsSorted[i].id;
        option4.textContent = allRachetsSorted[i].name;
        option4.value = allRachetsSorted[i].id;
        bey1RachetDropdown.appendChild(options);
        bey2RachetDropdown.appendChild(option2);
        rachetDropdown1.appendChild(option3);
        rachetDropdown2.appendChild(option4);
        
    }

    //sort for display purposes, leave original array the same so we can get by ID
    allBitsSorted = structuredClone(allBits);
    allBitsSorted.sort((a, b) => a.name.localeCompare(b.name));
    //...the bits  
    for (var i = 0; i < allBitsSorted.length; i++) {
        var options = document.createElement("option");
        var option2 = document.createElement("option");
        var option3 = document.createElement("option");
        var option4 = document.createElement("option");
        options.textContent = allBitsSorted[i].name;
        options.value = allBitsSorted[i].id;
        option2.textContent = allBitsSorted[i].name;
        option2.value = allBitsSorted[i].id;
        option3.textContent = allBitsSorted[i].name;
        option3.value = allBitsSorted[i].id;
        option4.textContent = allBitsSorted[i].name;
        option4.value = allBitsSorted[i].id;
        bey1BitDropdown.appendChild(options);
        bey2BitDropdown.appendChild(option2);
        bitDropdown1.appendChild(option3);
        bitDropdown2.appendChild(option4);
        
    }

    //fill the dbList
    showBeyblades();
    
    // on click and other event listeners
    loadTheme();
    themeSwitchListener();
    loadStadium();
    stadiumSelectorListener();
    populateStadiumSelector();
    populateMatchupHistStadiumFilter();
    matchupHistStadiumFilterListener();
    loadOverlaySetting();
    overlaySettingListener();
    importDbSetup();
};

//generate a beyblade based on the selections for the first set of drop downs
function generateBey1(){

    console.log("called generateBey1");

    //uses the id's of all parts for easy call
    var bitChip = -1;
    var over = -1;
    var blade = -1;
    var assist = -1;
    var rachet = -1;
    var bit = -1;

    //boolean values to check if the beyblade is random or not
    var bitChipChosen = false;
    var overBladeChosen = false;
    var bladeChosen = false;
    var assistChosen = false;
    var rachetChosen = false;
    var bitChosen = false;

    //random or chosen...
    //...bit chip?
    if(bey1BitChipDropdown.value=="random"){
        var randBitChip = getRandomInt(allBitChips.length);
        bitChip = allBitChips[randBitChip].id;
        bitChipChosen = false;
    }
    else{
        bitChip = allBitChips[parseInt(bey1BitChipDropdown.value)].id;
        bitChipChosen = true;
    }
    //...over blade?
    if(bey1OverBladeDropdown.value=="random"){
        var randOverBlade = getRandomInt(allOverBlades.length);
        over = allOverBlades[randOverBlade].id;
        overBladeChosen = false;
    }
    else{
        over = allOverBlades[parseInt(bey1OverBladeDropdown.value)].id;
        overBladeChosen = true;
    }
    //...blade?
    if(bey1BladeDropdown.value=="random"){
        var randBlade = getRandomInt(allBlades.length);
        blade = allBlades[randBlade].id;
        bladeChosen = false;
    }
    else{
        blade = allBlades[parseInt(bey1BladeDropdown.value)].id;
        bladeChosen = true;
    }
    //...assist blade?
    if(bey1AssistBladeDropdown.value=="random"){
        var randAssistBlade = getRandomInt(allAssists.length);
        assist = allAssists[randAssistBlade].id;
        assistChosen = false;
    }
    else{
        assist = allAssists[parseInt(bey1AssistBladeDropdown.value)].id;
        assistChosen = true;
    }
    //...rachet?
    if(bey1RachetDropdown.value=="random"){
        var randRachet = getRandomInt(allRachets.length);
        rachet = allRachets[randRachet].id;
        rachetChosen = false;
    }
    else{
        rachet = allRachets[parseInt(bey1RachetDropdown.value)].id;
        rachetChosen = true;
    }
    //...bit?
    if(bey1BitDropdown.value=="random"){
        var randBit = getRandomInt(allBits.length);
        bit = allBits[randBit].id;
        bitChosen = false;
    }
    else{
        bit = allBits[parseInt(bey1BitDropdown.value)].id;
        bitChosen = true;
    } 

    if(allBlades[blade].abbv == "ClMr" && allRachets[rachet].type != "simple"){ //check for ClockMirage and Simple Ratchets
        //throw error
        console.error("ClockMirage is only compatable with Simple Ratchets (ie. 4-55, M-85 etc.)");
    }
    else if(allBlades[blade].system == "UX2" && allBits[bit].type == "ratchetBit"){ //check for UX Expanded/Infinity blades and ratchet integrated bits
        //throw error
        console.error("UX Expanded/Infinity blades are not compatable with Ratchet Integrated Bits");
    }
    else{
        //console.log(JSON.stringify(blade));
        bey1 = new BeyBlade(bitChip, over, blade, assist, rachet, bit);

        wasBey1Generated = true;
        addBeyblade(bey1);
        error.textContent = "";
        bey1Is.textContent = "" + bey1.name;
        showBeybladeStats(bey1, 1);
        createWinButtons();
        clearUndoStack();
    }

}

//generate a beyblade based on the selections for the second set of drop downs
function generateBey2(){

    console.log("called generateBey2()");

    //uses the id's of all parts for easy call
    var bitChip = -1;
    var over = -1;
    var blade = -1;
    var assist = -1;
    var rachet = -1;
    var bit = -1;

    //boolean values to check if the beyblade is random or not
    var bitChipChosen = false;
    var overBladeChosen = false;
    var bladeChosen = false;
    var assistChosen = false;
    var rachetChosen = false;
    var bitChosen = false;

    //random or chosen...
    //...bit chip?
    if(bey2BitChipDropdown.value=="random"){
        var randBitChip = getRandomInt(allBitChips.length);
        bitChip = allBitChips[randBitChip].id;
        bitChipChosen = false;
    }
    else{
        bitChip = allBitChips[parseInt(bey2BitChipDropdown.value)].id;
        bitChipChosen = true;
    }
    //...over blade?
    if(bey2OverBladeDropdown.value=="random"){
        var randOverBlade = getRandomInt(allOverBlades.length);
        over = allOverBlades[randOverBlade].id;
        overBladeChosen = false;
    }
    else{
        over = allOverBlades[parseInt(bey2OverBladeDropdown.value)].id;
        overBladeChosen = true;
    }
    //...blade?
    if(bey2BladeDropdown.value=="random"){
        randBlade = getRandomInt(allBlades.length);
        blade = allBlades[randBlade].id;
        bladeChosen = false;
    }
    else{
        blade = allBlades[parseInt(bey2BladeDropdown.value)].id;
        bladeChosen = true;
    }
    
    //...assist blade?
    if(bey2AssistBladeDropdown.value=="random"){
        var randAssistBlade = getRandomInt(allAssists.length);
        assist = allAssists[randAssistBlade].id;
        assistChosen = false;
    }
    else{
        assist = allAssists[parseInt(bey2AssistBladeDropdown.value)].id;
        assistChosen = true;
    }
    //...rachet?
    if(bey2RachetDropdown.value=="random"){
        randRachet = getRandomInt(allRachets.length);
        rachet = allRachets[randRachet].id;
        rachetChosen = false;
    }
    else{
        rachet = allRachets[parseInt(bey2RachetDropdown.value)].id;
        rachetChosen = true;
    }
    //...bit?
    if(bey2BitDropdown.value=="random"){
        randBit = getRandomInt(allBits.length);
        bit = allBits[randBit].id;
        bitChosen = false;
    }
    else{
        bit = allBits[parseInt(bey2BitDropdown.value)].id;
        bitChosen = true;
    }

    if(allBlades[blade].abbv == "ClMr" && allRachets[rachet].type != "simple"){ //check for ClockMirage and Simple Ratchets
        //throw error
        console.error("ClockMirage is only compatable with Simple Ratchets (ie. 4-55, M-85 etc.)");
    }
    else if(allBlades[blade].system == "UX2" && allBits[bit].type == "ratchetBit"){ //check for ratchet integrated blades and ratchet integrated bits
        //throw error
        console.error("UX Expanded/Infinity blades are not compatable with Ratchet Integrated Bits");
    }
    else{
        bey2 = new BeyBlade(bitChip, over, blade, assist, rachet, bit);

        wasBey2Generated = true;
        addBeyblade(bey2);
        error.textContent = "";
        bey2Is.textContent = "" + bey2.name;
        showBeybladeStats(bey2, 2);
        createWinButtons();
        clearUndoStack();
    }

}

//unhide win buttons on screen
function createWinButtons(){
    //console.log("called createWinButtons()");

    var vsContainer = document.getElementById("vsContainer");

    // if bey1 and bey2 are set
    if(bey1 && bey1.id && bey2 && bey2.id) {
        // display vs buttons
        vsContainer.style.visibility="visible";
        vsContainer.style.display="inherit";

        //once both beys are made, make sure they have a matchup in the recordsDBX
        console.log("win button adding records 1");
        updateRecords(bey1, bey2);

        // titles above win buttons
        bey1WinTitle.innerHTML = bey1.findNameHtml();
        bey2WinTitle.innerHTML = bey2.findNameHtml();
    }
}
function clearVsButtons(){
    // unset bey parts
    bey1=null;
    bey2=null;
    // hide vs buttons
    vsContainer.style.visibility="hidden";
    vsContainer.style.display="none";
    // clear stats
    showBeybladeStats(null, 0);
}

const choseWinnerDebounced = debounce(function(number, wintype) {
    choseWinner(number, wintype);
});

/**
 * set winner when user presses button
 * @param {int} beyNumber 
 * @param {string} winType : 'ko', 'so', 'x', 'burst', 'draw'
 */
function choseWinner(beyNumber, winType) {

    console.log("called chooseWinner(" + beyNumber + ", " + winType + ")");

    console.log("Winner: " + beyNumber + " by: " + winType);
    var winnerBey = ( beyNumber==1 ) ? bey1 : bey2; // if beyNumber==1, choose bey1, else choose bey2
    var loserBey = ( beyNumber==1 ) ? bey2 : bey1;

    // set winner (or draw)
    asyncUpdateWinCounts(winnerBey, loserBey, winType);
    asyncUpdateRecords(winnerBey, loserBey, winType);

    // convert short text to text description
    var winText = "";
    switch(winType) {
        case "KO":
            winText="Over Finish";
            break;
        case "SO":
            winText="Spin Finish";
            break;
        case "burst":
            winText="Burst Finish";
            break;
        case "x":
            winText="Xtreme Finish";
            break;
        case "draw":
            winText="Draw";
            break;
        default:
            winText="Something went wrong, results not logged"
    }

    if(winType=="draw" || beyNumber==0) {
        winners.textContent = "It ended in a Draw!";
    } else {
        winners.textContent = "The winner of this round is: " + winnerBey.name + " by "+ winText +"!";
    }

}


//add a new, not before generated beyblade to the database
function addBeyblade(bey) {

    console.log("called addBeyblade(" + bey.name + ")");
    isRatchetBit = ( "ratchetBit" == allBits[bey.bit].type );
    var beyblade = {
        _id: bey.getDbId(),
        title: bey.name,
        build: bey
    };

    beyBladeDBX.put(beyblade, function callback(err, result) {
        if (!err) {
            showBeyblades();
            console.log('Successfully added a beyblade!');
        }
        // else{
        //     console.log(err);
        // }
    });

}

function getSelectedStadiumId() {
    if (stadiumSelector && stadiumSelector.value) {
        return stadiumSelector.value;
    }
    if (selectedStadium && selectedStadium.stadiumId) {
        return selectedStadium.stadiumId;
    }
    return DEFAULT_STADIUM_ID;
}

//tracking for past match ups, so we know what build blades won or lost against, instead of anon stats
function addRecord(beyA, beyB, stadiumId){

    var vsId = vsRecordId(beyA.id, beyB.id, stadiumId);
    console.log("called addRecord( "+vsId)

    // return promise for more chaining
    return recordsDBX.get(vsId)
    .then(function() { 
        console.log("vsRecord already exists") 
    }) //if doc exists, do nothing
    .catch(function (err) { // if doc doesn't exist, create it
        if (err.name === 'not_found') {
            console.log("vsRecord not found, creating");
            return recordsDBX.put(buildVsRecordDoc(beyA, beyB, stadiumId));
        } else {
            console.log("error creating record +\n"+err);
            throw err; // rethrow to propagate
        }
    });
}

//edit beyblade win stats incase of mis inputs
function editBey(wko, lko, wso, lso, wbst, lbst, wx, lx, dr){

    console.log("called editBey(" + wko + ", " + lko + ", " + wso + ", " + lso + ", " + wbst + ", " + lbst + ", " + wx + ", " + lx + ", " + dr + ")");

    beyBladeDBX.get(selectedBey.value, function(err, doc) {
        var statEditor = document.getElementById("statEditor");
        if(!err){
            if(wko){
                doc.build.winsKO = parseInt(wko);                
            }
            if(lko){
                doc.build.loseKO = parseInt(lko);                
            }
            if(wso){
                doc.build.winsSO = parseInt(wso);                
            }
            if(lso){
                doc.build.loseSO = parseInt(lso);                
            }
            if(wbst){
                doc.build.winsBst = parseInt(wbst);                
            }
            if(lbst){
                doc.build.loseBst = parseInt(lbst);                
            }
            if(wx){
                doc.build.winsX = parseInt(wx);                
            }
            if(lx){
                doc.build.loseX = parseInt(lx);                
            }
            if(dr){
                doc.build.draws = parseInt(dr);                
            }
            beyBladeDBX.put(doc).then();
            statEditor.reset();
            showBeyblades();
            dbBeyName.textContent = doc.build.name;
            dbBeyStats.textContent = "Weight: " + round(doc.build.weight,2) + " grams";
            dbBeyKO.textContent = "Over Win/Loss: " + doc.build.winsKO + " / " + doc.build.loseKO;
            dbBeySO.textContent = "Spin Win/Loss: " + doc.build.winsSO + " / " + doc.build.loseSO;
            dbBeyBst.textContent = "Burst Win/Loss: " + doc.build.winsBst + " / " + doc.build.loseBst;
            dbBeyX.textContent = "Xtreme Win/Loss: " + doc.build.winsX + " / " + doc.build.loseX;
            dbBeyDraw.textContent = "Draws: " + doc.build.draws;
            dbBey = doc.build;
        }
    });

}

//update vsRecords with win/loss
async function asyncUpdateRecords(winner, loser, outcome){

    console.log("called asyncUpdateRecords: " + winner.name + ", " + loser.name + ", " + outcome + "");

    var stadiumId = getSelectedStadiumId();
    var recordId = vsRecordId(winner.id, loser.id, stadiumId);

    try {
        await addRecord(winner, loser, stadiumId);
        let vsRecord = await recordsDBX.get(recordId);
        await addToVsRecordUndoStack(vsRecord);
        applyOutcomeToVsRecord(vsRecord, winner.id, outcome);
        await recordsDBX.put(vsRecord);
    } catch (err) {
        console.error(err);
    }
}

// Ensure vsRecord exists for the current stadium and refresh bey snapshots on it
function updateRecords(beyA, beyB){

    var stadiumId = getSelectedStadiumId();
    var recordId = vsRecordId(beyA.id, beyB.id, stadiumId);
    var ordered = orderBeysForVsRecord(beyA, beyB);
    console.log("called updateRecords: " + recordId);

    return addRecord(beyA, beyB, stadiumId)
    .then(() => updateField(recordId, d => {
        d.bey1 = ordered.bey1;
        d.bey2 = ordered.bey2;
        d.bey1Id = ordered.bey1.id;
        d.bey2Id = ordered.bey2.id;
        d.stadiumId = stadiumId;
        d.title = ordered.bey1.name + " vs " + ordered.bey2.name;
    }))
    .then(() => displayRecords());
}

/**
 * updates one field on a vsRecord
 * (technically, it can do more with the function)
 * returns promise from pouchdb
 * ex: increment wko (KO wins)
 * updateField(recordId, d => { d.scores.wko++; }).then(doStuffFunc);
 * @param {string} id - vsRecord _id
 * @param {*} updater - provide your own function
 * @returns promise
 */
function updateField(id, updater) {
  return recordsDBX.get(id).then(doc => {
    updater(doc);
    return recordsDBX.put(doc);
  });
}

async function asyncUpdateWinCounts(winner, loser, outcome){
    console.log("called asyncUpdateWinCounts(" + winner.name + ", " + loser.name + ", " + outcome + ")");

    try {
        let winnerRecord = await beyBladeDBX.get(winner.id);
        let loserRecord = await beyBladeDBX.get(loser.id);
        await addToBeybladeUndoStack(winnerRecord);
        await addToBeybladeUndoStack(loserRecord);

        switch(outcome) {
            case "KO":
                winnerRecord.build.winsKO += 1;
                loserRecord.build.loseKO += 1;
                break;
            case "SO":
                winnerRecord.build.winsSO += 1;
                loserRecord.build.loseSO += 1;
                break;
            case "burst":
                winnerRecord.build.winsBst += 1;
                loserRecord.build.loseBst += 1;
                break;
            case "x":
                winnerRecord.build.winsX += 1;
                loserRecord.build.loseX += 1;
                break;
            case "draw":
                winnerRecord.build.draws += 1;
                loserRecord.build.draws += 1;
                break;
            default:
                console.log("error updating winners and losers")
        }

        await beyBladeDBX.put(winnerRecord);
        await beyBladeDBX.put(loserRecord);

        await refreshUI();
    } catch (err) {
        console.error(err);
    }
}

const undoStackBeyblade = [];
const undoStackVsRecord = [];
async function addToBeybladeUndoStack(doc) {
    console.log("adding to undo beyblade stack: " + doc._id);
    let cloneDoc = structuredClone(doc);
    undoStackBeyblade.push( cloneDoc );
}
async function addToVsRecordUndoStack(doc) {
    console.log("adding to undo vs stack: " + doc._id);
    const cloneVsRecord = structuredClone(doc);
    undoStackVsRecord.push(cloneVsRecord);
}
function clearUndoStack(){
    console.log("clear undo stack");
    // clear const arrays
    while (undoStackVsRecord.length > 0) {
        undoStackVsRecord.pop();
    }
    while (undoStackBeyblade.length > 0) {
        undoStackBeyblade.pop();
    }
}

/**
 * return beyblades and VS Record to their previous states
 */
async function undoRecord() {
    console.log("undo-ing");
    // beyblade undo
    try {
        if(undoStackBeyblade.length > 0) {
            let applyMe1 =  undoStackBeyblade.pop();
            // get current revision of this doc, grab the _rev field, apply to obj
            let currentRev1 = await beyBladeDBX.get(applyMe1._id);
            applyMe1._rev = currentRev1._rev;
            
            console.log(JSON.stringify(applyMe1));
            await beyBladeDBX.put( applyMe1 );

            let applyMe2 =  undoStackBeyblade.pop();
            let currentRev2 = await beyBladeDBX.get(applyMe2._id);
            applyMe2._rev = currentRev2._rev;
            console.log(JSON.stringify(applyMe2));
            await beyBladeDBX.put( applyMe2 );
        } else {
            console.log("nothing to undo (bey)");
        }
    } catch(err) {
        console.log("error re-applying beyblade stack:");
        console.log(err);
    }

    //vs record undo (single canonical record per matchup)
    try {
        if(undoStackVsRecord.length > 0) {
            let applyVs1 = undoStackVsRecord.pop();
            let currentVsRev1 = await recordsDBX.get(applyVs1._id);
            applyVs1._rev = currentVsRev1._rev;
            await recordsDBX.put(applyVs1);

            winners.textContent = "Undid last round";
        } else {
            console.log("nothing to undo (vs)");
            winners.textContent = "Nothing to undo";
        }
    } catch(err) {
        console.log("error re-applying vsRecord stack:");
        console.log(err);
    }
    refreshUI();
    
}

// prevents double taps on touchscreen
let undoDebounced = debounce(undoRecord);

//fills the bey selection menu
function showBeyblades() {
    console.log("showBeyblades()");
    var dbSelectList = document.getElementById("dbSelectList");

    //clear the list so we dont just add more options
    while (dbSelectList.options.length > 0) {                
        dbSelectList.remove(0);
    }

    // add beys to list
    beyBladeDBX.allDocs({include_docs: true, descending: true}, function(err, doc) {
        doc.rows.sort(function(a, b){
            return (''+a.doc.build.name).localeCompare(b.doc.build.name);
        });
        for(i = 0; i < doc.total_rows; i++){
            if(!err){
                // add option to list
                var options = document.createElement("option");
                options.textContent = doc.rows[i].doc.build.name;
                options.value = doc.rows[i].doc._id;
                dbSelectList.appendChild(options);
            }
            else{
                //console.log(err);
            }
       }
    });
}

function clearDbStats(){
    dbBeyIs.innerHTML = "";
    dbBeyWeight.innerHTML = "";
    dbBeyStats.innerHTML = "";
    dbWinPercent.innerHTML = "";
    dbPPW.innerHTML = "";
    dbPPL.innerHTML = "";
    dbPointDif.innerHTML = "";
    dbBeySO.innerHTML = "";
    dbBeyBst.innerHTML = "";
    dbBeyKO.innerHTML = "";
    dbBeyX.innerHTML = "";
    dbBeyDraw.innerHTML = "";
    dbBeySpace.classList.add("hidden");
}

// DB stats to copy to clipboard. This must be global so the button listener function gets updated text
var dbCopiedStats = "";

function copyStats() {
    console.log("copy to clipboard");
    //console.log(dbCopiedStats);
    navigator.clipboard.writeText(dbCopiedStats);
}
function dbSetBey(beyNumber=1) {
    showBeybladeStats(dbBey, beyNumber);
    if (beyNumber==1) {
        bey1=dbBey;
    } else {
        bey2=dbBey;
    }
    createWinButtons();
    clearUndoStack();
}
function populateMatchHistOnclick(){
    populateMatchHist(dbBey);
}

//shows selected bey's stats and allows for the user to set the selected bey to bey 1 or 2
function setDbBey(){

    console.log("called setDbBey(), selectedBey: " + selectedBey.value);

    beyBladeDBX.get(selectedBey.value, function(err, doc) {
        if(!err){
            var castDoc = BeyBlade.fromBuild(doc.build);

            var winHolder = castDoc.getTotalWin();
            var winPointHolder = castDoc.getWinPoints();
            var lossHolder = castDoc.getTotalLoss();
            var lossPointHolder = castDoc.getLossPoints();
            var totalHolder = castDoc.getTotalMatch();
            var avgPPW = round((winPointHolder/winHolder),2);
            var avgPPL = round((lossPointHolder/lossHolder),2);
            var totalPointChange = castDoc.getPointChange();
            var totalMatches = doc.build.winsKO +doc.build.loseKO +doc.build.winsSO +doc.build.loseSO +doc.build.winsBst +doc.build.loseBst +doc.build.winsX+doc.build.loseX + doc.build.draws;
            var avgPointChangePerRound = totalPointChange / totalMatches;
            var avgWinPercent = round((winHolder/totalHolder)*100,2);

            if (isNaN(avgPPW)){ avgPPW=0; }
            if (isNaN(avgWinPercent)){ avgWinPercent=0; }
            if (isNaN(avgPPL)){ avgPPL=0; }
            if (isNaN(avgPointChangePerRound)){ avgPointChangePerRound=0; }

            dbBeySpace.classList.remove("hidden");

            // fill in html
            dbBeyName.textContent = doc.build.name;
            dbBeyWeight.textContent = "Weight: " + round(doc.build.weight,2) + " grams";
            dbBeyStats.textContent = " Spin: " + doc.build.spin;
            dbWinPercent.textContent = "Average Win%: " + avgWinPercent + "%";
            dbPPW.textContent = "Average Points per Win: " + avgPPW;
            dbPPL.textContent = "Average Points per Loss: " + avgPPL;
            dbPointDif.textContent = "Average Points per Round: " + round(avgPointChangePerRound,2); 
            dbBeyKO.textContent = "Over Win/Loss: " + doc.build.winsKO + " / " + doc.build.loseKO;
            dbBeySO.textContent = "Spin Win/Loss: " + doc.build.winsSO + " / " + doc.build.loseSO;
            dbBeyBst.textContent = "Burst Win/Loss: " + doc.build.winsBst + " / " + doc.build.loseBst;
            dbBeyX.textContent = "Xtreme Win/Loss: " + doc.build.winsX + " / " + doc.build.loseX;
            dbBeyDraw.textContent = "Draws: " + doc.build.draws;
            dbBey = castDoc;

            
            // clipboard
            dbCopiedStats =   "Overall Results for " + doc.build.name + "\n" +
                                "Average Win%: " + avgWinPercent + "% \n" +
                                "Average Points Per Win: " + avgPPW + "\n" +
                                "Average Points Per Loss: " + avgPPL + "\n" +
                                "Average Points Per Round: " + round(avgPointChangePerRound,2) + "\n" +
                                "Spin Finish Win/Loss: " + doc.build.winsSO + "W / " + doc.build.loseSO + "L \n" +
                                "Burst Finish Win/Loss: " + doc.build.winsBst + "W / " + doc.build.loseBst + "L \n" +
                                "Over Finish Win/Loss: " + doc.build.winsKO + "W / " + doc.build.loseKO + "L \n" + 
                                "Xtreme Finish Win/Loss: " + doc.build.winsX + "W / " + doc.build.loseX + "L \n" +
                                "Draws: " + doc.build.draws + "\n" +
                                "Copied from " + "https://fabelavalon.github.io/BeyBuilderX/";
                        
        }
        // else{
        //     console.log(err);
        // }
    });
}

//displays the win loss and weight stats for the chosen beyblade
function showBeybladeStats(bey, whichBey) {
    console.log("called showBeybladeStats()" ); 
    
    // clear stats on page
    if (bey==null || whichBey==0) {
        bey1Is.textContent = "Beyblade 1 has not been selected.";
        bey1Stats.textContent = "";
        bey1SO.textContent = "";
        bey1Bst.textContent = "";
        bey1KO.textContent = "";
        bey1X.textContent = "";
        bey1Draw.textContent = "";

        bey2Is.textContent = "Beyblade 2 has not been selected.";
        bey2Stats.textContent = "";
        bey2SO.textContent = "";
        bey2Bst.textContent = "";
        bey2KO.textContent = "";
        bey2X.textContent = "";
        bey2Draw.textContent = "";

        return;
    }

    //console.log("casting object ...");
    var castDoc = BeyBlade.fromBuild(bey);
    console.log("called showBeybladeStats(" + bey.name + ", " + whichBey + "), id: " + castDoc.getDbId() ); 
    
    switch(whichBey){
        case 1:
            beyBladeDBX.get(bey.id, function(err, doc) {
                console.log(JSON.stringify(doc));
                if(!err){
                    bey1Is.textContent = "BeyBlade 1 is: " + doc.build.name;
                    bey1Stats.textContent = "Weight: " + round(doc.build.weight, 2) + " grams";
                    bey1SO.textContent = "Spin Win/Loss: " + doc.build.winsSO + " / " + doc.build.loseSO;
                    bey1Bst.textContent = "Burst Win/Loss: " + doc.build.winsBst + " / " + doc.build.loseBst;
                    bey1KO.textContent = "Over Win/Loss: " + doc.build.winsKO + " / " + doc.build.loseKO;
                    bey1X.textContent = "Xtreme Win/Loss: " + doc.build.winsX + " / " + doc.build.loseX;
                    bey1Draw.textContent = "Draws: " + doc.build.draws;
                }
                else {
                    //console.log(err);
                }
            });
        break;
        case 2:
            beyBladeDBX.get(bey.id, function(err, doc) {
                if(!err){
                    bey2Is.textContent = "BeyBlade 2 is: " + doc.build.name;
                    bey2Stats.textContent = "Weight: " + round(doc.build.weight,2) + " grams";
                    bey2SO.textContent = "Spin Win/Loss: " + doc.build.winsSO + " / " + doc.build.loseSO;
                    bey2Bst.textContent = "Burst Win/Loss: " + doc.build.winsBst + " / " + doc.build.loseBst;
                    bey2KO.textContent = "Over Win/Loss: " + doc.build.winsKO + " / " + doc.build.loseKO;
                    bey2X.textContent = "Xtreme Win/Loss: " + doc.build.winsX + " / " + doc.build.loseX;
                    bey2Draw.textContent = "Draws: " + doc.build.draws;
                }
                else{
                    //console.log(err);
                }
            });
        break;
    }

}

// copy-to-clipboard text. Must be global so the onclick listener can access
var displayCopiedStats = "";

//fill matchup table on main screen when both beys are chosen
function displayRecords(){

    console.log("called displayRecords()");
    if(!bey1 || !bey2) {
        console.log("beys not set");
        return;
    }

    // element collections (include overlay window elements when present)
    var record1 = new Set([
        ...document.getElementsByName("record1"),
        ...(scoreOverlayWindow?.document.getElementsByName("record1") ?? [])
    ]);
    var wins1 = new Set([
        ...document.getElementsByName("wins1"),
        ...(scoreOverlayWindow?.document.getElementsByName("wins1") ?? [])
    ]);
    var points1 = new Set([
        ...document.getElementsByName("points1"),
        ...(scoreOverlayWindow?.document.getElementsByName("points1") ?? [])
    ]);
    var ko1 = new Set([
        ...document.getElementsByName("ko1"),
        ...(scoreOverlayWindow?.document.getElementsByName("ko1") ?? [])
    ]);
    var so1 = new Set([
        ...document.getElementsByName("so1"),
        ...(scoreOverlayWindow?.document.getElementsByName("so1") ?? [])
    ]);
    var bst1 = new Set([
        ...document.getElementsByName("bst1"),
        ...(scoreOverlayWindow?.document.getElementsByName("bst1") ?? [])
    ]);
    var x1 = new Set([
        ...document.getElementsByName("x1"),
        ...(scoreOverlayWindow?.document.getElementsByName("x1") ?? [])
    ]);

    var record2 = new Set([
        ...document.getElementsByName("record2"),
        ...(scoreOverlayWindow?.document.getElementsByName("record2") ?? [])
    ]);
    var wins2 = new Set([
        ...document.getElementsByName("wins2"),
        ...(scoreOverlayWindow?.document.getElementsByName("wins2") ?? [])
    ]);
    var points2 = new Set([
        ...document.getElementsByName("points2"),
        ...(scoreOverlayWindow?.document.getElementsByName("points2") ?? [])
    ]);
    var ko2 = new Set([
        ...document.getElementsByName("ko2"),
        ...(scoreOverlayWindow?.document.getElementsByName("ko2") ?? [])
    ]);
    var so2 = new Set([
        ...document.getElementsByName("so2"),
        ...(scoreOverlayWindow?.document.getElementsByName("so2") ?? [])
    ]);
    var bst2 = new Set([
        ...document.getElementsByName("bst2"),
        ...(scoreOverlayWindow?.document.getElementsByName("bst2") ?? [])
    ]);
    var x2 = new Set([
        ...document.getElementsByName("x2"),
        ...(scoreOverlayWindow?.document.getElementsByName("x2") ?? [])
    ]);

    var draws = new Set([
        ...document.getElementsByName("draws"),
        ...(scoreOverlayWindow?.document.getElementsByName("draws") ?? [])
    ]);
    var totalRounds = new Set([
        ...document.getElementsByName("vsTotalRounds"),
        ...(scoreOverlayWindow?.document.getElementsByName("vsTotalRounds") ?? [])
    ]);

    var vsId = vsRecordId(bey1.id, bey2.id, getSelectedStadiumId());

    var bey1SO = 0;
    var bey1Bst = 0;
    var bey1KO = 0;
    var bey1X = 0;
    var bey1Total = 0;
    var bey1Points = 0;
    var bey2SO = 0
    var bey2Bst = 0;
    var bey2KO = 0;
    var bey2X = 0;
    var bey2Total = 0;
    var bey2Points = 0;
    var draw = 0;
    var totalRound = 0;

    function resetVsDisplay() {
        record1.forEach(el => el.innerHTML = bey1.findNameHtml());
        record2.forEach(el => el.innerHTML = bey2.findNameHtml());
        ko1.forEach(el => el.textContent = "0");
        so1.forEach(el => el.textContent = "0");
        bst1.forEach(el => el.textContent = "0");
        x1.forEach(el => el.textContent = "0");
        wins1.forEach(el => el.textContent = "0");
        points1.forEach(el => el.textContent = "0");
        ko2.forEach(el => el.textContent = "0");
        so2.forEach(el => el.textContent = "0");
        bst2.forEach(el => el.textContent = "0");
        x2.forEach(el => el.textContent = "0");
        wins2.forEach(el => el.textContent = "0");
        points2.forEach(el => el.textContent = "0");
        draws.forEach(el => el.textContent = "0");
        totalRounds.forEach(el => el.textContent = "Total: 0");
        displayCopiedStats = "";
    }

    console.log("fetching record ID " + vsId);
    resetVsDisplay();
    recordsDBX.get(vsId, function(err, vsRecord){
        if (err || !vsRecord) {
            console.log("displayRecords() missing vsRecord:\n"+err);
            return;
        }
        if (vsRecord.title != undefined) {
            console.log("displayRecords() got:\n"+vsRecord.title);
        } else {
            console.log("displayRecords() got:\n"+JSON.stringify(vsRecord));
        }

        // Stats are stored bey1-oriented; remap to bey1 / bey2 for the UI
        var bey1Stats = vsStatsFromPerspective(vsRecord, bey1.id);
        
        record1.forEach(el => el.innerHTML = (bey1.findNameHtml()));
        ko1.forEach(el => el.textContent = bey1Stats.wko);
        bey1KO = bey1Stats.wko;
        so1.forEach(el => el.textContent = bey1Stats.wso);
        bey1SO = bey1Stats.wso
        bst1.forEach(el => el.textContent = bey1Stats.wbst);
        bey1Bst = bey1Stats.wbst;
        x1.forEach(el => el.textContent = bey1Stats.wx);
        bey1X = bey1Stats.wx;
        wins1.forEach(el => el.textContent = bey1Stats.wx + bey1Stats.wbst + bey1Stats.wko + bey1Stats.wso);
        bey1Total = bey1Stats.wx + bey1Stats.wbst + bey1Stats.wko + bey1Stats.wso;
        points1.forEach(el => el.textContent = bey1Stats.wx*3 + bey1Stats.wbst*2 + bey1Stats.wko*2 + bey1Stats.wso);
        bey1Points = bey1Stats.wx*3 + bey1Stats.wbst*2 + bey1Stats.wko*2 + bey1Stats.wso;

        record2.forEach(el => el.innerHTML = bey2.findNameHtml());
        ko2.forEach(el => el.textContent = bey1Stats.lko);
        bey2KO = bey1Stats.lko;
        so2.forEach(el => el.textContent = bey1Stats.lso);
        bey2SO = bey1Stats.lso
        bst2.forEach(el => el.textContent =  bey1Stats.lbst);
        bey2Bst = bey1Stats.lbst;
        x2.forEach(el => el.textContent =  bey1Stats.lx);
        bey2X = bey1Stats.lx;
        wins2.forEach(el => el.textContent = bey1Stats.lx + bey1Stats.lbst + bey1Stats.lko + bey1Stats.lso);
        bey2Total = bey1Stats.lx + bey1Stats.lbst + bey1Stats.lko + bey1Stats.lso
        points2.forEach(el => el.textContent = bey1Stats.lx*3 + bey1Stats.lbst*2 + bey1Stats.lko*2 + bey1Stats.lso);
        bey2Points = bey1Stats.lx*3 + bey1Stats.lbst*2 + bey1Stats.lko*2 + bey1Stats.lso;

        draws.forEach(el => el.textContent =  bey1Stats.draws);
        draw = bey1Stats.draws;

        totalRounds.forEach(el => el.textContent = "Total: " + (bey1Stats.wx + bey1Stats.wbst + bey1Stats.wko + bey1Stats.wso + bey1Stats.lx + bey1Stats.lbst + bey1Stats.lko + bey1Stats.lso + bey1Stats.draws));
        totalRound = bey1Stats.wx + bey1Stats.wbst + bey1Stats.wko + bey1Stats.wso + bey1Stats.lx + bey1Stats.lbst + bey1Stats.lko + bey1Stats.lso + bey1Stats.draws;

        var stadiumLabel = getStadiumName(vsRecord.stadiumId);
        displayCopiedStats =   "Results for " + bey1.name + " VS " + bey2.name + "\n" +
                        "Stadium: " + stadiumLabel + "\n" +
                        "Number of rounds: " + totalRound + "\n" +
                        "Spin Finishes: " + bey1SO + " / " + bey2SO + "\n" +
                        "Burst Finishes: " + bey1Bst + " / " + bey2Bst + "\n" +
                        "Over Finishes: " + bey1KO + " / " + bey2KO + "\n" +
                        "Xtreme Finishes: " + bey1X + " / " + bey2X + "\n" +
                        "Draws: " + draw + "\n" +
                        "Total Wins: " + bey1Total + " / " + bey2Total + "\n" +
                        "Points: " + bey1Points + " / " + bey2Points + "\n" +
                        "Copied from " + "https://fabelavalon.github.io/BeyBuilderX/";
        
    });

    //function for clipboard listener
    function copyStatFunc() {
        console.log("copy listener");
        console.log(displayCopiedStats);
        navigator.clipboard.writeText(displayCopiedStats);
    }
    if(!wasCopyMatchupToClipGenerated) {
        //copy to clipboard
        recordsCopybtn.innerHTML = "Copy Matchup to Clipboard";
        recordsCopybtn.classList.add("btn");
        recordsCopybtn.classList.add("btn-primary");
        recordsCopybtn.addEventListener("click", copyStatFunc);
        recordsSpace.append(recordsCopybtn);
        wasCopyMatchupToClipGenerated = true;
    }

    if(!wasClearMatchupHistoryGenerated){
        //clear matchup history, remove all matches between these 2 blades
        clearHistoryBtn.innerHTML = "Clear Matchup History";
        clearHistoryBtn.classList.add("btn");
        clearHistoryBtn.classList.add("btn-danger");
        clearHistoryBtn.setAttribute("data-bs-toggle", "modal");
        clearHistoryBtn.setAttribute("data-bs-target", "#areYouSure3");
        recordsSpace.append(clearHistoryBtn);
        wasClearMatchupHistoryGenerated = true;
    }


    if(!wasOverlayGenerated  && enableOverlayBtnsCheckbox.checked){
        // pop-out modal for score and buttons
        overlayBtn.innerHTML = "Overlay";
        overlayBtn.classList.add("btn");
        overlayBtn.classList.add("btn-primary");
        // overlayBtn.setAttribute("data-bs-toggle", "modal");
        // overlayBtn.setAttribute("data-bs-target", "#overlay");
        overlayBtn.onclick = createBrowserPopup;
        recordsSpace.append(overlayBtn);
        wasOverlayGenerated = true;

    }
    if ( !wasSwapGenerated && scoreOverlayWindow && !scoreOverlayWindow.closed && enableOverlayBtnsCheckbox.checked ) {
        const overlaySwapHtml = ` <span class="d-none">&circlearrowleft;</span>`;
        // swap bey 1 and bey 2 score display on the popup
        overlaySwapBeysBtn.innerHTML = "Swap on Overlay"+overlaySwapHtml;
        overlaySwapBeysBtn.classList.add("btn");
        overlaySwapBeysBtn.classList.add("btn-primary");
        overlaySwapBeysBtn.setAttribute("data-bs-toggle", "modal");
        overlaySwapBeysBtn.setAttribute("data-bs-target", "#overlay");
        overlaySwapBeysBtn.onclick = swapOverlayBeys;
        recordsSpace.append(overlaySwapBeysBtn);
        wasSwapGenerated = true;
    }

}

function clearMatchupHistory(){
    nullifyBeybladeScores(bey1.id, bey2.id);

    if(dbBey.id == bey1.id || dbBey.id==bey2.id){    
        // clear selected db bey
        clearDbStats();
    }
}

/**
 * re-runs all UI functions so we see the latest record
 */
function refreshUI(){
    showBeybladeStats(bey1, 1);
    showBeybladeStats(bey2, 2);
    displayRecords();
}

/**
 * pretend a matchup never happened (current stadium only)
 * negates the score on both beyblade builds, zeros the canonical vsRecord
 * @param {string} primaryBeyId 
 * @param {string} nullifyBeyId 
 */
function nullifyBeybladeScores(primaryBeyId, nullifyBeyId){
    var recordID = vsRecordId(primaryBeyId, nullifyBeyId, getSelectedStadiumId());
    console.log("clearing matchup history for " + recordID);
    recordsDBX.get(recordID, function(err, vsRecord){
        if (err || !vsRecord) {
            console.log(err);
            return;
        }
        console.log( JSON.stringify(vsRecord) );
        var vsRecordClone = structuredClone(vsRecord); //JS deep copy
        var scores = vsRecordClone.scores;

        function subtractFromBey(beyId, stats) {
            beyBladeDBX.get(beyId, function(err, beyblade) {
                if (err || !beyblade) {
                    console.log(err);
                    return;
                }
                beyblade.build.winsKO  -= stats.wko;
                beyblade.build.loseKO  -= stats.lko;
                beyblade.build.winsSO  -= stats.wso;
                beyblade.build.loseSO  -= stats.lso;
                beyblade.build.winsBst -= stats.wbst;
                beyblade.build.loseBst -= stats.lbst;
                beyblade.build.winsX   -= stats.wx;
                beyblade.build.loseX   -= stats.lx;
                beyblade.build.draws   -= stats.draws;
                beyBladeDBX.put(beyblade).then(refreshUI);
            });
        }

        subtractFromBey(vsRecordClone.bey1Id, {
            wko: scores.wko, lko: scores.lko,
            wso: scores.wso, lso: scores.lso,
            wbst: scores.wbst, lbst: scores.lbst,
            wx: scores.wx, lx: scores.lx,
            draws: scores.draws
        });
        // bey2's wins are bey1's losses (and vice versa)
        subtractFromBey(vsRecordClone.bey2Id, {
            wko: scores.lko, lko: scores.wko,
            wso: scores.lso, lso: scores.wso,
            wbst: scores.lbst, lbst: scores.wbst,
            wx: scores.lx, lx: scores.wx,
            draws: scores.draws
        });

        vsRecord.scores = emptyVsScores();
        recordsDBX.put(vsRecord).then(refreshUI);
    });
}


//displays part win/loss records when a user chooses to see them
function showPartStats(partType, partID){

    //console.log("called showPartsStats(" + partType + ", " + partID + ")");
    
    var partWko = 0;
    var partLko = 0;
    var partWso = 0;
    var partLso = 0;
    var partWbst = 0;
    var partLbst = 0;
    var partWx = 0;
    var partLx = 0;
    var partDraw = 0;

    beyBladeDBX.allDocs({include_docs: true, descending: true}, function(err, doc) {

        for(i = 0; i < doc.total_rows; i++){

            switch(partType) {
                case "blade":
                    if(doc.rows[i].doc.build.blade==partID){
                        partWko += parseInt(doc.rows[i].doc.build.winsKO);
                        partLko += parseInt(doc.rows[i].doc.build.loseKO);
                        partWso += parseInt(doc.rows[i].doc.build.winsSO);
                        partLso += parseInt(doc.rows[i].doc.build.loseSO);
                        partWbst += parseInt(doc.rows[i].doc.build.winsBst);
                        partLbst += parseInt(doc.rows[i].doc.build.loseBst);
                        partWx += parseInt(doc.rows[i].doc.build.winsX);
                        partLx += parseInt(doc.rows[i].doc.build.loseX);
                        partDraw += parseInt(doc.rows[i].doc.build.draws);
                    }
                break;
                case "rachet":
                    if(doc.rows[i].doc.build.rachet==partID){
                        partWko += parseInt(doc.rows[i].doc.build.winsKO);
                        partLko += parseInt(doc.rows[i].doc.build.loseKO);
                        partWso += parseInt(doc.rows[i].doc.build.winsSO);
                        partLso += parseInt(doc.rows[i].doc.build.loseSO);
                        partWbst += parseInt(doc.rows[i].doc.build.winsBst);
                        partLbst += parseInt(doc.rows[i].doc.build.loseBst);
                        partWx += parseInt(doc.rows[i].doc.build.winsX);
                        partLx += parseInt(doc.rows[i].doc.build.loseX);
                        partDraw += parseInt(doc.rows[i].doc.build.draws);
                    }
                break;
                case "bit":
                    if(doc.rows[i].doc.build.bit==partID){
                        partWko += parseInt(doc.rows[i].doc.build.winsKO);
                        partLko += parseInt(doc.rows[i].doc.build.loseKO);
                        partWso += parseInt(doc.rows[i].doc.build.winsSO);
                        partLso += parseInt(doc.rows[i].doc.build.loseSO);
                        partWbst += parseInt(doc.rows[i].doc.build.winsBst);
                        partLbst += parseInt(doc.rows[i].doc.build.loseBst);
                        partWx += parseInt(doc.rows[i].doc.build.winsX);
                        partLx += parseInt(doc.rows[i].doc.build.loseX);
                        partDraw += parseInt(doc.rows[i].doc.build.draws);
                    }
                break;
            }
            
            
       }

       switch(partType){
            case "blade":
                partIs.textContent = allBlades[partID].name;
                partStats.textContent = "Weight: " + round(allBlades[partID].weight,2) + " grams";
                partKO.textContent = "Over Win/Loss: " + partWko + " / " + partLko;
                partSO.textContent = "Spin Win/Loss: " + partWso + " / " + partLso;
                partBst.textContent = "Burst Win/Loss: " + partWbst + " / " + partLbst;
                partX.textContent = "Xtreme Win/Loss: " + partWx + " / " + partLx;
                partDraw.textContent = "Draws: " + partDraw;
            break;
            case "rachet":
                partIs.textContent = allRachets[partID].name;
                partStats.textContent = "Weight: " + round(allRachets[partID].weight,2) + " grams";
                partKO.textContent = "Over Win/Loss: " + partWko + " / " + partLko;
                partSO.textContent = "Spin Win/Loss: " + partWso + " / " + partLso;
                partBst.textContent = "Burst Win/Loss: " + partWbst + " / " + partLbst;
                partX.textContent = "Xtreme Win/Loss: " + partWx + " / " + partLx;
                partDraw.textContent = "Draws: " + partDraw;
            break;
            case "bit":
                partIs.textContent = allBits[partID].name;
                partStats.textContent = "Weight: " + round(allBits[partID].weight,2) + " grams";
                partKO.textContent = "Over Win/Loss: " + partWko + " / " + partLko;
                partSO.textContent = "Spin Win/Loss: " + partWso + " / " + partLso;
                partBst.textContent = "Burst Win/Loss: " + partWbst + " / " + partLbst;
                partX.textContent = "Xtreme Win/Loss: " + partWx + " / " + partLx;
                partDraw.textContent = "Draws: " + partDraw;
            break;
       }

    });

}

// copy-to-clipboard text. Must be global for the onclick listener to access
var historyClipboardHolder = "";

function filterAndSortMatchupHistDocs(vsDocs, beyId, stadiumFilterId) {
    var docs = vsDocs;
    if (stadiumFilterId !== "all") {
        docs = docs.filter(function (doc) {
            return doc.stadiumId === stadiumFilterId;
        });
    }

    docs.sort(function (a, b) {
        if (stadiumFilterId === "all") {
            var stadiumOrderCompare = compareStadiumIds(a.stadiumId, b.stadiumId);
            if (stadiumOrderCompare !== 0) {
                return stadiumOrderCompare;
            }
        }
        var nameA = vsStatsFromPerspective(a, beyId).opponent.name.toLowerCase();
        var nameB = vsStatsFromPerspective(b, beyId).opponent.name.toLowerCase();
        return nameA.localeCompare(nameB);
    });

    return docs;
}

//populates the match history popup with selected Beys matchup history
function populateMatchHist(bey){

    console.log("called populateMatchHist(" + bey.name + ")");

    var stadiumFilterId = (matchupHistStadiumFilter && matchupHistStadiumFilter.value)
        ? matchupHistStadiumFilter.value
        : "all";
    var stadiumLabel = stadiumFilterId === "all"
        ? "(all stadiums)"
        : "(" + getStadiumName(stadiumFilterId) + ")";

    // All stadiums for this bey (filtered/sorted below)
    queryVsRecordsForBey(recordsDBX, bey.id).then(function (vsDocs) {
        vsDocs = filterAndSortMatchupHistDocs(vsDocs, bey.id, stadiumFilterId);

        matchupSpace.textContent = "";
        totalsSpace.textContent = "";
        matchupBey.textContent = "Matchup History for " + bey.name + " " + stadiumLabel;

        var castDoc = BeyBlade.fromBuild(bey);

        // prepare string version that can be copied to clipboard
        historyClipboardHolder = "Results for " + bey.name + ":";

        var winHolder = castDoc.getTotalWin();
        var winPointHolder = castDoc.getWinPoints();
        var lossHolder = castDoc.getTotalLoss();
        var lossPointHolder = castDoc.getLossPoints();
        //var totalHolder = winHolder + lossHolder + doc.build.draws;
        var totalHolder = castDoc.getTotalMatch();
        var avgPPW = round((winPointHolder/winHolder),2);
        var avgPPL = round((lossPointHolder/lossHolder),2);
        var totalPointChange = castDoc.getPointChange();
        var totalMatches = bey.winsKO + bey.loseKO + bey.winsSO + bey.loseSO + bey.winsBst + bey.loseBst + bey.winsX+ bey.loseX + bey.draws;
        var avgPointChangePerRound = totalPointChange / totalMatches;
        var avgWinPercent = round((winHolder/totalHolder)*100,2);

        //set value to 0 if it comes back NaN
        if (isNaN(avgPPW)){ avgPPW=0; }
        if (isNaN(avgWinPercent)){ avgWinPercent=0; }
        if (isNaN(avgPPL)){ avgPPL=0; }
        if (isNaN(avgPointChangePerRound)){ avgPointChangePerRound=0; }

        var rowT = totalsSpace.insertRow(0);
        var cellT1 = rowT.insertCell(0);
        var cellT2 = rowT.insertCell(1);
        var cellT3 = rowT.insertCell(2);
        var cellT4 = rowT.insertCell(3);
        // var cellT5 = row.insertCell(4);
        // var cellT6 = row.insertCell(5);
        cellT1.classList.add('text-center');
        cellT2.classList.add('text-center');
        cellT3.classList.add('text-center');
        cellT4.classList.add('text-center');
        // cellT5.classList.add('text-center');
        // cellT6.classList.add('text-center');
        cellT1.innerHTML = "Overall Win%";
        cellT2.innerHTML = "Average Points Earned Per Win";
        cellT3.innerHTML = "Average Points Lost Per Loss";
        cellT4.innerHTML = "Average Points Per Round";
        // cellT5.innerHTML = "Draws";
        // cellT6.innerHTML = "Points";
        var rowT2 = totalsSpace.insertRow(1);
        var cellT7 = rowT2.insertCell(0);
        var cellT8 = rowT2.insertCell(1);
        var cellT9 = rowT2.insertCell(2);
        var cellT10 = rowT2.insertCell(3);
        cellT7.classList.add('text-center');
        cellT8.classList.add('text-center');
        cellT9.classList.add('text-center');
        cellT10.classList.add('text-center');
        cellT7.innerHTML = avgWinPercent + "%";
        cellT8.innerHTML = avgPPW;
        cellT9.innerHTML = avgPPL;
        cellT10.innerHTML = round(avgPointChangePerRound,2);

        //header row
        var row = matchupSpace.insertRow(0);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        cell1.classList.add('text-center');
        cell2.classList.add('text-center');
        cell3.classList.add('text-center');
        cell4.classList.add('text-center');
        cell5.classList.add('text-center');
        cell6.classList.add('text-center');
        cell1.innerHTML = "Spin";
        cell2.innerHTML = "Burst";
        cell3.innerHTML = "Over";
        cell4.innerHTML = "Xtreme";
        cell5.innerHTML = "Draws";
        cell6.innerHTML = "Points";

        historyClipboardHolder = "Results for " + bey.name + " " + stadiumLabel + ":"
        
        for(i = 0; i < vsDocs.length; i++){
            var vsDoc = vsDocs[i];
            var scores = vsDoc.scores;
            var totalMatches = scores.wx + scores.wbst + scores.wko + scores.wso + scores.lx + scores.lbst + scores.lko + scores.lso + scores.draws;
            if(totalMatches>0){

                    console.log(historyClipboardHolder);
                    var fromBey = vsStatsFromPerspective(vsDoc, bey.id);
                    var matchupStadiumLabel = stadiumFilterId === "all"
                        ? " [" + getStadiumName(vsDoc.stadiumId) + "]"
                        : "";

                    //title row
                    var titleRow = matchupSpace.insertRow(1);
                    var titleCell = titleRow.insertCell(0);
                    titleCell.colSpan=6;
                    titleCell.classList.add('text-center');
                    titleCell.innerHTML = fromBey.opponent.name + matchupStadiumLabel;
                    titleCell.style = 'padding-top: 6px; border-top: 3px solid;';
                    //score
                    var row = matchupSpace.insertRow(2);
                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);
                    var cell3 = row.insertCell(2);
                    var cell4 = row.insertCell(3);
                    var cell5 = row.insertCell(4);
                    var cell6 = row.insertCell(5);
                    cell1.classList.add('text-center');
                    cell2.classList.add('text-center');
                    cell3.classList.add('text-center');
                    cell4.classList.add('text-center');
                    cell5.classList.add('text-center');
                    cell6.classList.add('text-center');
                    cell1.innerHTML = fromBey.wso + "/" + fromBey.lso;
                    cell2.innerHTML = fromBey.wbst + "/" + fromBey.lbst;
                    cell3.innerHTML = fromBey.wko + "/" + fromBey.lko;
                    cell4.innerHTML = fromBey.wx + "/" + fromBey.lx;
                    cell5.innerHTML = fromBey.draws;
                    cell6.innerHTML = (fromBey.wx*3 + fromBey.wbst*2 + fromBey.wko*2 + fromBey.wso) + "/" + (fromBey.lx*3 + fromBey.lbst*2 + fromBey.lko*2 + fromBey.lso);

                    historyClipboardHolder +=  "\n" + "vs " + fromBey.opponent.name + matchupStadiumLabel + ": " + totalMatches + " rounds, " + 
                                        (round( ((fromBey.wso + fromBey.wbst + fromBey.wko + fromBey.wx)/totalMatches)*100 ,2)) + "% of rounds won, " + 
                                        (fromBey.wx*3 + fromBey.wbst*2 + fromBey.wko*2 + fromBey.wso) + " points earned " + 
                                        (fromBey.lx*3 + fromBey.lbst*2 + fromBey.lko*2 + fromBey.lso) + " points lost";

                    console.log(historyClipboardHolder);

            }
       }

       historyClipboardHolder += "\nCopied from https://fabelavalon.github.io/BeyBuilderX/";

       if(!wasCopyFullHistToClipGenerated){
            matchupHistCopyButton.addEventListener("click", function(){
                console.log("matchup hist copy button pressed");
                console.log(historyClipboardHolder);
                navigator.clipboard.writeText(historyClipboardHolder);
                wasCopyFullHistToClipGenerated = true;
            });
       };
       
    }).catch(function (err) {
        console.error("populateMatchHist failed:", err);
    });
}

function populateMatchHistUser2(bitChip1, over1, blade1, assist1, rachet1, bit1, bitChip2, over2, blade2, assist2, rachet2, bit2){

    console.log("populateMatchHistUser2(" + bitChip1 + ", " + over1 + ", " + blade1 + ", " + assist1 + ", " + rachet1 + ", " + bit1 + ", " + bitChip2 + ", " + over1 + ", " + blade2 + ", " + assist2 + ", " + rachet2 + ", " + bit2 +")");

    // overall stats
    primeMatchupHistStatsTable(); // wipe overall stats

    primeMatchupHistTable(); //table html
    // if all parts are "none", return
    if(blade1=="none" && rachet1=="none" && bit1=="none" && blade2=="none" && rachet2=="none" && bit2=="none" && bitChip1=="none" && assist1=="none" && bitChip2=="none" && assist2=="none" && over1=="none" && over2=="none"){
        return;
    }

    // get all docs
    recordsDBX.allDocs({include_docs: true, descending: true}, function(err, allMatches) {
        // partsFilter1/partsFilter2 can match either bey slot; orientVsRecordForPartsQuery flips as needed
        var matches = allMatches.rows
            .filter(function (row) {
                return row.doc && row.doc.type === "vsRecord" && row.doc.bey1 && row.doc.bey2;
            })
            .map(function (row) {
                var oriented = orientVsRecordForPartsQuery(
                    row.doc,
                    bitChip1, over1, blade1, assist1, rachet1, bit1,
                    bitChip2, over2, blade2, assist2, rachet2, bit2
                );
                return oriented ? { doc: oriented } : null;
            })
            .filter(function (row) { return row !== null; });

        // for each matchup, write in table
        matches.forEach(match => {
            var s = match.doc.scores;
            winHolder = s.wko + s.wso + s.wbst + s.wx;
            lossHolder = s.lko + s.lso + s.lbst + s.lx;
            draws = s.draws;
            totalMatches = winHolder + lossHolder + draws;
            if(totalMatches>0) {
                fillMatchupHist(match.doc);
            }
        });

        
        // calculate stats
        // TODO: move points calc to another function
        var winHolder = 0;
        var winPointHolder = 0;
        var lossHolder = 0;
        var lossPointHolder = 0;
        var totalMatches = 0;
        var draws = 0;
        matches.forEach(match => {
            var s = match.doc.scores;
            winHolder += s.wko + s.wso + s.wbst + s.wx;
            winPointHolder += (s.wko*2) + s.wso + (s.wbst*2) + (s.wx*3);
            lossHolder += s.lko + s.lso + s.lbst + s.lx;
            lossPointHolder += (s.lko*2) + s.lso + (s.lbst*2) + (s.lx*3);
            draws += s.draws;
        });
        // calculate averages
        totalMatches = winHolder + lossHolder + draws;
        var totalPointChange = winPointHolder - lossPointHolder;
        var avgPPW = round((winPointHolder/winHolder),2);
        var avgPPL = round((lossPointHolder/lossHolder),2);
        var avgPointChangePerRound = round( (totalPointChange / totalMatches), 2);
        var avgWinPercent = round((winHolder/totalMatches)*100,2);
        // fix NaN
        if (isNaN(avgPPW)){ avgPPW=0; }
        if (isNaN(avgWinPercent)){ avgWinPercent=0; }
        if (isNaN(avgPPL)){ avgPPL=0; }
        if (isNaN(avgPointChangePerRound)){ avgPointChangePerRound=0; }
        // set stats table
        matchupStatsOverall.textContent = avgWinPercent;
        matchupStatsPerWin.textContent = avgPPW;
        matchupStatsPerLoss.textContent = avgPPL;
        matchupStatsAvgPoints.textContent = avgPointChangePerRound;

        // add parts to stats title
        var statBeyName = ""
        statBeyName += (bitChip1!="none" ? allBitChips[bitChip1].name : ""); // no space on Bit Chip, it combines with blade name
        statBeyName += (over1!="none" ? allOverBlades[over1].name : "");
        statBeyName += (blade1!="none" ? allBlades[blade1].name + " " : "");
        statBeyName += (assist1!="none" ? allAssists[assist1].name + " " : "");
        statBeyName += (rachet1!="none" ? allRachets[rachet1].name + " " : "");
        statBeyName += (bit1!="none" ? allBits[bit1].name + " " : "");
        // if bey2 parts are selected, title will be "X vs Y"
        var defenderBeyName = "";
        defenderBeyName += (bitChip2!="none" ? allBitChips[bitChip2].name : "");
        statBeyName += (over2!="none" ? allOverBlades[over2].name : "");
        defenderBeyName += (blade2!="none" ? allBlades[blade2].name + " " : "");
        defenderBeyName += (assist2!="none" ? allAssists[assist2].name + " " : "");
        console.log(rachet2);
        defenderBeyName += (rachet2!="none" ? allRachets[rachet2].name + " " : "");
        defenderBeyName += (bit2!="none" ? allBits[bit2].name + " " : "");
        if(defenderBeyName.trim() != "") {
            statBeyName += " vs " + defenderBeyName;
        }
        matchupStatsBeyTitle.textContent = statBeyName + " (all stadiums)";

    });

}

function primeMatchupHistStatsTable(){

    console.log("called primeMatchupHistStatsTable()");

    matchupStatsBeyTitle.textContent = "";
    
    // stats table
    matchupHistStatsTable.style.display = "revert"; // revert to default for element type
    matchupStatsOverall.textContent = "";
    matchupStatsPerWin.textContent = "";  
    matchupStatsPerLoss.textContent = "";
    matchupStatsAvgPoints.textContent = "";
}

/**
 * wipes and recreates table for matchup history
 */
function primeMatchupHistTable(){

    console.log("called primeMatchupHistTable()");

    // hide "parts not selected" text
    matchupBeyUser.style.visibility = "hidden";
    // wipe table
    matchupHistUser.textContent = "";

    // header row
    var row = matchupHistUser.insertRow(0);
    row.innerHTML = document.getElementById("matchupHistUserHeader").innerHTML;
    //matchupHistUserHeader
}

// add one line to parts history table
function fillMatchupHist(history){

    console.log("called fillMatchupHistory()");
    var scores = history.scores;
    
    var row = matchupHistUser.insertRow(1);
    var cellVS = row.insertCell(); 
    cellVS.classList.add("d-table-cell", "d-lg-none"); // visible on xs, sm, md
    var cell1 = row.insertCell(); 
    cell1.classList.add("d-none", "d-lg-table-cell");
    var cell3 = row.insertCell();
    cell3.classList.add("d-none", "d-lg-table-cell"); // visible lg and above
    var cell4 = row.insertCell();
    var cell5 = row.insertCell();
    var cell6 = row.insertCell();
    var cell7 = row.insertCell();
    var cell8 = row.insertCell();
    var stadiumNameHtml = "<br><small>" + getStadiumName(history.stadiumId) + "</small>";
    cellVS.innerHTML = history.bey1.name+"<br>vs<br>"+history.bey2.name + stadiumNameHtml;
    cell1.innerHTML = history.bey1.name;
    cell3.innerHTML = history.bey2.name;
    cell4.innerHTML = scores.wko + "/" + scores.lko;
    cell5.innerHTML = scores.wso + "/" + scores.lso;
    cell6.innerHTML = scores.wbst + "/" + scores.lbst;
    cell7.innerHTML = scores.wx + "/" + scores.lx;
    cell8.innerHTML = scores.draws;
}

//delete a bey from the system
function deleteBey(){
    console.log("called deleteBey(), selectedBey: \n" + selectedBey + "\n" + selectedBey.value);
    
    // clear db screen
    clearDbStats();
    if (bey1 && bey2 && ( selectedBey.value == bey1.id || selectedBey.value == bey2.id ) ) {
        // clear vs buttons
        clearVsButtons();
    }

    // remove beyblade from DB
    beyBladeDBX.get(selectedBey.value, function(err, doc) {
        if(!err){
            beyBladeDBX.remove(doc, function(err, doc){
                if(!err){
                    for (var i=0; i<dbSelectList.length; i++) {
                        if (dbSelectList.options[i].value == selectedBey.value){
                            dbSelectList.remove(i);
                        }
                    }
                    showBeyblades();
                }
                else{
                    console.log(err);
                }
            });
        }
    });


    // remove vs records
    recordsDBX.allDocs({include_docs: true, descending: true}, function(err, allRecords) {
        if(err) {
            console.log(err);
            console.log("returning");
            return;
        }

        for(i = 0; i < allRecords.total_rows; i++){
            var vsDoc = allRecords.rows[i].doc;
            if (!vsDoc || vsDoc.type !== "vsRecord") {
                continue;
            }

            // find records where bey1 == selectedBey, delete them
            if( vsDoc.bey1Id == selectedBey.value ){
                recordsDBX.remove(vsDoc, function(err, errDoc){
                    if(err){
                        console.log(err);
                    }
                });
            }

            // find vs records where bey2 == selectedBey
            if( vsDoc.bey2Id == selectedBey.value ){
                var thisRecord = structuredClone(vsDoc);
                var thisScores = thisRecord.scores;
                beyBladeDBX.get(vsDoc.bey1Id, function(err, beyblade) {
                    if(!err){
                        beyblade.build.winsKO  -= thisScores.wko;
                        beyblade.build.loseKO  -= thisScores.lko;
                        beyblade.build.winsSO  -= thisScores.wso;
                        beyblade.build.loseSO  -= thisScores.lso;
                        beyblade.build.winsBst -= thisScores.wbst;
                        beyblade.build.loseBst -= thisScores.lbst;
                        beyblade.build.winsX   -= thisScores.wx;
                        beyblade.build.loseX   -= thisScores.lx;
                        beyblade.build.draws   -= thisScores.draws;

                        console.log("after edit " + JSON.stringify(beyblade));
                        beyBladeDBX.put(beyblade).then(refreshUI);
                    }
                    else{
                        console.log(err);
                    }
                });

                recordsDBX.remove(vsDoc, function(err, errDoc){
                    if(err){
                        console.log(err);
                    }
                });

            }
        }
    });

}

//clears all beyblades in the database
function deleteAllBeys() {

    console.log("called deleteAllBeys()");
    
    // clear bey1 and bey2 in VS UI
    clearVsButtons();

    //clear the list
    while (dbSelectList.options.length > 0) {                
        dbSelectList.remove(0);
    }
    
    //clear individual beyblades
    beyBladeDBX.allDocs({include_docs: true, descending: true}, function(err, doc) {
        for(i = 0; i < doc.total_rows; i++){
            if(!err){
                console.log("clearing beys");
                beyBladeDBX.remove(doc.rows[i].doc, function(err, doc){
                    if(err){
                        console.log(err);
                    }
                });
            }
            else{
                //console.log(err);
            }
       }
    });

    //clear records
    recordsDBX.allDocs({include_docs: true, descending: true}, function(err, doc) {
        for(i = 0; i < doc.total_rows; i++){
            if(!err){
                console.log("clearing records");
                recordsDBX.remove(doc.rows[i].doc, function(err, doc){
                    if(err){
                        console.log(err);
                    }
                });
            }
            else{
                //console.log(err);
            }
       }
    });

}

//turns out JavaScript doesn't have a random number function that just gives an int
function getRandomInt(max) {
    console.log("called getRandomInt(" + max + ")");

    return Math.floor(Math.random() * max);
};

//JS math functions suck
function round(num, places) {
    //console.log("called round(" + num + ", " + places + ")");

    var multiplier = Math.pow(10, places);
    return Math.round(num * multiplier) / multiplier;
}


/**
 * enable or disable dropdowns. CX enables bitChip and assistBlade selection. ratchetBit disables bit selection.
 * @param {string} partType - what type of part is being selected, 'bit' or 'blade'
 * @param {int} selection - part ID
 * @param {int} whichBey - which area of HTML
 */
function disableDropdowns(partType, selection, whichBey){
    console.log("called disableDropdowns( " + partType + ", " + selection + ", " + whichBey + " )");

    // HTML IDs for part selectors
    dropdownIDs = {
        // main VS screen
        1: { "bitChip":"bey1BitChip", "overBlade":"bey1OverBlade", "blade":"bey1Blade", "assistBlade":"bey1AssistBlade", "ratchet":"bey1Rachet", "bit":"bey1Bit" },
        2: { "bitChip":"bey2BitChip", "overBlade":"bey2OverBlade", "blade":"bey2Blade", "assistBlade":"bey2AssistBlade", "ratchet":"bey2Rachet", "bit":"bey2Bit" },
        // part record modal
        3: { "bitChip":"bitChipR1", "overBlade":"overBladeR1", "blade":"bladeR1", "assistBlade":"assistR1", "ratchet":"rachetR1", "bit":"bitR1" },
        4: { "bitChip":"bitChipR2", "overBlade":"overBladeR2", "blade":"bladeR2", "assistBlade":"assistR2", "ratchet":"rachetR2", "bit":"bitR2" }
    };

    disableParts = [];
    enableParts = [];

    // decide what parts to enable/disable
    if(partType=="blade") {
        console.log("checking blades");
        if(allBlades[selection].system == "CX"){
            //console.log("CX blade selected");
            enableParts = ["bitChip", "assistBlade", "ratchet"];
            disableParts = ["overBlade"];
        }
        else if(allBlades[selection].system == "CX2"){
            //console.log("CX2 blade selected");
            enableParts = ["bitChip", "assistBlade", "overBlade", "ratchet"];
        }
        else if(allBlades[selection].system == "UX2"){
            //console.log("UX2 blade selected");
            disableParts = ["bitChip", "assistBlade", "overBlade", "ratchet"]; 
        }
        // else if(allBlades[selection] == 111){ //BulletGriffon check
        //     disableParts = ["bitChip", "overBlade", "assistBlade", "ratchet"];
        // }
        else {
            disableParts = ["bitChip", "assistBlade", "overBlade"];
            enableParts = ["ratchet"];
        }
    }
    if(partType=="bit") {
        console.log("checking bits");        
        if(allBits[selection].type == "ratchetBit"){
            //console.log("ratchet-bit selected");
            disableParts = ["ratchet"];
        } else {
            enableParts = ["ratchet"];
        }
    }

    // enable disable HTML
    for (const partToDisable of disableParts) {
        document.getElementById( dropdownIDs[whichBey][partToDisable] ).disabled = true;
    }
    for (const partToEnable of enableParts) {
        document.getElementById( dropdownIDs[whichBey][partToEnable] ).disabled = false;
    }

}

// quick spin animation
function spinMe(me){

    console.log("called spinMe()");

    me.classList.add('spinme');
    me.addEventListener('animationend', function () {
        me.classList.remove('spinme');
    }, { once: true });
}

function themeSwitchListener(){

    console.log("called themeSwitchListener()");

    themeSelect.addEventListener('change', function() {
        saveTheme(themeSelect.value);
    });
}

function saveTheme(themeName) {
    console.log('Current DB theme:');
    console.log(JSON.stringify(selectedTheme));
    // init selectedTheme object for DB insertion
    if(selectedTheme==null) {
        selectedTheme = {
            _id: "selectedTheme",
            name: "default"
        };
    }
    if (themeName!=null && themeName.trim().length > 0) {
        selectedTheme.name= themeSelect.value;
    }
    // save selected theme
    settings.put(selectedTheme, function callback(err, result) {
        if (!err) {
            console.log('Saved theme selection');
            // load theme. This will set the CSS and update selectedTheme._rev
            loadTheme();
        }
        else{
            console.log(err);
        }
    });
}

function loadTheme(){

    //console.log("called loadTheme()");

    settings.get("selectedTheme", function callback(err, result) {
        if (!err) {
            selectedTheme=result;
            console.log('Loaded saved theme');
            console.log(JSON.stringify(result));
            themeLink.href="./theme-"+selectedTheme.name.toLowerCase()+".css";
            themeSelect.value=selectedTheme.name;
        }
        else{
            console.log(err);
            if(err.status=404) {
                console.log("No existing theme. Using default");
                // calling saveTheme with no params will select the default theme and properly init the DB theme object
                saveTheme();
            }
        }
    });
}

function populateStadiumSelector() {
    if (!stadiumSelector) {
        return;
    }
    stadiumSelector.innerHTML = "";
    for (var i = 0; i < stadiums.length; i++) {
        var opt = document.createElement("option");
        opt.value = stadiums[i].id;
        opt.textContent = stadiums[i].name;
        stadiumSelector.appendChild(opt);
    }
    stadiumSelector.value = getSelectedStadiumId();
}

function populateMatchupHistStadiumFilter() {
    if (!matchupHistStadiumFilter) {
        return;
    }
    var selected = matchupHistStadiumFilter.value || "all";
    matchupHistStadiumFilter.innerHTML = "";
    var allOpt = document.createElement("option");
    allOpt.value = "all";
    allOpt.textContent = "All stadiums";
    matchupHistStadiumFilter.appendChild(allOpt);
    for (var i = 0; i < stadiums.length; i++) {
        var opt = document.createElement("option");
        opt.value = stadiums[i].id;
        opt.textContent = stadiums[i].name;
        matchupHistStadiumFilter.appendChild(opt);
    }
    matchupHistStadiumFilter.value = selected;
}

function matchupHistStadiumFilterListener() {
    if (!matchupHistStadiumFilter) {
        return;
    }
    matchupHistStadiumFilter.addEventListener("change", function () {
        if (dbBey) {
            populateMatchHist(dbBey);
        }
    });
}

function stadiumSelectorListener() {
    if (!stadiumSelector) {
        return;
    }
    stadiumSelector.addEventListener("change", function () {
        saveStadium(stadiumSelector.value);
        if (bey1 && bey2) {
            displayRecords();
        }
    });
}

function saveStadium(stadiumId) {
    if (selectedStadium == null) {
        selectedStadium = {
            _id: "selectedStadium",
            stadiumId: DEFAULT_STADIUM_ID
        };
    }
    selectedStadium.stadiumId = stadiumId;
    settings.put(selectedStadium, function callback(err, result) {
        if (!err) {
            selectedStadium._rev = result.rev;
            console.log("Saved stadium selection: " + stadiumId);
        } else {
            console.log(err);
        }
    });
}

function loadStadium() {
    settings.get("selectedStadium", function callback(err, result) {
        if (!err) {
            selectedStadium = result;
            if (stadiumSelector) {
                stadiumSelector.value = selectedStadium.stadiumId || DEFAULT_STADIUM_ID;
            }
            console.log("Loaded stadium: " + selectedStadium.stadiumId);
        } else {
            if (err.status == 404 || err.name === "not_found") {
                saveStadium(DEFAULT_STADIUM_ID);
                if (stadiumSelector) {
                    stadiumSelector.value = DEFAULT_STADIUM_ID;
                }
            } else {
                console.log(err);
            }
        }
    });
}

// setting for showing/hiding Overlay button
function overlaySettingListener(){

    console.log("called overlaySettingListener()");

    enableOverlayBtnsCheckbox.addEventListener('change', function() {
        saveOverlaySetting(enableOverlayBtnsCheckbox.checked);
    });
}

function saveOverlaySetting(shouldShowOverlayBtnBoolean) {
    console.log('Selected overlay status: ' + shouldShowOverlayBtnBoolean);

    // init shouldShowOverlayBtn object for DB insertion
    if(overlaySetting==null) {
        console.log("creating overlay setting json var");
        overlaySetting = {
            _id: "shouldShowOverlayBtn",
            value: shouldShowOverlayBtnBoolean
        };
    } else {
        overlaySetting.value = shouldShowOverlayBtnBoolean;
    }
    // save
    settings.put(overlaySetting, function callback(err, result) {
        console.log("saving, result: "+JSON.stringify(result));
        if (!err) {
            console.log('Saved theme selection');
            // load theme. This will set the CSS and update overlaySetting._rev
            loadOverlaySetting();
        }
        else{
            console.log(err);
        }
    });
}

function loadOverlaySetting(){
    console.log("called loadOverlaySetting()");

    settings.get("shouldShowOverlayBtn", function callback(err, result) {
        if (!err) {
            overlaySetting=result;
            console.log('Loaded overlay setting');
            console.log("overlay setting load result: " + JSON.stringify(result));
            enableOverlayBtnsCheckbox.checked=overlaySetting.value; // checkbox in settings 
            displayRecords();
        }
        else{
            console.log(err);
            if(err.status=404) {
                console.log("No existing overlay setting. Using default");
                // calling saveTheme with no params will select the default theme and properly init the DB theme object
                //saveTheme();
            }
        }
    });
}

async function exportDb() {
    const exportData = await dumpDatabases({
        beyBladeDBX: beyBladeDBX,
        recordsDBX: recordsDBX,
        settings: settings
    });
    console.log(exportData.beyBladeDBX);

    // Create a localized date string for the filename
    let now = new Date();
    let dateString = now
        .toLocaleString('sv-SE', { // 'sv-SE' gives YYYY-MM-DD HH:mm:ss
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        })
        .replace(/[:.]/g, '-')  //swap chars for dash, for filename safety
        //.replace(/[^\d]/g, '-') // replace non-digits with dash for filename safety
        .replace(" ", "_") // underscore between date and time
        .slice(0, 16); // trim to YYYY-MM-DD_HH-MM


    exportFilename = `beybuilderX-database-${dateString}.json`;

// ...existing code...
    const dataStr = JSON.stringify(exportData, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const tmpElement = document.createElement("a");
    tmpElement.href = url;
    tmpElement.download = exportFilename;;
    document.body.appendChild(tmpElement);
    tmpElement.click();
    document.body.removeChild(tmpElement);
    URL.revokeObjectURL(url);
}

/* score-board popup window for OBS overlay
*/
//function createBrowserPopup() {
const createBrowserPopup = async () => {
    // if window exists, don't create another / write again
    if ( scoreOverlayWindow && !scoreOverlayWindow.closed ) {
        console.log("popup already open");
        return;
    }
    // HTML is stored on main page
    const html = document.getElementById("score-overlay-template").innerHTML;
    // opening a blank popup gives us DOM control, avoiding same-origin issues when loading HTML with file://
    scoreOverlayWindow = window.open("", 
        "msgWindow", 
        "width=1000,height=700,top=200,left=200"  // forces a new window, set size, move away from corner
    );
    scoreOverlayWindow.document.write(html);
    // wait a few milliseconds for the page to open, needs at least 50ms
    const delay = ms => new Promise(res => setTimeout(res, ms));
    await delay(100);
    // load bey names and records onto popup
    displayRecords();
}
function swapOverlayBeys() {
    // these are in a flexbox, with default style "order: 1", so simply set style "order: 2"
    const pResult1 = scoreOverlayWindow.document.getElementById("overlay-result-first");
    pResult1.classList.toggle("order-two");
    // show the circular arrow when display is swapped
    overlaySwapBeysBtn.children[0].classList.toggle("d-none");
}

/* settings, import, export  */

async function importDbSetup(){
    fileInput.addEventListener('change', () => {
        // hide bootstrap model id="settings"
        settingsModal.hide();
        // show bootstrap modal id="areYouSureImport"
        importModal.show();        
    }
    );
}

async function openSettings(){
    fileInput.value = ""; // clear import file input
    settingsModal.show();
}

async function updateMigrationBackupSettings() {
    var section = document.getElementById("migrationBackupSection");
    var createdAtEl = document.getElementById("migrationBackupCreatedAt");
    var info = document.getElementById("migrationBackupInfo");
    if (!section || !createdAtEl || !info) {
        return;
    }

    var backupInfo = await getMigrationBackupInfo();
    section.classList.toggle("d-none", !backupInfo);
    if (!backupInfo) {
        return;
    }

    createdAtEl.textContent = backupInfo.createdAtLabel;
    var reasonLabel = backupInfo.reason === "import" ? "before import" : "before migration";
    var revPart = backupInfo.toRevision ? " (upgrade to " + backupInfo.toRevision + ")" : "";
    info.textContent = reasonLabel + revPart + ".";
}

async function restoreMigrationBackupFromSettings() {
    var backupInfo = await getMigrationBackupInfo();
    var createdAtLabel = backupInfo ? backupInfo.createdAtLabel : "unknown time";
    restoreBackupConfirmMsg.textContent = "Restore the automatic backup from " + createdAtLabel + "? This will replace your current database.";
    settingsModal.hide();
    restoreBackupModal.show();
}

async function confirmRestoreMigrationBackup() {
    try {
        var dbs = await restoreMigrationBackup();
        assignDatabaseGlobals(dbs);
        showBeyblades();
        clearDbStats();
        clearVsButtons();
        await updateMigrationBackupSettings();
        settingsModal.hide();
        spinMe(dbSelectList);
    } catch (error) {
        console.error("Restore backup failed:", error);
        showErrorModal("Could not restore backup.<p></p>" + (error && error.message ? error.message : error));
    }
}

async function migrationCreateBackup(context, meta) {
    if (!await databasesHaveUserData({
        beyBladeDBX: context.beyBladeDBX,
        recordsDBX: context.recordsDBX,
        settings: context.settings
    })) {
        console.log("Migration backup skipped: no user data");
        return false;
    }

    await saveMigrationBackup({
        beyBladeDBX: context.beyBladeDBX,
        recordsDBX: context.recordsDBX,
        settings: context.settings
    }, meta);
    migrationBackupWasCreated = true;
    return true;
}

async function migrationRestoreBackup(context) {
    var dbs = await restoreMigrationBackup();
    assignDatabaseGlobals(dbs);
    context.beyBladeDBX = dbs.beyBladeDBX;
    context.recordsDBX = dbs.recordsDBX;
    context.settings = dbs.settings;
}


async function importDatabase() {
    const file = fileInput.files[0];
    if (!file) {
        console.error("No file selected");
        return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
        var importBackupCreated = false;
        try {
            const data = JSON.parse(event.target.result);
            // Validate structure
            if (!data.beyBladeDBX || !data.recordsDBX || !data.settings) {
                throw new Error("Invalid database file");
            }
            // check for any data
            if(data.beyBladeDBX.length == 0 && data.recordsDBX.length == 0 && data.settings.length == 0){
                throw new Error("No data found in the import file");
            }

            if (await databasesHaveUserData({ beyBladeDBX, recordsDBX, settings })) {
                var versionDoc = await getDbVersionDoc(settings);
                await saveMigrationBackup({
                    beyBladeDBX: beyBladeDBX,
                    recordsDBX: recordsDBX,
                    settings: settings
                }, {
                    from: versionDoc.revision,
                    to: null,
                    reason: "import"
                });
                importBackupCreated = true;
            }

            // Clear existing databases
            await beyBladeDBX.destroy();
            await recordsDBX.destroy();
            await settings.destroy();
            // Recreate databases
            beyBladeDBX = new PouchDB("BeyBladesX");
            recordsDBX = new PouchDB("RecordX");
            settings = new PouchDB("settings");
            // bulk import
            await beyBladeDBX.bulkDocs(data.beyBladeDBX);
            await recordsDBX.bulkDocs(data.recordsDBX);
            await settings.bulkDocs(data.settings);
            console.log("Database imported successfully");

            // Upgrade imported dump to current schema
            await runMigrations({
                settings: settings,
                recordsDBX: recordsDBX,
                beyBladeDBX: beyBladeDBX,
                createBackup: migrationCreateBackup,
                restoreBackup: migrationRestoreBackup
            });

            // refresh UI
            showBeyblades();
            // clear selected db bey
            clearDbStats();
            // clear bey1 and bey2
            clearVsButtons();
            importModal.hide();
            fileInput.value = ""; // clear import file input
            // alert user
            spinMe(dbSelectList);

        } catch (error) {
            console.error("Error importing database:", error);
            if (importBackupCreated) {
                try {
                    var restored = await restoreMigrationBackup();
                    assignDatabaseGlobals(restored);
                } catch (restoreError) {
                    console.error("Import restore failed:", restoreError);
                    showErrorModal(
                        buildMigrationFailureMessage(restoreError, false)
                    );
                    importModal.hide();
                    fileInput.value = "";
                    showBeyblades();
                    clearDbStats();
                    clearVsButtons();
                    return;
                }
            }
            importModal.hide();
            var importErrorMsg = importBackupCreated
                ? buildMigrationFailureMessage(error, true)
                : ("Error importing database. Please ensure the file is a valid BeyBuilderX export.<p></p>" + error.message);
            showErrorModal(importErrorMsg);
            // clear file input id="importDbFile"
            fileInput.value = "";
            showBeyblades();
            // clear selected db bey
            clearDbStats();
            // clear bey1 and bey2
            clearVsButtons();
        }
    };
    
    // start
    reader.readAsText(file);
}

async function showErrorModal(errMsg){
    errorModalMsg.innerHTML = errMsg;
    errorModal.show();
}

function buildMigrationFailureMessage(err, dataRestored) {
    var msg = "Update failed. Export NOW and send a bug report.";
    if (dataRestored) {
        msg += "<p></p>Your data was put back from the automatic backup.";
    }
    msg += "<p></p>" + (err && err.message ? err.message : err);
    return msg;
}


/**
 * Apply pending DB migrations, then start the UI.
 * Also re-run after import so restored dumps get upgraded.
 */
async function startApp() {
    migrationBackupWasCreated = false;
    try {
        await runMigrations({
            settings: settings,
            recordsDBX: recordsDBX,
            beyBladeDBX: beyBladeDBX,
            createBackup: migrationCreateBackup,
            restoreBackup: migrationRestoreBackup
        });
    } catch (err) {
        console.error("DB migration failed:", err);
        showErrorModal(buildMigrationFailureMessage(err, migrationBackupWasCreated));
    }
    main();
}

startApp();
