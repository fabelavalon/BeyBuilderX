/*==========================================================*
 * BeyBuilder v1.1 for Beyblade X                           *
 * Author: Fabel                                            *
 * Copyright 2023-2024                                      *
 *==========================================================*/

//create beyblade database
var beyBladeDBX = new PouchDB("BeyBladesX");
var recordsDBX = new PouchDB("RecordX");

//import the parts lists
var allBlades = blades;
var allRachets = rachets;
var allBitss = bits;

//create the elements for the buttons that will get generated via this script
var bey1Statbtn = document.createElement("button");
var bey2Statbtn = document.createElement("button");
var showAllBeysbtn = document.createElement("button");
var removeBeybtn = document.createElement("button");
var editBeybtn = document.createElement("button");
var showMatchupbtn = document.createElement("button");

//import the elements for the dropdowns...
//...for bey1
var bey1BladeDropdown = document.getElementById("bey1Blade");
var bey1RachetDropdown = document.getElementById("bey1Rachet");
var bey1BitDropdown = document.getElementById("bey1Bit");

//...for bey2
var bey2BladeDropdown = document.getElementById("bey2Blade");
var bey2RachetDropdown = document.getElementById("bey2Rachet");
var bey2BitDropdown = document.getElementById("bey2Bit");

//...for the parts records
var bladeDropdown1 = document.getElementById("bladeR1");
var rachetDropdown1 = document.getElementById("rachetR1");
var bitDropdown1 = document.getElementById("bitR1");
var bladeDropdown2 = document.getElementById("bladeR2");
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
var dbBeyStats = document.getElementById("dbBeyStats");
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
//
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

//everything else
var error = document.getElementById("error");
var winners = document.getElementById("winnerLog");
var matchupSpace = document.getElementById("matchupSpace");
var matchupSpaceUser = document.getElementById("matchupSpaceUser");
var matchupBey = document.getElementById("matchupBey");
var matchupBeyUser = document.getElementById("matchupBeyUser");

//used to generate the win buttons after both beys are selected
var wasBey1Generated = false;
var wasBey2Generated = false;

//used so we dont generate more buttons
var wasWinButtonGenerated = false;

//global beyblade variables
var bey1;
var bey2;
var dbBey;

//used for undo function
var lastRecordWinner;
var lastRecordLoser;
var lastRecordOutcome;

//runs on launch, fills draop downs and database list
function main(){

    console.log("Welcome to BeyBuilder X Version 1.0");

    bey1BladeDropdown.value="random";
    bey2BladeDropdown.value="random";
    bladeDropdown1.value="none";

    bey1RachetDropdown.value="random";
    bey2RachetDropdown.value="random";
    rachetDropdown1.value="none";

    bey1BitDropdown.value="random";
    bey2BitDropdown.value="random";
    bitDropdown1.value="none";
    
    //create and populate the drop downs with the parts from the database...
    //...the Blades
    for (var i = 0; i < allBlades.length; i++) {
        var options = document.createElement("option");
        var option2 = document.createElement("option");
        var option3 = document.createElement("option");
        var option4 = document.createElement("option");
        options.textContent = allBlades[i].name;
        options.value = allBlades[i].id;
        option2.textContent = allBlades[i].name;
        option2.value = allBlades[i].id;
        option3.textContent = allBlades[i].name;
        option3.value = allBlades[i].id;
        option4.textContent = allBlades[i].name;
        option4.value = allBlades[i].id;
        bey1BladeDropdown.appendChild(options);
        bey2BladeDropdown.appendChild(option2);
        bladeDropdown1.appendChild(option3);
        bladeDropdown2.appendChild(option4);

    }

    //...the rachets
    for (var i = 0; i < allRachets.length; i++) {
        var options = document.createElement("option");
        var option2 = document.createElement("option");
        var option3 = document.createElement("option");
        var option4 = document.createElement("option");
        options.textContent = allRachets[i].name;
        options.value = allRachets[i].id;
        option2.textContent = allRachets[i].name;
        option2.value = allRachets[i].id;
        option3.textContent = allRachets[i].name;
        option3.value = allRachets[i].id;
        option4.textContent = allRachets[i].name;
        option4.value = allRachets[i].id;
        bey1RachetDropdown.appendChild(options);
        bey2RachetDropdown.appendChild(option2);
        rachetDropdown1.appendChild(option3);
        rachetDropdown2.appendChild(option4);
        
    }

    //...the bits  
    for (var i = 0; i < allBits.length; i++) {
        var options = document.createElement("option");
        var option2 = document.createElement("option");
        var option3 = document.createElement("option");
        var option4 = document.createElement("option");
        options.textContent = allBits[i].name;
        options.value = allBits[i].id;
        option2.textContent = allBits[i].name;
        option2.value = allBits[i].id;
        option3.textContent = allBits[i].name;
        option3.value = allBits[i].id;
        option4.textContent = allBits[i].name;
        option4.value = allBits[i].id;
        bey1BitDropdown.appendChild(options);
        bey2BitDropdown.appendChild(option2);
        bitDropdown1.appendChild(option3);
        bitDropdown2.appendChild(option4);
        
    }

    //fill the dbList
    showBeyblades();
    
};

//generate a beyblade based on the selections for the first set of drop downs
function generateBey1(){

    //uses the id's of all parts for easy call
    var blade = -1;
    var rachet = -1;
    var bit = -1;

    //boolean values to check if the beyblade is random or not
    var bladeChosen = false;
    var rachetChosen = false;
    var bitChosen = false;

    //random or chosen...
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

    //put it togther and...
    bey1 = new BeyBlade(blade, rachet, bit);

    wasBey1Generated = true;
    addBeyblade(bey1);
    error.textContent = "";
    bey1Is.textContent = "BeyBlade 1 is: " + bey1.name;
    showBeybladeStats(bey1, 1);
    createWinButtons();

}

//generate a beyblade based on the selections for the second set of drop downs
function generateBey2(){

    //uses the id's of all parts for easy call
    var blade = -1;
    var rachet = -1;
    var bit = -1;

    //boolean values to check if the beyblade is random or not
    var bladeChosen = false;
    var rachetChosen = false;
    var bitChosen = false;

    //random or chosen...
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

    //put it together and...
    bey2 = new BeyBlade(blade, rachet, bit);

    wasBey2Generated = true;
    addBeyblade(bey2);
    error.textContent = "";
    bey2Is.textContent = "BeyBlade 2 is: " + bey2.name;
    showBeybladeStats(bey2, 2);
    createWinButtons();
    
}

//checks if ANY part is random
function isBeyRandom(bladeState, rachetState, bitState){

    if(!bladeState || !rachetState || !bitState){
        return true;
    }
    else{
        return false;
    }
}

//populates win buttons on screen
function createWinButtons(){

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
            winText="OOPS"
    }

    if(winType=="draw" || beyNumber==0) {
        winners.textContent = "It ended in a Draw!";
    } else {
        winners.textContent = "The winner of this round is: " + winnerBey.name + " by "+ winText +"!";
    }

}


//add a new, not before generated beyblade to the database
function addBeyblade(bey) {

    var beyblade = {
        _id: allBlades[bey.blade].id + " " + allRachets[bey.rachet].id + " " + allBits[bey.bit].id,
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
            dbBeyStats.textContent = "Weight: " + round(doc.build.weight,2) + " grams.";
            dbBeyKO.textContent = "OF Win/Loss: " + doc.build.winsKO + " / " + doc.build.loseKO;
            dbBeySO.textContent = "SF Win/Loss: " + doc.build.winsSO + " / " + doc.build.loseSO;
            dbBeyBst.textContent = "Burst Win/Loss: " + doc.build.winsBst + " / " + doc.build.loseBst;
            dbBeyX.textContent = "Xtreme Win/Loss: " + doc.build.winsX + " / " + doc.build.loseX;
            dbBeyDraw.textContent = "Draws: " + doc.build.draws;
            dbBey = doc.build;
        }
    });

}

//update the records database with a result is chosen
function updateRecords(winner, loser, outcome){

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

function undoLastRecord(){
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
            // else{
            //     console.log(err);
            // }
       }
    });

}

//shows selected bey's stats and allows for the user to set the selected bey to bey 1 or 2
function setDbBey(){

    beyBladeDBX.get(selectedBey.value, function(err, doc) {
        if(!err){
            dbBeyName.textContent = doc.build.name;
            dbBeyStats.textContent = "Weight: " + round(doc.build.weight,2) + " grams. Spin: " + doc.build.spin;
            dbBeyKO.textContent = "OF Win/Loss: " + doc.build.winsKO + " / " + doc.build.loseKO;
            dbBeySO.textContent = "SF Win/Loss: " + doc.build.winsSO + " / " + doc.build.loseSO;
            dbBeyBst.textContent = "Burst Win/Loss: " + doc.build.winsBst + " / " + doc.build.loseBst;
            dbBeyX.textContent = "Xtreme Win/Loss: " + doc.build.winsX + " / " + doc.build.loseX;
            dbBeyDraw.textContent = "Draws: " + doc.build.draws;
            dbBey = doc.build;

            //set as bey1 button
            bey1Statbtn.innerHTML = "Set as Bey 1";
            bey1Statbtn.classList.add("btn");
            bey1Statbtn.classList.add("btn-basic");
            bey1Statbtn.addEventListener("click", function() {
                bey1=dbBey;
                wasBey1Generated = true;
                showBeybladeStats(bey1, 1);
                createWinButtons()
            });
            dbBeySpace.append(bey1Statbtn);

            //set as bey2 button
            bey2Statbtn.innerHTML = "Set as Bey 2";
            bey2Statbtn.classList.add("btn");
            bey2Statbtn.classList.add("btn-basic");
            bey2Statbtn.addEventListener("click", function() {
                bey2=dbBey;
                wasBey2Generated = true;
                showBeybladeStats(bey2, 2);
                createWinButtons()
            });
            dbBeySpace.append(bey2Statbtn);

            //edit bey stats in database
            editBeybtn.innerHTML = "Edit Bey Stats";
            editBeybtn.classList.add("btn");
            editBeybtn.classList.add("btn-basic");
            editBeybtn.setAttribute("data-bs-toggle", "modal");
            editBeybtn.setAttribute("data-bs-target", "#editBeyPopup");
            dbBeySpace.append(editBeybtn);

            //show matchup history button
            showMatchupbtn.innerHTML = "Show Matchup History";
            showMatchupbtn.classList.add("btn");
            showMatchupbtn.classList.add("btn-basic");
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

    switch(whichBey){
        case 1:
            beyBladeDBX.get(bey.id, function(err, doc) {
                if(!err){
                    bey1Is.textContent = "BeyBlade 1 is: " + doc.build.name;
                    bey1Stats.textContent = "Weight: " + round(doc.build.weight,2) + " grams.";
                    bey1KO.textContent = "OF Win/Loss: " + doc.build.winsKO + " / " + doc.build.loseKO;
                    bey1SO.textContent = "SF Win/Loss: " + doc.build.winsSO + " / " + doc.build.loseSO;
                    bey1Bst.textContent = "Burst Win/Loss: " + doc.build.winsBst + " / " + doc.build.loseBst;
                    bey1X.textContent = "Xtreme Win/Loss: " + doc.build.winsX + " / " + doc.build.loseX;
                    bey1Draw.textContent = "Draws: " + doc.build.draws;
                }
                if(!err){
                    bey1title.textContent = "BeyBlade 1 is: " + doc.build.name;
                    bey1weight.textContent = round(doc.build.weight,2) + " grams";
                    bey1spin.textContent = doc.build.winsSO + " / " + doc.build.loseSO;
                    bey1over.textContent = doc.build.winsKO + " / " + doc.build.loseKO;
                    bey1burst.textContent = doc.build.winsBst + " / " + doc.build.loseBst;
                    bey1xtreme.textContent = doc.build.winsX + " / " + doc.build.loseX;
                    bey1draws.textContent = ""+ doc.build.draws;
                }
                // else{
                //     console.log(err);
                // }
            });
        break;
        case 2:
            beyBladeDBX.get(bey.id, function(err, doc) {
                if(!err){
                    bey2Is.textContent = "BeyBlade 2 is: " + doc.build.name;
                    bey2Stats.textContent = "Weight: " + round(doc.build.weight,2) + " grams.";
                    bey2KO.textContent = "OF Win/Loss: " + doc.build.winsKO + " / " + doc.build.loseKO;
                    bey2SO.textContent = "SF Win/Loss: " + doc.build.winsSO + " / " + doc.build.loseSO;
                    bey2Bst.textContent = "Burst Win/Loss: " + doc.build.winsBst + " / " + doc.build.loseBst;
                    bey2X.textContent = "Xtreme Win/Loss: " + doc.build.winsX + " / " + doc.build.loseX;
                    bey2Draw.textContent = "Draws: " + doc.build.draws;
                }
                // else{
                //     console.log(err);
                // }
            });
        break;
    }

}

//fill matchup table on main screen when both beys are chosen
function displayRecords(){

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

    var recordID = bey1.id + " " + bey2.id;

    recordsDBX.get(recordID, function(err, doc){
        record1.textContent = bey1.name;
        ko1.textContent = doc.wko;
        so1.textContent = doc.wso;
        bst1.textContent = doc.wbst;
        x1.textContent = doc.wx;
        wins1.textContent = doc.wx + doc.wbst + doc.wko + doc.wso;
        points1.textContent = doc.wx*3 + doc.wbst*2 + doc.wko*2 + doc.wso;

        record2.textContent = bey2.name;
        ko2.textContent = doc.lko;
        so2.textContent = doc.lso;
        bst2.textContent =  doc.lbst;
        x2.textContent =  doc.lx;
        wins2.textContent = doc.lx + doc.lbst + doc.lko + doc.lso;
        points2.textContent = doc.lx*3 + doc.lbst*2 + doc.lko*2 + doc.lso;
        
        draws.textContent = doc.draws;
    });

}

//displays part win/loss records when a user chooses to see them
function showPartStats(partType, partID){
    
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
                partStats.textContent = "Weight: " + round(allBlades[partID].weight,2) + " grams.";
                partKO.textContent = "OF Win/Loss: " + partWko + " / " + partLko;
                partSO.textContent = "SF Win/Loss: " + partWso + " / " + partLso;
                partBst.textContent = "Burst Win/Loss: " + partWbst + " / " + partLbst;
                partX.textContent = "Xtreme Win/Loss: " + partWx + " / " + partLx;
                partDraw.textContent = "Draws: " + partDraw;
            break;
            case "rachet":
                partIs.textContent = allRachets[partID].name;
                partStats.textContent = "Weight: " + round(allRachets[partID].weight,2) + " grams.";
                partKO.textContent = "OF Win/Loss: " + partWko + " / " + partLko;
                partSO.textContent = "SF Win/Loss: " + partWso + " / " + partLso;
                partBst.textContent = "Burst Win/Loss: " + partWbst + " / " + partLbst;
                partX.textContent = "Xtreme Win/Loss: " + partWx + " / " + partLx;
                partDraw.textContent = "Draws: " + partDraw;
            break;
            case "bit":
                partIs.textContent = allBits[partID].name;
                partStats.textContent = "Weight: " + round(allBits[partID].weight,2) + " grams.";
                partKO.textContent = "OF Win/Loss: " + partWko + " / " + partLko;
                partSO.textContent = "SF Win/Loss: " + partWso + " / " + partLso;
                partBst.textContent = "Burst Win/Loss: " + partWbst + " / " + partLbst;
                partX.textContent = "Xtreme Win/Loss: " + partWx + " / " + partLx;
                partDraw.textContent = "Draws: " + partDraw;
            break;
       }

    });

}

//populates the match history popup with selected Beys matchup history
function populateMatchHist(bey){

    recordsDBX.allDocs({include_docs: true, descending: true}, function(err, doc) {

        matchupSpace.textContent = "";
        matchupBey.textContent = "Matchup History for " + bey.name;

        //header row
        var row = matchupSpace.insertRow(0);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        cell1.innerHTML = "Opposing Bey Name";
        cell2.innerHTML = "OF Win/Loss";
        cell3.innerHTML = "SF Win/Loss";
        cell4.innerHTML = "Burst Win/Loss";
        cell5.innerHTML = "Xtreme Win/Loss";
        cell6.innerHTML = "Draws";

        
        
        for(i = 0; i < doc.total_rows; i++){
            if(doc.rows[i].doc.denfender!==undefined) {
                        doc.rows.sort(function(a, b){
                            return (''+b.doc.defender.name).localeCompare(a.doc.defender.name);
                        });
                    }
            if(doc.rows[i].doc.challenger!==undefined) {
                if(!err && bey.id==doc.rows[i].doc.challenger.id){
                    var row = matchupSpace.insertRow(1);
                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);
                    var cell3 = row.insertCell(2);
                    var cell4 = row.insertCell(3);
                    var cell5 = row.insertCell(4);
                    var cell6 = row.insertCell(5);
                    cell1.innerHTML = doc.rows[i].doc.defender.name;
                    cell2.innerHTML = doc.rows[i].doc.wko + "/" + doc.rows[i].doc.lko;
                    cell3.innerHTML = doc.rows[i].doc.wso + "/" + doc.rows[i].doc.lso;
                    cell4.innerHTML = doc.rows[i].doc.wbst + "/" + doc.rows[i].doc.lbst;
                    cell5.innerHTML = doc.rows[i].doc.wx + "/" + doc.rows[i].doc.lx;
                    cell6.innerHTML = doc.rows[i].doc.draws;
                }
            }
            // else if(bey.id!=doc.rows[i].doc.challenger.id) {
            //     console.log("No Matchup History");
            // }
            // else{
            //     console.log(err);
            // }

       }
       
    });
}

//populates the match history popup with selected Beys matchup history
function populateMatchHistUser(blade1, rachet1, bit1, blade2, rachet2, bit2){

    recordsDBX.allDocs({include_docs: true, descending: true}, function(err, doc) {

        matchupHistUser.textContent = "";
        //matchupBeyUser.textContent = "Matchup History for " + allBlades[blade1].name + " " + allRachets[rachet1].abbv + " " + allBits[bit1].abbv;

        //header row
        var row = matchupHistUser.insertRow(0);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        var cell8 = row.insertCell(7);
        cell1.innerHTML = "Selected Bey";
        cell2.innerHTMl = "Vs";
        cell3.innerHTML = "Opposing Bey";
        cell4.innerHTML = "OF Win/Loss";
        cell5.innerHTML = "SF Win/Loss";
        cell6.innerHTML = "Burst Win/Loss";
        cell7.innerHTML = "Xtreme Win/Loss";
        cell8.innerHTML = "Draws";

        if(blade1!="none"){
            const tempWinsBl = [];
            const tempWinsRcht = [];
            const outputWins =[];
            //sort database
            for(i = 0; i < doc.total_rows; i++){
                if(doc.rows[i].doc.defender!=undefined) {
                            doc.rows.sort(function(a, b){
                                return (''+b.doc.defender.name).localeCompare(a.doc.defender.name);
                            });
                        }

                //search logic
                if(doc.rows[i].doc.challenger!=undefined) {
                    if(!err && blade1==doc.rows[i].doc.challenger.blade){
                        tempWinsBl.push(doc.rows[i].doc);
                    }
                }
            }
            if(rachet1!="none"){
                for(i =0; i < tempWinsBl.length; i++){
                    if(tempWinsBl[i].challenger.rachet==rachet1){
                        tempWinsRcht.push(tempWinsBl[i]);
                    }
                }
                if(bit1!="none"){
                    for(i =0; i < tempWinsRcht.length; i++){
                        if(tempWinsRcht[i].challenger.bit==bit1){
                            outputWins.push(tempWinsRcht[i]);
                            
                        }
                    }
                
                    checkSecondSelection(blade2, rachet2, bit2, outputWins);
                }
                //blade and rachet selected
                else{
                    
                    checkSecondSelection(blade2, rachet2, bit2, tempWinsRcht);
                }
            }
            else if(bit1!="none"){
                for(i =0; i < tempWinsBl.length; i++){
                    if(tempWinsBl[i].challenger.bit==bit1){
                        outputWins.push(tempWinsBl[i])
                    }
                }
                console.log("we got to bits");
                checkSecondSelection(blade2, rachet2, bit2, outputWins); 
            }
            else{ 
                checkSecondSelection(blade2, rachet2, bit2, tempWinsBl);         
            }           
        }
        else if(rachet1!="none"){
            const tempWinsRcht = [];
            const outputWins =[];
            for(i = 0; i < doc.total_rows; i++){
                if(doc.rows[i].doc.defender!=undefined) {
                    doc.rows.sort(function(a, b){
                        return (''+b.doc.defender.name).localeCompare(a.doc.defender.name);
                    });
                }

                //search logic
                if(doc.rows[i].doc.challenger!=undefined) {
                    if(!err && rachet1==doc.rows[i].doc.challenger.rachet){
                        tempWinsRcht.push(doc.rows[i].doc);
                    }
                }
            }
            if(bit1!="none"){
                for(i =0; i < tempWinsRcht.length; i++){
                    if(tempWinsRcht[i].challenger.bit==bit1){
                        outputWins.push(tempWinsRcht[i]);
                    }
                }
                checkSecondSelection(blade2, rachet2, bit2, outputWins);
            }
            
            else{
                checkSecondSelection(blade2, rachet2, bit2, tempWinsRcht);
            }
        }
        else if(bit1!="none"){
            const outputWins =[];
            for(i = 0; i < doc.total_rows; i++){
                if(doc.rows[i].doc.defender!=undefined) {
                    doc.rows.sort(function(a, b){
                        return (''+b.doc.defender.name).localeCompare(a.doc.defender.name);
                    });
                }

                //search logic
                if(doc.rows[i].doc.challenger!=undefined) {
                    if(!err && bit1==doc.rows[i].doc.challenger.bit){
                        outputWins.push(doc.rows[i].doc);
                    }
                }
            }
            checkSecondSelection(blade2, rachet2, bit2, outputWins);
        }
    });
}

function checkSecondSelection(blade, rachet, bit, history){
    const tempWinsBl = [];
    const tempWinsRcht = [];
    const outputWins = [];

    if(blade!="none"){

        for(i =0; i < history.length; i++){
            if(history[i].defender!=undefined) {
                if(blade==history[i].defender.blade){
                    tempWinsBl.push(history[i]);
                }
            }
        }

        if(rachet!="none"){
            for(i =0; i < tempWinsBl.length; i++){
                if(tempWinsBl[i].defender.rachet==rachet){
                    tempWinsRcht.push(tempWinsBl[i]);
                }
            }
            if(bit!="none"){
                for(i =0; i < tempWinsRcht.length; i++){
                    if(tempWinsRcht[i].defender.bit==bit){
                        fillMatchupHist(tempWinsRcht[i]);
                    }
                }
            }

            else{
                for(i =0; i < tempWinsRcht.length; i++){
                    fillMatchupHist(tempWinsRcht[i]);
                }
            }
        } 
        //need else if for bits here, both functions.
        else if(bit!="none"){
            for(i = 0; i < tempWinsBl.length; i++){
                if(tempWinsBl[i].defender.bit==bit){
                    fillMatchupHist(tempWinsBl[i]);
                }
            }
        }
        else{
            for(i =0; i < tempWinsBl.length; i++){
                fillMatchupHist(tempWinsBl[i]);
            }           
        }           
    }
    else if(rachet!="none"){
        //search logic
        for(i =0; i < history.length; i++){
            if(history[i].defender!=undefined) {
                if(rachet==history[i].defender.rachet){
                    console.log("we got to bey 2 rachets")
                    tempWinsRcht.push(history[i]);
                }
            }
        }
        
        if(bit!="none"){
            for(i =0; i < tempWinsRcht.length; i++){
                if(tempWinsRcht[i].defender.bit==bit){
                    fillMatchupHist(tempWinsRcht[i]);
                }
            }
        }
        else{
            for(i=0; i < tempWinsRcht.length; i++){
                fillMatchupHist(tempWinsRcht[i]);
            }
        }
    }
    else if(bit!="none"){
        
        //search logic
        for(i =0; i < history.length; i++){
            if(history[i].defender!=undefined) {
                if(bit==history[i].defender.bit){
                    fillMatchupHist(history[i]);
                }
            }
            else{
                fillMatchupHist(history[i]);
            }
        }
        
    }
    else{
        for(i = 0; i < history.length; i++){
            if(history[i].defender!=undefined) {
                fillMatchupHist(history[i]);
            }
        }
    }

}

function fillMatchupHist(history){
    
    var row = matchupHistUser.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);
    var cell8 = row.insertCell(7);
    cell1.innerHTML = history.challenger.name;
    cell2.innerHTML = " ";
    cell3.innerHTML = history.defender.name;
    cell4.innerHTML = history.wko + "/" + history.lko;
    cell5.innerHTML = history.wso + "/" + history.lso;
    cell6.innerHTML = history.wbst + "/" + history.lbst;
    cell7.innerHTML = history.wx + "/" + history.lx;
    cell8.innerHTML = history.draws;
}

//delete a bey from the system
function deleteBey(){

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
            // else{
            //     console.log(err);
            // }
       }
    });

}

//turns out JavaScript doesn't have a random number function that just gives an int
function getRandomInt(max) {

    return Math.floor(Math.random() * max);

};

//JS math functions suck
function round(num, places) {
    var multiplier = Math.pow(10, places);
    return Math.round(num * multiplier) / multiplier;
}

//run main on startup
main();