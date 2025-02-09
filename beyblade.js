/*==========================================================*
 * BeyBuilder v1.1 for Beyblade X                           *
 * Author: Fabel                                            *
 * Copyright 2023-2025                                      *
 *==========================================================*/

var allBlades = blades;
var allRachets = rachets;
var allBits = bits;

class BeyBlade {

    bitChip = -1; //new
    blade = -1;
    assist = -1; //new
    rachet = -1;
    bit = -1;
    id = "";
    name = "";
    weight = 0;
    height = 0;
    spin = "invalid";
    system = "invalid"; //new
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
        this.bitChip = bitChip; //new
        this.blade = blade;
        this.assist = assist; //new
        this.rachet = rachet;
        this.bit = bit;
        this.system = allBlades[this.blade].system; //new

        if((this.system == "BX") || (this.system == "UX")){
            this.bitChip = -1;
            this.assist = -1;
            this.weight = allBlades[this.blade].weight + allRachets[this.rachet].weight + allBits[this.bit].weight;
            this.id = allBlades[this.blade].id + " " + allRachets[this.rachet].id + " " + allBits[this.bit].id;
        }
        else if(this.system == "CX"){
            this.weight = allBitChips[this.bitChip].weight + allBlades[this.blade].weight + allAssists[this.assist].weight + allRachets[this.rachet].weight + allBits[this.bit].weight;
            this.id = allBitChips[this.bitChip].id + " " + allBlades[this.blade].id + " " + allAssists[this.assist].id + " " + allRachets[this.rachet].id + " " + allBits[this.bit].id;
        }
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
        if((this.system == "BX") || (this.system == "UX")){
            this.name = allBlades[this.blade].name + " " + allRachets[this.rachet].name + " " + allBits[this.bit].name;
        }
        else if(this.system == "CX"){
            this.name = allBitChips[this.bitChip].name + " " + allBlades[this.blade].name + " " + allAssists[this.assist].name + " " + allRachets[this.rachet].name + " " + allBits[this.bit].name;
        }
    }

}