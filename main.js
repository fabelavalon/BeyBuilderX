/*==========================================================*
 * BeyBuilder v1.3 for Beyblade X                           *
 * Author: Fabel                                            *
 * Copyright 2023-2025                                      *
 *==========================================================*/

//create beyblade database
var beyBladeDBX = new PouchDB("BeyBladesX");
var recordsDBX = new PouchDB("RecordX");
var settings = new PouchDB("settings");

//import the parts lists
var allBitChips = bitChips;
var allBlades = blades;
var allAssists = assistBlades;
var allRachets = rachets;
var allBits = bits;

//create the elements for the buttons that will get generated via this script
var copyStatsbtn = document.createElement("button"); //NEW
var bey1Statbtn = document.createElement("button");
var bey2Statbtn = document.createElement("button");
var showAllBeysbtn = document.createElement("button");
var removeBeybtn = document.createElement("button");
var editBeybtn = document.createElement("button");
var showMatchupbtn = document.createElement("button");

//import the elements for the dropdowns...
//...for bey1
var bey1BitChipDropdown = document.getElementById("bey1BitChip"); 
var bey1BladeDropdown = document.getElementById("bey1Blade");
var bey1AssistBladeDropdown = document.getElementById("bey1AssistBlade"); 
var bey1RachetDropdown = document.getElementById("bey1Rachet");
var bey1BitDropdown = document.getElementById("bey1Bit");

//...for bey2
var bey2BitChipDropdown = document.getElementById("bey2BitChip"); 
var bey2BladeDropdown = document.getElementById("bey2Blade");
var bey2RachetDropdown = document.getElementById("bey2Rachet");
var bey2AssistBladeDropdown = document.getElementById("bey2AssistBlade"); 
var bey2BitDropdown = document.getElementById("bey2Bit");

//...for the parts records
var bitChipDropdown1 = document.getElementById("bitChipR1"); 
var bladeDropdown1 = document.getElementById("bladeR1");
var assistBladeDropdown1 = document.getElementById("assistR1"); 
var rachetDropdown1 = document.getElementById("rachetR1");
var bitDropdown1 = document.getElementById("bitR1");
var bitChipDropdown2 = document.getElementById("bitChipR2"); 
var bladeDropdown2 = document.getElementById("bladeR2");
var assistBladeDropdown2 = document.getElementById("assistR2"); 
var rachetDropdown2 = document.getElementById("rachetR2");
var bitDropdown2 = document.getElementById("bitR2");

// ... for the titles above win/lose buttons
var bey1WinTitle = document.getElementById("bey1-button-title");
var bey2WinTitle = document.getElementById("bey2-button-title");

//...for the dbList
var selectedBey = document.getElementById("dbSelectList");

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
//unfinished maave block
var bey1title = document.getElementById("bey1title");
var bey1draws = document.getElementById("bey1weight");
var bey1weight = document.getElementById("bey1draws");
var bey1spin = document.getElementById("bey1spin");
var bey1over = document.getElementById("bey1over");
var bey1burst = document.getElementById("bey1burst");
var bey1xtreme = document.getElementById("bey1xtreme");

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

//theme switcher
var themeSelect = document.getElementById("themeSelect");
var theme = document.getElementById("theme");

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


//used to generate the win buttons after both beys are selected
var wasBey1Generated = false;
var wasBey2Generated = false;

//used so we dont generate more buttons
var wasSetBey1Generated = false;
var wasSetBey2Generated = false;
var wasWinButtonGenerated = false;
var wasCopyHistToClipGenerated = false;
var wasCopyMatchupToClipGenerated = false;
var wasCopyFullHistToClipGenerated = false;

//global beyblade variables
var bey1;
var bey2;
var dbBey;

//used for undo function
var lastRecordWinner;
var lastRecordLoser;
var lastRecordOutcome;

//runs on launch, fills dropdowns and database list
function main(){

    console.log("Welcome to BeyBuilder X Version 1.3");
    console.log("called main()");

    bey1BitChipDropdown.value="random";
    bey2BitChipDropdown.value="random";
    bitChipDropdown1.value="none";

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
    
    loadTheme();
    themeSwitchListener();
};

//generate a beyblade based on the selections for the first set of drop downs
function generateBey1(){

    console.log("called generateBey1");

    //uses the id's of all parts for easy call
    var bitChip = -1;
    var blade = -1;
    var assist = -1;
    var rachet = -1;
    var bit = -1;

    //boolean values to check if the beyblade is random or not
    var bitChipChosen = false;
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

    //console.log(JSON.stringify(blade));
    bey1 = new BeyBlade(bitChip, blade, assist, rachet, bit);

    wasBey1Generated = true;
    addBeyblade(bey1);
    error.textContent = "";
    bey1Is.textContent = "" + bey1.name;
    showBeybladeStats(bey1, 1);
    createWinButtons();

}

//generate a beyblade based on the selections for the second set of drop downs
function generateBey2(){

    console.log("called generateBey2()");

    //uses the id's of all parts for easy call
    var bitChip = -1;
    var blade = -1;
    var assist = -1;
    var rachet = -1;
    var bit = -1;

    //boolean values to check if the beyblade is random or not
    var bitChipChosen = false;
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

    bey2 = new BeyBlade(bitChip, blade, assist, rachet, bit);

    wasBey2Generated = true;
    addBeyblade(bey2);
    error.textContent = "";
    bey2Is.textContent = "" + bey2.name;
    showBeybladeStats(bey2, 2);
    createWinButtons();
    
}

//populates win buttons on screen
function createWinButtons(){

    console.log("called createWinButtons()");

    var vsContainer = document.getElementById("vsContainer");

    if(wasBey1Generated&&wasBey2Generated&&!wasWinButtonGenerated){
        vsContainer.style.visibility="visible";
        vsContainer.style.display="inherit";

        //once both beys are made, make sure they have a matchup in the recordsDBX
        addRecord(bey1, bey2);
        addRecord(bey2, bey1);
        updateRecords(bey1, bey2, "update");
        updateRecords(bey2, bey1, "update");
        displayRecords();

        // titles above win buttons
        bey1WinTitle.textContent = bey1.name;
        bey2WinTitle.textContent = bey2.name;

    }

}

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
    updateWinCounts(winnerBey, loserBey, winType);
    updateRecords(winnerBey, loserBey, winType);
    lastRecordOutcome = winType;
    lastRecordWinner = winnerBey;
    lastRecordLoser = loserBey;

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
    isRatchetBit = ( allBits[bey.bit].type="ratchetBit" );
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

//tracking for actual past match ups, so we know what build blades won or lost against, instead of anon stats
function addRecord(challenger, defender){

    console.log("called addRecord" + challenger.name + ", " + defender.name + ")");

    var winRecord = {
        _id: challenger.id + " " + defender.id,
        title: challenger.name + " vs " + defender.name,
        wko: 0,
        lko: 0,
        wso: 0,
        lso: 0,
        wbst: 0,
        lbst: 0,
        wx: 0,
        lx: 0,
        draws: 0,
        challenger: challenger,
        defender: defender
    }

    recordsDBX.put(winRecord, function callback(err, doc){
        if(!err){
            console.log("Successfully added a record");
        }
        else{
            console.log(err);
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
            beyBladeDBX.put(doc);
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

//update the records database with a result is chosen
function updateRecords(winner, loser, outcome){

    console.log("called updateRecords(" + winner.name  + ", " + loser.name + ", " + outcome + ")");

    var record1Id = winner.id + " " + loser.id;
    var record2Id = loser.id + " " + winner.id;
    addRecord(winner, loser);
    addRecord(loser, winner)

    switch(outcome){
        case "KO":
            recordsDBX.get(record1Id, function(err, doc) {
                if(!err){
                    doc.wko += 1;
                    recordsDBX.put(doc);
                    displayRecords();
                }
                // else{
                //     console.log(err);
                // }
            });
            recordsDBX.get(record2Id, function(err, doc) {
                if(!err){
                    doc.lko += 1;
                    recordsDBX.put(doc);
                    displayRecords();
                }
                // else{
                //     console.log(err);
                // }
            });
            break;
        case "SO":
            recordsDBX.get(record1Id, function(err, doc) {
                if(!err){
                    doc.wso += 1;
                    recordsDBX.put(doc);
                    displayRecords();
                }
                // else{
                //     console.log(err);
                // }
            });
            recordsDBX.get(record2Id, function(err, doc) {
                if(!err){
                    doc.lso += 1;
                    recordsDBX.put(doc);
                    displayRecords();
                }
                // else{
                //     console.log(err);
                // }
            });
            break;
        case "burst":
            recordsDBX.get(record1Id, function(err, doc) {
                if(!err){
                    doc.wbst += 1;
                    recordsDBX.put(doc);
                    displayRecords();
                }
                // else{
                //     console.log(err);
                // }
            });
            recordsDBX.get(record2Id, function(err, doc) {
                if(!err){
                    doc.lbst += 1;
                    recordsDBX.put(doc);
                    displayRecords();
                }
                // else{
                //     console.log(err);
                // }
            });
            break;
        case "x":
            recordsDBX.get(record1Id, function(err, doc) {
                if(!err){
                    doc.wx += 1;
                    recordsDBX.put(doc);
                    displayRecords();
                }
                // else{
                //     console.log(err);
                // }
            });
            recordsDBX.get(record2Id, function(err, doc) {
                if(!err){
                    doc.lx += 1;
                    recordsDBX.put(doc);
                    displayRecords();
                }
                // else{
                //     console.log(err);
                // }
            });
            break;
        case "draw":
            recordsDBX.get(record1Id, function(err, doc) {
                if(!err){
                    doc.draws += 1;
                    recordsDBX.put(doc);
                    displayRecords();
                }
                // else{
                //     console.log(err);
                // }
            });
            recordsDBX.get(record2Id, function(err, doc) {
                if(!err){
                    doc.draws += 1;
                    recordsDBX.put(doc);
                    displayRecords();
                }
                // else{
                //     console.log(err);
                // }
            });
            break;
        case "update":
            recordsDBX.get(record1Id, function(err, doc) {
                if(!err){
                    doc.challenger = winner;
                    doc.defender = loser;
                    recordsDBX.put(doc);
                }
                // else{
                //     console.log(err);
                // }
            });
            recordsDBX.get(record2Id, function(err, doc) {
                if(!err){
                    doc.challenger = loser;
                    doc.defender = winner;
                    recordsDBX.put(doc);
                }
                // else{
                //     console.log(err);
                // }
            });
            break;
        default:
            console.log("Something went wrong. Record not added")
            
    }

}

//updates the win and loss counts for both beys when a result is chosen
function updateWinCounts(winner, loser, outcome){

    console.log("called updateWinCounts(" + winner.name + ", " + loser.name + ", " + outcome + ")");

    switch(outcome){
        case "KO":
        beyBladeDBX.get(winner.id, function(err, doc) {
            if(!err){
                doc.build.winsKO += 1;
                beyBladeDBX.put(doc);
                showBeybladeStats(bey1,1);
            }
            // else{
            //     console.log(err);
            // }
        });
    
        beyBladeDBX.get(loser.id, function(err, doc) {
            if(!err){
                doc.build.loseKO += 1;
                beyBladeDBX.put(doc);
                showBeybladeStats(bey2,2);
            }
            // else{
            //     console.log(err);
            // }
        });
        break;

        case "SO":
            beyBladeDBX.get(winner.id, function(err, doc) {
                if(!err){
                    doc.build.winsSO += 1;
                    beyBladeDBX.put(doc);
                    showBeybladeStats(bey1,1);
                }
                // else{
                //     console.log(err);
                // }
            });
        
            beyBladeDBX.get(loser.id, function(err, doc) {
                if(!err){
                    doc.build.loseSO += 1;
                    beyBladeDBX.put(doc);
                    showBeybladeStats(bey2,2);
                }
                // else{
                //     console.log(err);
                // }
            });
        break;

        case "burst":
            beyBladeDBX.get(winner.id, function(err, doc) {
                if(!err){
                    doc.build.winsBst += 1;
                    beyBladeDBX.put(doc);
                    showBeybladeStats(bey1,1);
                }
                // else{
                //     console.log(err);
                // }
            });
        
            beyBladeDBX.get(loser.id, function(err, doc) {
                if(!err){
                    doc.build.loseBst += 1;
                    beyBladeDBX.put(doc);
                    showBeybladeStats(bey2,2);
                }
                // else{
                //     console.log(err);
                // }
            });
        break;

        case "x":
            beyBladeDBX.get(winner.id, function(err, doc) {
                if(!err){
                    doc.build.winsX += 1;
                    beyBladeDBX.put(doc);
                    showBeybladeStats(bey1,1);
                }
                // else{
                //     console.log(err);
                // }
            });
        
            beyBladeDBX.get(loser.id, function(err, doc) {
                if(!err){
                    doc.build.loseX += 1;
                    beyBladeDBX.put(doc);
                    showBeybladeStats(bey2,2);
                }
                // else{
                //     console.log(err);
                // }
            });
        break;

        case "draw":
            beyBladeDBX.get(winner.id, function(err, doc) {
                if(!err){
                    doc.build.draws += 1;
                    beyBladeDBX.put(doc);
                    showBeybladeStats(bey1,1);
                }
                // else{
                //     console.log(err);
                // }
            });
        
            beyBladeDBX.get(loser.id, function(err, doc) {
                if(!err){
                    doc.build.draws += 1;
                    beyBladeDBX.put(doc);
                    showBeybladeStats(bey2,2);
                }
                // else{
                //     console.log(err);
                // }
            });
        break;

        default:
            console.log("something went wrong with updating wins");

    }
    
}

// undos last entered result
function undoLastRecord(){

    console.log("called undoLastRecord()");

    var winner = lastRecordWinner;
    var loser = lastRecordLoser;
    var outcome = lastRecordOutcome;
    var record1Id = winner.id + " " + loser.id;
    var record2Id = loser.id + " " + winner.id;

    switch(outcome){
        case "KO":
        beyBladeDBX.get(winner.id, function(err, doc) {
            if(!err){
                doc.build.winsKO -= 1;
                beyBladeDBX.put(doc);
                showBeybladeStats(bey1,1);
            }
            // else{
            //     console.log(err);
            // }
            
        });
    
        beyBladeDBX.get(loser.id, function(err, doc) {
            if(!err){
                doc.build.loseKO -= 1;
                beyBladeDBX.put(doc);
                showBeybladeStats(bey2,2);
            }
            // else{
            //     console.log(err);
            // }
        });

        recordsDBX.get(record1Id, function(err, doc) {
            if(!err){
                doc.wko -= 1;
                recordsDBX.put(doc);
                displayRecords();
            }
            // else{
            //     console.log(err);
            // }
        });
        recordsDBX.get(record2Id, function(err, doc) {
            if(!err){
                doc.lko -= 1;
                recordsDBX.put(doc);
                displayRecords();
            }
            // else{
            //     console.log(err);
            // }
        });
        
        break;

        case "SO":
            beyBladeDBX.get(winner.id, function(err, doc) {
                if(!err){
                    doc.build.winsSO -= 1;
                    beyBladeDBX.put(doc);
                    showBeybladeStats(bey1,1);
                }
                // else{
                //     console.log(err);
                // }
            });
        
            beyBladeDBX.get(loser.id, function(err, doc) {
                if(!err){
                    doc.build.loseSO -= 1;
                    beyBladeDBX.put(doc);
                    showBeybladeStats(bey2,2);
                }
                // else{
                //     console.log(err);
                // }
            });

            recordsDBX.get(record1Id, function(err, doc) {
                if(!err){
                    doc.wso -= 1;
                    recordsDBX.put(doc);
                    displayRecords();
                }
                // else{
                //     console.log(err);
                // }
            });
            recordsDBX.get(record2Id, function(err, doc) {
                if(!err){
                    doc.lso -= 1;
                    recordsDBX.put(doc);
                    displayRecords();
                }
                // else{
                //     console.log(err);
                // }
            });
        break;

        case "burst":
            beyBladeDBX.get(winner.id, function(err, doc) {
                if(!err){
                    doc.build.winsBst -= 1;
                    beyBladeDBX.put(doc);
                    showBeybladeStats(bey1,1);
                }
                // else{
                //     console.log(err);
                // }
            });
        
            beyBladeDBX.get(loser.id, function(err, doc) {
                if(!err){
                    doc.build.loseBst -= 1;
                    beyBladeDBX.put(doc);
                    showBeybladeStats(bey2,2);
                }
                // else{
                //     console.log(err);
                // }
            });

            recordsDBX.get(record1Id, function(err, doc) {
                if(!err){
                    doc.wbst -= 1;
                    recordsDBX.put(doc);
                    displayRecords();
                }
                // else{
                //     console.log(err);
                // }
            });
            recordsDBX.get(record2Id, function(err, doc) {
                if(!err){
                    doc.lbst -= 1;
                    recordsDBX.put(doc);
                    displayRecords();
                }
                // else{
                //     console.log(err);
                // }
            });
        break;

        case "x":
            beyBladeDBX.get(winner.id, function(err, doc) {
                if(!err){
                    doc.build.winsX -= 1;
                    beyBladeDBX.put(doc);
                    showBeybladeStats(bey1,1);
                }
                // else{
                //     console.log(err);
                // }
            });
        
            beyBladeDBX.get(loser.id, function(err, doc) {
                if(!err){
                    doc.build.loseX -= 1;
                    beyBladeDBX.put(doc);
                    showBeybladeStats(bey2,2);
                }
                // else{
                //     console.log(err);
                // }
            });

            recordsDBX.get(record1Id, function(err, doc) {
                if(!err){
                    doc.wx -= 1;
                    recordsDBX.put(doc);
                    displayRecords();
                }
                // else{
                //     console.log(err);
                // }
            });
            recordsDBX.get(record2Id, function(err, doc) {
                if(!err){
                    doc.lx -= 1;
                    recordsDBX.put(doc);
                    displayRecords();
                }
                // else{
                //     console.log(err);
                // }
            });
        break;

        case "draw":
            beyBladeDBX.get(winner.id, function(err, doc) {
                if(!err){
                    doc.build.draws -= 1;
                    beyBladeDBX.put(doc);
                    showBeybladeStats(bey1,1);
                }
                // else{
                //     console.log(err);
                // }
            });
        
            beyBladeDBX.get(loser.id, function(err, doc) {
                if(!err){
                    doc.build.draws -= 1;
                    beyBladeDBX.put(doc);
                    showBeybladeStats(bey2,2);
                }
                // else{
                //     console.log(err);
                // }
            });

            recordsDBX.get(record1Id, function(err, doc) {
                if(!err){
                    doc.draws -= 1;
                    recordsDBX.put(doc);
                    displayRecords();
                }
                // else{
                //     console.log(err);
                // }
            });
            recordsDBX.get(record2Id, function(err, doc) {
                if(!err){
                    doc.draws -= 1;
                    recordsDBX.put(doc);
                    displayRecords();
                }
                // else{
                //     console.log(err);
                // }
            });
        break;

        default:
            console.log("Undo backstack only hold one record for now, or, something went wrong");

    }

    lastRecordWinner = "";
    lastRecordLoser = "";
    lastRecordOutcome = "";
}

//fills the bey selection menu
function showBeyblades() {

    console.log("called showBeyblades()");

    var dbSelectList = document.getElementById("dbSelectList");

    //clear the list so we dont just add more options
    while (dbSelectList.options.length > 0) {                
        dbSelectList.remove(0);
    }        

    beyBladeDBX.allDocs({include_docs: true, descending: true}, function(err, doc) {
        doc.rows.sort(function(a, b){
            return (''+a.doc.build.name).localeCompare(b.doc.build.name);
        });
        for(i = 0; i < doc.total_rows; i++){
            if(!err){
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

// DB stats to copy to clipboard. This must be global so the button listener function gets updated text
var dbCopiedStats = "";

//shows selected bey's stats and allows for the user to set the selected bey to bey 1 or 2
function setDbBey(){

    console.log("called setDbBey(), selectedBey: " + selectedBey.value);

    beyBladeDBX.get(selectedBey.value, function(err, doc) {
        if(!err){
            //TODO: move text and buttons to HTML, to make styling/layout easier

            // build a new BeyBlade object using parts, then overlay win/loss data from database
            if((allBlades[doc.build.blade].system == "BX") || (allBlades[doc.build.blade].system == "UX")){
                var castDoc = Object.assign( new BeyBlade(-1, doc.build.blade, -1, doc.build.rachet, doc.build.bit), doc.build );
            }
            else if(allBlades[doc.build.blade].system == "CX"){
                var castDoc = Object.assign( new BeyBlade(doc.build.bitChip , doc.build.blade, doc.build.assist, doc.build.rachet, doc.build.bit), doc.build );
            }

            //TODO: move some calculation into Beyblade class, like getWinPoints, getLosePoints, etc
            var winHolder = castDoc.getTotalWin();
            var winPointHolder = (doc.build.winsBst*2) + (doc.build.winsKO*2) + doc.build.winsSO + (doc.build.winsX*3);
            var lossHolder = castDoc.getTotalLoss();
            var lossPointHolder = (doc.build.loseBst*2) + (doc.build.loseKO*2) + doc.build.loseSO + (doc.build.loseX*3);
            var totalHolder = castDoc.getTotalMatch();
            var avgPPW = round((winPointHolder/winHolder),2);
            var avgPPL = round((lossPointHolder/lossHolder),2);
            var totalPointChange = (doc.build.winsKO-doc.build.loseKO)*2 +(doc.build.winsSO-doc.build.loseSO) +(doc.build.winsBst-doc.build.loseBst)*2 +(doc.build.winsX-doc.build.loseX)*3;
            var totalMatches = doc.build.winsKO +doc.build.loseKO +doc.build.winsSO +doc.build.loseSO +doc.build.winsBst +doc.build.loseBst +doc.build.winsX+doc.build.loseX + doc.build.draws;
            var avgPointChangePerRound = totalPointChange / totalMatches;
            var avgWinPercent = round((winHolder/totalHolder)*100,2);

            if (isNaN(avgPPW)){ avgPPW=0; }
            if (isNaN(avgWinPercent)){ avgWinPercent=0; }
            if (isNaN(avgPPL)){ avgPPL=0; }
            if (isNaN(avgPointChangePerRound)){ avgPointChangePerRound=0; }

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
            dbBey = doc.build;
            
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
            
            //set copy to history button
            if(!wasCopyHistToClipGenerated) {
                console.log("adding listener");
                copyStatsbtn.innerHTML = "Copy Stats to Clipboard";
                copyStatsbtn.classList.add("btn");
                copyStatsbtn.classList.add("btn-primary");
                copyStatsbtn.addEventListener("click", function() {
                    console.log("copy to clipboard");
                    //console.log(dbCopiedStats);
                    navigator.clipboard.writeText(dbCopiedStats);
                });
                dbBeySpace.append(copyStatsbtn);
                wasCopyHistToClipGenerated = true;
            }

            //set as bey1 button
            if(!wasSetBey1Generated){
                bey1Statbtn.innerHTML = "Set as Bey 1";
                bey1Statbtn.classList.add("btn");
                bey1Statbtn.classList.add("btn-primary");
                bey1Statbtn.addEventListener("click", function() {
                    bey1=dbBey;
                    wasBey1Generated = true;
                    showBeybladeStats(bey1, 1);
                    createWinButtons()
                    console.log(bey1.winsSO)
                });
                dbBeySpace.append(bey1Statbtn);
                wasSetBey1Generated = true;
            }

            //set as bey2 button
            if(!wasSetBey2Generated){
                bey2Statbtn.innerHTML = "Set as Bey 2";
                bey2Statbtn.classList.add("btn");
                bey2Statbtn.classList.add("btn-primary");
                bey2Statbtn.addEventListener("click", function() {
                    bey2=dbBey;
                    wasBey2Generated = true;
                    showBeybladeStats(bey2, 2);
                    createWinButtons()
                });
                dbBeySpace.append(bey2Statbtn);
                wasSetBey2Generated = true;
            }
            
            //edit bey stats in database
            editBeybtn.innerHTML = "Edit Stats";
            editBeybtn.classList.add("btn");
            editBeybtn.classList.add("btn-primary");
            editBeybtn.setAttribute("data-bs-toggle", "modal");
            editBeybtn.setAttribute("data-bs-target", "#editBeyPopup");
            dbBeySpace.append(editBeybtn);

            //show matchup history button
            showMatchupbtn.innerHTML = "Matchup History";
            showMatchupbtn.classList.add("btn");
            showMatchupbtn.classList.add("btn-primary");
            showMatchupbtn.setAttribute("data-bs-toggle", "modal");
            showMatchupbtn.setAttribute("data-bs-target", "#matchupHist");
            showMatchupbtn.addEventListener("click", function() {
                populateMatchHist(dbBey);
            });
            dbBeySpace.append(showMatchupbtn);

            //delete bey from database button
            removeBeybtn.innerHTML = "Delete Bey";
            removeBeybtn.classList.add("btn");
            removeBeybtn.classList.add("btn-danger");
            removeBeybtn.setAttribute("data-bs-toggle", "modal");
            removeBeybtn.setAttribute("data-bs-target", "#areYouSure");
            dbBeySpace.append(removeBeybtn);

        }
        // else{
        //     console.log(err);
        // }
    });
}

//displays the win loss and weight stats for the chosen beyblade
function showBeybladeStats(bey, whichBey) {

    var castDoc = Object.assign( new BeyBlade(bey.bitChip, bey.blade, bey.assist, bey.rachet, bey.bit), bey);
    console.log("called showBeybladeStats(" + bey.name + ", " + whichBey + "), id: " + castDoc.getDbId() );

    switch(whichBey){
        case 1:
            beyBladeDBX.get(bey.id, function(err, doc) {
                if(!err){
                    bey1Is.textContent = "BeyBlade 1 is: " + doc.build.name;
                    bey1Stats.textContent = "Weight: " + round(doc.build.weight, 2) + " grams";
                    bey1KO.textContent = "Over Win/Loss: " + doc.build.winsKO + " / " + doc.build.loseKO;
                    bey1SO.textContent = "Spin Win/Loss: " + doc.build.winsSO + " / " + doc.build.loseSO;
                    bey1Bst.textContent = "Burst Win/Loss: " + doc.build.winsBst + " / " + doc.build.loseBst;
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
                    bey2KO.textContent = "Over Win/Loss: " + doc.build.winsKO + " / " + doc.build.loseKO;
                    bey2SO.textContent = "Spin Win/Loss: " + doc.build.winsSO + " / " + doc.build.loseSO;
                    bey2Bst.textContent = "Burst Win/Loss: " + doc.build.winsBst + " / " + doc.build.loseBst;
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

    var record1 = document.getElementById("record1");
    var wins1 = document.getElementById("wins1");
    var points1 = document.getElementById("points1");
    var ko1 = document.getElementById("ko1");
    var so1 = document.getElementById("so1");
    var bst1 = document.getElementById("bst1");
    var x1 = document.getElementById("x1");
    
    var record2 = document.getElementById("record2");
    var wins2 = document.getElementById("wins2");
    var points2 = document.getElementById("points2");
    var ko2 = document.getElementById("ko2");
    var so2 = document.getElementById("so2");
    var bst2 = document.getElementById("bst2");
    var x2 = document.getElementById("x2");

    var draws = document.getElementById("draws");
    var totalRounds = document.getElementById("vsTotalRounds");

    var recordID = bey1.id + " " + bey2.id;

    var recordsSpace = document.getElementById("recordsSpace"); //NEW
    var recordsCopybtn = document.createElement("button"); //NEW

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

    recordsDBX.get(recordID, function(err, doc){
        record1.innerHTML = noBreakRatchetText(bey1.name);
        ko1.textContent = doc.wko;
        bey1KO = doc.wko;
        so1.textContent = doc.wso;
        bey1SO = doc.wso
        bst1.textContent = doc.wbst;
        bey1Bst = doc.wbst;
        x1.textContent = doc.wx;
        bey1X = doc.wx;
        wins1.textContent = doc.wx + doc.wbst + doc.wko + doc.wso;
        bey1Total = doc.wx + doc.wbst + doc.wko + doc.wso;
        points1.textContent = doc.wx*3 + doc.wbst*2 + doc.wko*2 + doc.wso;
        bey1Points = doc.wx*3 + doc.wbst*2 + doc.wko*2 + doc.wso;

        record2.innerHTML = noBreakRatchetText(bey2.name);
        ko2.textContent = doc.lko;
        bey2KO = doc.lko;
        so2.textContent = doc.lso;
        bey2SO = doc.lso
        bst2.textContent =  doc.lbst;
        bey2Bst = doc.lbst;
        x2.textContent =  doc.lx;
        bey2X = doc.lx;
        wins2.textContent = doc.lx + doc.lbst + doc.lko + doc.lso;
        bey2Total = doc.lx + doc.lbst + doc.lko + doc.lso
        points2.textContent = doc.lx*3 + doc.lbst*2 + doc.lko*2 + doc.lso;
        bey2Points = doc.lx*3 + doc.lbst*2 + doc.lko*2 + doc.lso;

        draws.textContent = doc.draws;
        draw = doc.draws;

        totalRounds.textContent = "Total: " + (doc.wx + doc.wbst + doc.wko + doc.wso + doc.lx + doc.lbst + doc.lko + doc.lso + doc.draws);
        totalRound = doc.wx + doc.wbst + doc.wko + doc.wso + doc.lx + doc.lbst + doc.lko + doc.lso + doc.draws;

        displayCopiedStats =   "Results for " + bey1.name + " VS " + bey2.name + "\n" +
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

}

/**
 * Disable text-wrapping on the ratchet
 * @param {String} beyName 
 * @returns 
 */
function noBreakRatchetText(beyName) {

    console.log("called noBreakRatchetText(" + beyName + ")");

    // split bey name into parts
    var newBeyName = beyName;
    var beynameArray = newBeyName.split(" ");
    var beynameEnd = beynameArray[beynameArray.length-1];
    console.log("end: " + beynameEnd);
    var beynameEndNoBr = "<nobr>" + beynameEnd + "</nobr>";
    newBeyName = newBeyName.replace(beynameEnd, beynameEndNoBr);
    
    return newBeyName;
}

//displays part win/loss records when a user chooses to see them
function showPartStats(partType, partID){

    console.log("called showPartsStats(" + partType + ", " + partID + ")");
    
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

//populates the match history popup with selected Beys matchup history
function populateMatchHist(bey){

    console.log("called populateMatchHist(" + bey.name + ")");

    recordsDBX.allDocs({include_docs: true, descending: true}, function(err, doc) {

        matchupSpace.textContent = "";
        totalsSpace.textContent = "";
        matchupBey.textContent = "Matchup History for " + bey.name;

        // build a new BeyBlade object using parts, then overlay win/loss data from database
        if(((allBlades[bey.blade].system == "BX") || (allBlades[bey.blade].system == "UX"))){
            var castDoc = Object.assign( new BeyBlade(-1, bey.blade, -1, bey.rachet, bey.bit), bey);
            console.log("its a BX/UX Blade");
        }
        else if(allBlades[bey.blade].system == "CX"){
            var castDoc = Object.assign( new BeyBlade(bey.bitChip, bey.blade, bey.assist, bey.rachet, bey.bit), bey);
            console.log("its a CX blade");
        }
        else{ console.log("get fucked") }

        // prepare string version that can be copied to clipboard
        historyClipboardHolder = "Results for " + bey.name + ":";

        //var winHolder = doc.build.winsBst + doc.build.winsKO + doc.build.winsSO + doc.build.winsX;
        var winHolder = castDoc.getTotalWin();
        var winPointHolder = (bey.winsBst*2) + (bey.winsKO*2) + bey.winsSO + (bey.winsX*3);
        // var lossHolder = doc.build.loseBst + doc.build.loseKO + doc.build.loseSO + doc.build.loseX;
        var lossHolder = castDoc.getTotalLoss();
        var lossPointHolder = (bey.loseBst*2) + (bey.loseKO*2) + bey.loseSO + (bey.loseX*3);
        //var totalHolder = winHolder + lossHolder + doc.build.draws;
        var totalHolder = castDoc.getTotalMatch();
        var avgPPW = round((winPointHolder/winHolder),2);
        var avgPPL = round((lossPointHolder/lossHolder),2);
        var totalPointChange = (bey.winsKO-bey.loseKO)*2 +(bey.winsSO-bey.loseSO) +(bey.winsBst-bey.loseBst)*2 +(bey.winsX-bey.loseX)*3;
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

        historyClipboardHolder = "Results for " + bey.name + ":"
        
        for(i = 0; i < doc.total_rows; i++){
            if(doc.rows[i].doc.denfender!==undefined) {
                    doc.rows.sort(function(a, b){
                        return (''+b.doc.defender.name).localeCompare(a.doc.defender.name);
                    });
            }
            if(doc.rows[i].doc.challenger!==undefined) {
                // don't display if there are 0 matches
                var totalMatches = doc.rows[i].doc.wx + doc.rows[i].doc.wbst + doc.rows[i].doc.wko + doc.rows[i].doc.wso + doc.rows[i].doc.lx + doc.rows[i].doc.lbst + doc.rows[i].doc.lko + doc.rows[i].doc.lso +  doc.rows[i].doc.draws;
                if(!err && bey.id==doc.rows[i].doc.challenger.id && totalMatches>0){

                    console.log(historyClipboardHolder);

                    //title row
                    var titleRow = matchupSpace.insertRow(1);
                    var titleCell = titleRow.insertCell(0);
                    titleCell.colSpan=6;
                    titleCell.classList.add('text-center');
                    titleCell.innerHTML = doc.rows[i].doc.defender.name;
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
                    cell1.innerHTML = doc.rows[i].doc.wso + "/" + doc.rows[i].doc.lso;
                    cell2.innerHTML = doc.rows[i].doc.wbst + "/" + doc.rows[i].doc.lbst;
                    cell3.innerHTML = doc.rows[i].doc.wko + "/" + doc.rows[i].doc.lko;
                    cell4.innerHTML = doc.rows[i].doc.wx + "/" + doc.rows[i].doc.lx;
                    cell5.innerHTML = doc.rows[i].doc.draws;
                    cell6.innerHTML = (doc.rows[i].doc.wx*3 + doc.rows[i].doc.wbst*2 + doc.rows[i].doc.wko*2 + doc.rows[i].doc.wso) + "/" + (doc.rows[i].doc.lx*3 + doc.rows[i].doc.lbst*2 + doc.rows[i].doc.lko*2 + doc.rows[i].doc.lso);

                    historyClipboardHolder +=  "\n" + "vs " + doc.rows[i].doc.defender.name + ": " + totalMatches + " rounds, " + 
                                        (round( ((doc.rows[i].doc.wso + doc.rows[i].doc.wbst + doc.rows[i].doc.wko +doc.rows[i].doc.wx)/totalMatches)*100 ,2)) + "% of rounds won, " + 
                                        (doc.rows[i].doc.wx*3 + doc.rows[i].doc.wbst*2 + doc.rows[i].doc.wko*2 + doc.rows[i].doc.wso) + " points earned " + 
                                        (doc.rows[i].doc.lx*3 + doc.rows[i].doc.lbst*2 + doc.rows[i].doc.lko*2 + doc.rows[i].doc.lso) + " points lost";

                    console.log(historyClipboardHolder);

                }
            }
            // else if(bey.id!=doc.rows[i].doc.challenger.id) {
            //     console.log("No Matchup History");
            // }
            // else{
            //     console.log(err);
            // }

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
       
    });
}

function populateMatchHistUser2(bitChip1, blade1, assist1, rachet1, bit1, bitChip2, blade2, assist2, rachet2, bit2){

    console.log("populateMatchHistUser2(" + bitChip1 + ", " + blade1 + ", " + assist1 + ", " + rachet1 + ", " + bit1 + ", " + bitChip2 + ", " + blade2 + ", " + assist2 + ", " + rachet2 + ", " + bit2 +")");

    // overall stats
    primeMatchupHistStatsTable(); // wipe overall stats

    primeMatchupHistTable(); //table html
    // if all parts are "none", return
    if(blade1=="none" && rachet1=="none" && bit1=="none" && blade2=="none" && rachet2=="none" && bit2=="none" && bitChip1=="none" && assist1=="none" && bitChip2=="none" && assist2=="none"){
        return;
    }

    // get all docs
    recordsDBX.allDocs({include_docs: true, descending: true}, function(err, matches) {
        // grab just the array of matches
        matches = matches.rows;
        // filter the matches array based on selected parts
        if(blade1!="none") {
            matches = matches.filter(match => { return ( match.doc.challenger!=undefined && blade1==match.doc.challenger.blade ) });
        }
        if(rachet1!="none") {
            matches = matches.filter(match => { return ( match.doc.challenger!=undefined && rachet1==match.doc.challenger.rachet ) });
        }
        if(bit1!="none") {
            matches = matches.filter(match => { return ( match.doc.challenger!=undefined && bit1==match.doc.challenger.bit ) });
        }
        // only filter for CX parts if the blade is CX or no blade is selected
        if(blade1=="none" || allBlades[blade1].system == "CX"){
            // CX blade parts, bit chip and assist blade
            if(bitChip1!="none"){
                matches = matches.filter(match => { return ( match.doc.challenger!=undefined && bitChip1==match.doc.challenger.bitChip ) });
            }
            if(assist1!="none") {
                matches = matches.filter(match => { return ( match.doc.challenger!=undefined && assist1==match.doc.challenger.assist ) });
            }
        }

        // filter bey2 parts, if they're set
        if(blade2!="none") {
            matches = matches.filter(match => { return ( match.doc.defender!=undefined && blade2==match.doc.defender.blade ) });
        }
        if(rachet2!="none") {
            matches = matches.filter(match => { return ( match.doc.defender!=undefined && rachet2==match.doc.defender.rachet ) });
        }
        if(bit2!="none") {
            matches = matches.filter(match => { return ( match.doc.defender!=undefined && bit2==match.doc.defender.bit ) });
        }
        if(blade2=="none" || allBlades[blade2].system == "CX") {
            // CX blade parts, bit chip and assist blade
            if(bitChip2!="none") {
                matches = matches.filter(match => { return ( match.doc.defender!=undefined && bitChip2==match.doc.defender.bitChip ) });
            }
            if(assist2!="none") {
                matches = matches.filter(match => { return ( match.doc.defender!=undefined && assist2==match.doc.defender.assist ) });
            }
        }

        // for each matchup, write in table
        matches.forEach(match => {
            winHolder = match.doc.wko + match.doc.wso + match.doc.wbst + match.doc.wx;
            lossHolder = match.doc.lko + match.doc.lso + match.doc.lbst + match.doc.lx;
            draws = match.doc.draws;
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
            // count total wins, losses, draws, and points
            winHolder += match.doc.wko + match.doc.wso + match.doc.wbst + match.doc.wx;
            winPointHolder += (match.doc.wko*2) + match.doc.wso + (match.doc.wbst*2) + (match.doc.wx*3);
            lossHolder += match.doc.lko + match.doc.lso + match.doc.lbst + match.doc.lx;
            lossPointHolder += (match.doc.lko*2) + match.doc.lso + (match.doc.lbst*2) + (match.doc.lx*3);
            draws += match.doc.draws;
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
        statBeyName += (blade1!="none" ? allBlades[blade1].name + " " : "");
        statBeyName += (assist1!="none" ? allAssists[assist1].name + " " : "");
        statBeyName += (rachet1!="none" ? allRachets[rachet1].name + " " : "");
        statBeyName += (bit1!="none" ? allBits[bit1].name + " " : "");
        // if bey2 parts are selected, title will be "X vs Y"
        var defenderBeyName = "";
        defenderBeyName += (bitChip2!="none" ? allBitChips[bitChip2].name : "");
        defenderBeyName += (blade2!="none" ? allBlades[blade2].name + " " : "");
        defenderBeyName += (assist2!="none" ? allAssists[assist2].name + " " : "");
        defenderBeyName += (rachet2!="none" ? allRachets[rachet2].name + " " : "");
        defenderBeyName += (bit2!="none" ? allBits[bit2].name + " " : "");
        if(defenderBeyName.trim() != "") {
            statBeyName += " vs " + defenderBeyName;
        }
        matchupStatsBeyTitle.textContent = statBeyName;

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

    console.log("called fillMatchupHistory(" + history.length + ")");
    
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
    cellVS.innerHTML = history.challenger.name+"<br>vs<br>"+history.defender.name;
    cell1.innerHTML = history.challenger.name;
    cell3.innerHTML = history.defender.name;
    cell4.innerHTML = history.wko + "/" + history.lko;
    cell5.innerHTML = history.wso + "/" + history.lso;
    cell6.innerHTML = history.wbst + "/" + history.lbst;
    cell7.innerHTML = history.wx + "/" + history.lx;
    cell8.innerHTML = history.draws;
}

//delete a bey from the system
function deleteBey(){

    console.log("called deleteBey(), selectedBey: " + selectedBey.value);

    var dbSelectList = document.getElementById("dbSelectList");

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
                // else{
                //     console.log(err);
                // }
            });
        }
    });
}

//clears all beyblades in the database
function deleteAllBeys() {

    console.log("called deleteAllBeys()");

    //clear the list so we dont just add more options
    while (dbSelectList.options.length > 0) {                
        dbSelectList.remove(0);
    }        

    beyBladeDBX.allDocs({include_docs: true, descending: true}, function(err, doc) {
        for(i = 0; i < doc.total_rows; i++){
            if(!err){
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
        1: { "blade":"bey1Blade", "assistBlade":"bey1AssistBlade", "bitChip":"bey1BitChip", "ratchet":"bey1Rachet", "bit":"bey1Bit" },
        2: { "blade":"bey2Blade", "assistBlade":"bey2AssistBlade", "bitChip":"bey2BitChip", "ratchet":"bey2Rachet", "bit":"bey2Bit" },
        // part record modal
        3: { "blade":"bladeR1", "assistBlade":"assistR1", "bitChip":"bitChipR1", "ratchet":"rachetR1", "bit":"bitR1" },
        4: { "blade":"bladeR2", "assistBlade":"assistR2", "bitChip":"bitChipR2", "ratchet":"rachetR2", "bit":"bitR2" }
    };

    disableParts = [];
    enableParts = [];

    // decide what parts to enable/disable
    if(partType=="blade") {
        console.log("checking blades");
        if(allBlades[selection].system == "CX"){
            //console.log("CX blade selected");
            enableParts = ["bitChip", "assistBlade"];
        }
        else {
            disableParts = ["bitChip", "assistBlade"];
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
    for (const partToDisable of enableParts) {
        document.getElementById( dropdownIDs[whichBey][partToDisable] ).disabled = false;
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

//theme object, will be a pouchDB object
var selectedTheme;
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

    console.log("called loadTheme()");

    settings.get("selectedTheme", function callback(err, result) {
        if (!err) {
            selectedTheme=result;
            console.log('Loaded saved theme');
            console.log(JSON.stringify(result));
            theme.href="./theme-"+selectedTheme.name.toLowerCase()+".css";
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

//run main on startup
main();
