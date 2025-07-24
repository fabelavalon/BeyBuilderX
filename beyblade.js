/*==========================================================*
 * BeyBuilder v1.3 for Beyblade X                           *
 * Author: Fabel                                            *
 * Copyright 2023-2025                                      *
 *==========================================================*/

var allBlades = blades;
var allRachets = rachets;
var allBits = bits;

class BeyBlade {

    bitChip = -1; 
    blade = -1;
    assist = -1; 
    rachet = -1;
    bit = -1;
    id = ""; // DB index, a string
    name = "";
    weight = 0;
    height = 0;
    spin = "invalid";
    system = "invalid"; 
    totalWins = 0;
    winsKO = 0;
    winsSO = 0;
    winsBst = 0;
    winsX = 0;
    totalLosses = 0;
    loseKO = 0;
    loseSO = 0;
    loseBst = 0;
    loseX = 0;
    draws = 0;
    totalMatches = 0;

    constructor(bitChip, blade, assist, rachet, bit){
        // console.log("building bey");
        this.bitChip = bitChip; 
        this.blade = blade;
        this.assist = assist; 
        this.rachet = rachet;
        this.bit = bit;
        this.system = allBlades[this.blade].system; 

        // start weight. Add more later depending on parts selected
        this.weight = allBlades[this.blade].weight + allBits[this.bit].weight;

        if(allBits[this.bit].type == "ratchetBit") { // combo bit and ratchet
            this.rachet = -1;
        } else { // regular ratchet
            this.weight += allRachets[this.rachet].weight;
        }

        if(this.system == "CX") {
            this.weight += allBitChips[this.bitChip].weight + allAssists[this.assist].weight;
        } else { // BX or UX
            this.bitChip = -1;
            this.assist = -1;
        }

        this.id = this.getDbId();
        this.findName();
        this.findSpin();
    }


    //are these necessary?
    getBlade(){
        return this.blade;
    }
    getRachet(){
        return this.rachet;
    }
    getBit(){
        return this.bit;
    }
    getName(){
        return this.name;
    }
    getId(){
        return this.id;
    }
    getWeight(){
        return this.weight;
    }
    getSpin(){
        return this.spin;
    }
    getDBid(){
        return this.id;
    }
    getTotalWin(){
        this.totalWins =  this.winsBst + this.winsKO + this.winsSO + this.winsX;
        return this.totalWins;
    }
    getTotalLoss(){
        this.totalLosses = this.loseBst + this.loseKO + this.loseSO + this.loseX;
        return this.totalLosses;
    }
    getTotalMatch(){
        this.totalMatches =  this.totalWins + this.totalLosses + this.draws;
        return this.totalMatches;
    }
    findSpin(){
        this.spin = allBlades[this.blade].spin;
    }

    findName(){
        var ratchetNameInclSpaces = " ";
        if(this.rachet>-1) {
            // regular ratchet
            ratchetNameInclSpaces += allRachets[this.rachet].name + " ";
        }

        if((this.system == "BX") || (this.system == "UX")){
            this.name = allBlades[this.blade].name + ratchetNameInclSpaces + allBits[this.bit].name;
        }
        else if(this.system == "CX"){
            this.name = allBitChips[this.bitChip].name + allBlades[this.blade].name + " " + allAssists[this.assist].name + ratchetNameInclSpaces + allBits[this.bit].name;
        }
    }

    getDbId(){
        return ( this.system=="CX" ? allBitChips[this.bitChip].id + " " : "" ) +
                    allBlades[this.blade].id + " " +
                    ( this.system=="CX" ? allAssists[this.assist].id + " " : "" ) +
                    ( this.rachet==-1 ? "" : allRachets[this.rachet].id + " " ) +
                    allBits[this.bit].id ;
    }

}