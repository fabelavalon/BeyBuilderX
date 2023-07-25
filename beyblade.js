/*==========================================================*
 * BeyBuilder v1.1 for Beyblade X                           *
 * Author: Fabel                                            *
 * Copyright 2023                                           *
 *==========================================================*/

var allBlades = blades;
var allRachets = rachets;
var allBits = bits;

class BeyBlade {

    blade = -1;
    rachet = -1;
    bit = -1;
    id = "";
    name = "";
    weight = 0;
    height = 0;
    spin = "invalid";
    winsKO = 0;
    winsSO = 0;
    winsBst = 0;
    winsX = 0;
    loseKO = 0;
    loseSO = 0;
    loseBst = 0;
    loseX = 0;
    draws = 0;

    constructor(blade, rachet, bit){

        this.blade = blade;
        this.rachet = rachet;
        this.bit = bit;
        this.weight = allBlades[this.blade].weight + allRachets[this.rachet].weight + allBits[this.bit].weight;
        this.id = allBlades[this.blade].id + " " + allRachets[this.rachet].id + " " + allBits[this.bit].id;
        
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

    findSpin(){
        this.spin = allBlades[this.blade].spin;
    }

    findName(){
        this.name = allBlades[this.blade].name + " " + allRachets[this.rachet].abbv + allBits[this.bit].abbv;
    }

}