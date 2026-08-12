/*==========================================================*
 * BeyBuilder v1.3 for Beyblade X                           *
 * Author: Fabel                                            *
 * Copyright 2023-2026                                      *
 *==========================================================*/

var allBlades = blades;
var allRachets = rachets;
var allBits = bits;

class BeyBlade {

    bitChip = -1;
    over = -1; 
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

    constructor(bitChip, over, blade, assist, rachet, bit){
        /*
        console.log("building bey with parts: " +
                    "bitChip: " + bitChip + ", " +
                    "over: " + over + ", " +
                    "blade: " + blade + ", " +
                    "assist: " + assist + ", " +
                    "rachet: " + rachet + ", " +
                    "bit: " + bit
                );
        */

        this.bitChip = bitChip;
        this.over = over;
        this.blade = blade;
        this.assist = assist; 
        this.rachet = rachet;
        this.bit = bit;
        this.system = allBlades[this.blade].system;

        // start weight. Add more later depending on parts selected
        this.weight = allBlades[this.blade].weight + allBits[this.bit].weight;

        if(allBits[this.bit].type == "ratchetBit" || allBlades[this.blade].system == "UX2") { // combo bit and ratchet or combo blade ratchet
            console.log("disabling ratchets")
            this.rachet = -1;
        }
        
        if (this.rachet != -1) {
            // regular ratchet
            this.weight += allRachets[this.rachet].weight;
        }

        if(this.system == "CX") {
            this.weight += allBitChips[this.bitChip].weight + allAssists[this.assist].weight;
        } else if(this.system == "CX2") {
            this.weight += allBitChips[this.bitChip].weight + allOverBlades[this.over].weight + allAssists[this.assist].weight;
        } else { // BX or UX
            this.bitChip = -1;
            this.over = -1;
            this.assist = -1;
        }

        this.id = this.getDbId();
        this.name = this.findName();
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
        this.totalMatches =  this.getTotalWin() + this.getTotalLoss() + this.draws;
        return this.totalMatches;
    }
    findSpin(){
        this.spin = allBlades[this.blade].spin;
    }

    /**
     * generate full beyblade name, blade ratchet bit
     * @param {boolean} includeHtml - generate <span> tags to help style and line-break
     * @returns name
     */
    findName( includeHtml=false ){
        var newName = "";


        var span1 = "";
        var span2 = "";
        var spanClose = "";
        if (includeHtml) {
            span1 = `<span class="blade-text">`; // start
            span2 = `</span><span class="blade-text">&nbsp;`; // split text at the ratchet
            spanClose = `</span>`; // end
        }

        var ratchetNameInclSpaces = includeHtml ? "" : " ";
        if(this.rachet>-1) {
            // regular ratchet
            ratchetNameInclSpaces += allRachets[this.rachet].name + " ";
        }

        if((this.system == "BX") || (this.system == "UX")){
            newName = span1 + allBlades[this.blade].name + span2 + ratchetNameInclSpaces + allBits[this.bit].name + spanClose;
        }
        else if(this.system == "UX2"){
            newName = span1 + allBlades[this.blade].name + " " + allBits[this.bit].name + spanClose;
        }
        else if(this.system == "CX"){
            newName = span1 + allBitChips[this.bitChip].name + allBlades[this.blade].name + " " + allAssists[this.assist].name + span2 + ratchetNameInclSpaces + allBits[this.bit].name +spanClose;
        }
        else if(this.system == "CX2"){
            newName = span1 + allBitChips[this.bitChip].name + allBlades[this.blade].name + " " + allOverBlades[this.over].name + " " + allAssists[this.assist].name + span2 + ratchetNameInclSpaces + allBits[this.bit].name + spanClose;
        }

        return newName;
    }

    // construct beyblade ID string
    getDbId(){
        return ( (this.system=="CX" || this.system=="CX2") ? allBitChips[this.bitChip].id + " " : "" ) + // if CX, add bitChip name + space
                    ( this.system=="CX2" ? allOverBlades[this.over].id + " " : "" ) + // if CX2, add overBlade name + space
                    allBlades[this.blade].id + " " +
                    ( (this.system=="CX" || this.system=="CX2") ? allAssists[this.assist].id + " " : "" ) + // if CX, add assistBlade name + space
                    ( this.rachet==-1 ? "" : allRachets[this.rachet].id + " " ) + // if no ratchet, blank, else ratchet name + space
                    allBits[this.bit].id ;
    }

}