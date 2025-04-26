/*==========================================================*
 * BeyBuilder v1.3 for Beyblade X                           *
 * Author: Fabel                                            *
 * Copyright 2023-2025                                      *
 *==========================================================*/

//0 weight means no weight data yet, same for height

var bitChips = [ 

    {"name":"Dran",    "spin":"right", "system":"CX", "type":"standard", "weight":1.73, "height":0, "abbv":"Dr", "wins":0, "losses":0, "draws":0, "id":0},
    {"name":"Wizard",  "spin":"right", "system":"CX", "type":"standard", "weight":1.73, "height":0, "abbv":"Wz", "wins":0, "losses":0, "draws":0, "id":1},
    {"name":"Perseus", "spin":"right", "system":"CX", "type":"standard", "weight":1.73, "height":0, "abbv":"Pr", "wins":0, "losses":0, "draws":0, "id":2},
    {"name":"Hells",   "spin":"right", "system":"CX", "type":"standard", "weight":1.73, "height":0, "abbv":"Hl", "wins":0, "losses":0, "draws":0, "id":3},
    {"name":"Rhino",   "spin":"right", "system":"CX", "type":"standard", "weight":1.73, "height":0, "abbv":"Rh", "wins":0, "losses":0, "draws":0, "id":4}//,
    //{"name":"Fox",     "spin":"right", "system":"CX", "type":"standard", "weight":1.73, "height":0, "abbv":"Fx", "wins":0, "losses":0, "draws":0, "id":5}

];

var blades = [
  
    {"name":"CobaltDrake",       "spin":"right", "system":"BX", "weight":36.80, "height":0, "abbv":"CbDr", "wins":0, "losses":0, "draws":0, "id":0},
    {"name":"DranSword",         "spin":"right", "system":"BX", "weight":34.97, "height":0, "abbv":"DrSw", "wins":0, "losses":0, "draws":0, "id":1},
    {"name":"HellsScythe",       "spin":"right", "system":"BX", "weight":32.94, "height":0, "abbv":"HlSc", "wins":0, "losses":0, "draws":0, "id":2},
    {"name":"KnightShield",      "spin":"right", "system":"BX", "weight":32.70, "height":0, "abbv":"KnSh", "wins":0, "losses":0, "draws":0, "id":3},
    {"name":"WizardArrow",       "spin":"right", "system":"BX", "weight":31.86, "height":0, "abbv":"WzAr", "wins":0, "losses":0, "draws":0, "id":4},
    {"name":"DranzerSpiral",     "spin":"right", "system":"BX", "weight":27.82, "height":0, "abbv":"DrSp", "wins":0, "losses":0, "draws":0, "id":5},
    {"name":"KnightLance",       "spin":"right", "system":"BX", "weight":33.25, "height":0, "abbv":"KnLn", "wins":0, "losses":0, "draws":0, "id":6},
    {"name":"SharkEdge",         "spin":"right", "system":"BX", "weight":34.60, "height":0, "abbv":"ShEd", "wins":0, "losses":0, "draws":0, "id":7},
    {"name":"LeonClaw",          "spin":"right", "system":"BX", "weight":31.40, "height":0, "abbv":"LnCl", "wins":0, "losses":0, "draws":0, "id":8},
    {"name":"ViperTail",         "spin":"right", "system":"BX", "weight":34.55, "height":0, "abbv":"VpTl", "wins":0, "losses":0, "draws":0, "id":9},
    {"name":"DranDagger",        "spin":"right", "system":"BX", "weight":34.91, "height":0, "abbv":"DrDg", "wins":0, "losses":0, "draws":0, "id":10},
    {"name":"HellsChain",        "spin":"right", "system":"BX", "weight":33.33, "height":0, "abbv":"HlCh", "wins":0, "losses":0, "draws":0, "id":11},
    {"name":"RhinoHorn",         "spin":"right", "system":"BX", "weight":32.82, "height":0, "abbv":"RhHr", "wins":0, "losses":0, "draws":0, "id":12},
    {"name":"PhoenixFeather",    "spin":"right", "system":"BX", "weight":33.33, "height":0, "abbv":"PhFt", "wins":0, "losses":0, "draws":0, "id":13},
    {"name":"PhoenixWing",       "spin":"right", "system":"BX", "weight":38.00, "height":0, "abbv":"PhWn", "wins":0, "losses":0, "draws":0, "id":14},
    {"name":"WyvernGale",        "spin":"right", "system":"BX", "weight":32.10, "height":0, "abbv":"WvGl", "wins":0, "losses":0, "draws":0, "id":15},
    {"name":"UnicornSting",      "spin":"right", "system":"BX", "weight":33.38, "height":0, "abbv":"UnSt", "wins":0, "losses":0, "draws":0, "id":16},
    {"name":"SphinxCowl",        "spin":"right", "system":"BX", "weight":32.80, "height":0, "abbv":"SpCw", "wins":0, "losses":0, "draws":0, "id":17},
    {"name":"DranBuster",        "spin":"right", "system":"UX", "weight":36.32, "height":0, "abbv":"DrBs", "wins":0, "losses":0, "draws":0, "id":18},
    {"name":"HellsHammer",       "spin":"right", "system":"UX", "weight":33.20, "height":0, "abbv":"HlHm", "wins":0, "losses":0, "draws":0, "id":19},
    {"name":"WizardRod",         "spin":"right", "system":"UX", "weight":35.35, "height":0, "abbv":"WzRd", "wins":0, "losses":0, "draws":0, "id":20},
    {"name":"DrigerSlash",       "spin":"right", "system":"BX", "weight":28.50, "height":0, "abbv":"DrSl", "wins":0, "losses":0, "draws":0, "id":21},
    {"name":"TyrannoBeat",       "spin":"right", "system":"BX", "weight":36.90, "height":0, "abbv":"TrBt", "wins":0, "losses":0, "draws":0, "id":22},
    {"name":"ShinobiShadow",     "spin":"right", "system":"UX", "weight":28.23, "height":0, "abbv":"ShSh", "wins":0, "losses":0, "draws":0, "id":23},
    {"name":"MammothTusk",       "spin":"right", "system":"BX", "weight":32.10, "height":0, "abbv":"MmTs", "wins":0, "losses":0, "draws":0, "id":24},
    {"name":"ShinobiKnife",      "spin":"right", "system":"BX", "weight":30.90, "height":0, "abbv":"ShKf", "wins":0, "losses":0, "draws":0, "id":25},
    {"name":"PteraSwing",        "spin":"right", "system":"BX", "weight":34.25, "height":0, "abbv":"PtSw", "wins":0, "losses":0, "draws":0, "id":26},
    {"name":"Steel Samurai",     "spin":"right", "system":"BX", "weight":31.08, "height":0, "abbv":"StSa", "wins":0, "losses":0, "draws":0, "id":27},
    {"name":"WeissTiger",        "spin":"right", "system":"BX", "weight":34.83, "height":0, "abbv":"WsTg", "wins":0, "losses":0, "draws":0, "id":28},
    {"name":"CobaltDragoon",     "spin":"left",  "system":"BX", "weight":37.80, "height":0, "abbv":"CbDg", "wins":0, "losses":0, "draws":0, "id":29},
    {"name":"BlackShell",        "spin":"right", "system":"BX", "weight":32.43, "height":0, "abbv":"BlSh", "wins":0, "losses":0, "draws":0, "id":30},
    {"name":"Optimus Prime",     "spin":"right", "system":"BX", "weight":31.75, "height":0, "abbv":"OpPr", "wins":0, "losses":0, "draws":0, "id":31},
    {"name":"Starscream",        "spin":"right", "system":"BX", "weight":29.81, "height":0, "abbv":"St",   "wins":0, "losses":0, "draws":0, "id":32},
    {"name":"Optimus Primal",    "spin":"right", "system":"BX", "weight":32.43, "height":0, "abbv":"OpPl", "wins":0, "losses":0, "draws":0, "id":33},
    {"name":"Megatron",          "spin":"right", "system":"BX", "weight":31.50, "height":0, "abbv":"Mt",   "wins":0, "losses":0, "draws":0, "id":34},
    {"name":"AeroPegasus",       "spin":"right", "system":"UX", "weight":38.00, "height":0, "abbv":"ArPg", "wins":0, "losses":0, "draws":0, "id":35},
    {"name":"LeonCrest",         "spin":"right", "system":"UX", "weight":34.82, "height":0, "abbv":"LnCr", "wins":0, "losses":0, "draws":0, "id":36},
    {"name":"PhoenixRudder",     "spin":"right", "system":"UX", "weight":34.68, "height":0, "abbv":"PhRd", "wins":0, "losses":0, "draws":0, "id":37},
    {"name":"CrocCrunch",        "spin":"right", "system":"BX", "weight":34.05, "height":0, "abbv":"CrCr", "wins":0, "losses":0, "draws":0, "id":38},
    {"name":"Yell Kong",         "spin":"right", "system":"BX", "weight":31.24, "height":0, "abbv":"YlKn", "wins":0, "losses":0, "draws":0, "id":39},
    {"name":"Iron Man",          "spin":"right", "system":"BX", "weight":32.07, "height":0, "abbv":"IrMn", "wins":0, "losses":0, "draws":0, "id":40},
    {"name":"Thanos",            "spin":"right", "system":"BX", "weight":29.32, "height":0, "abbv":"Th",   "wins":0, "losses":0, "draws":0, "id":41},
    {"name":"Spider-man",        "spin":"right", "system":"BX", "weight":33.06, "height":0, "abbv":"SpMn", "wins":0, "losses":0, "draws":0, "id":42},
    {"name":"Venom",             "spin":"right", "system":"BX", "weight":34.56, "height":0, "abbv":"Vn",   "wins":0, "losses":0, "draws":0, "id":43},
    {"name":"Luke Skywalker",    "spin":"right", "system":"BX", "weight":30.19, "height":0, "abbv":"LkSk", "wins":0, "losses":0, "draws":0, "id":44},
    {"name":"Darth Vader",       "spin":"right", "system":"BX", "weight":30.40, "height":0, "abbv":"DrVd", "wins":0, "losses":0, "draws":0, "id":45},
    {"name":"Moff Gideon",       "spin":"right", "system":"BX", "weight":30.59, "height":0, "abbv":"MgGd", "wins":0, "losses":0, "draws":0, "id":46},
    {"name":"The Mandalorian",   "spin":"right", "system":"BX", "weight":30.88, "height":0, "abbv":"ThMn", "wins":0, "losses":0, "draws":0, "id":47},
    {"name":"WhaleWave",         "spin":"right", "system":"BX", "weight":38.15, "height":0, "abbv":"WhWv", "wins":0, "losses":0, "draws":0, "id":48},
    {"name":"L-Drago:Upper",     "spin":"left",  "system":"BX", "weight":33.85, "height":0, "abbv":"LLDU", "wins":0, "losses":0, "draws":0, "id":49},
    {"name":"L-Drago:Rapid Hit", "spin":"left",  "system":"BX", "weight":33.22, "height":0, "abbv":"LLDR", "wins":0, "losses":0, "draws":0, "id":50},
    {"name":"Savage Bear",       "spin":"right", "system":"BX", "weight":29.74, "height":0, "abbv":"SvBr", "wins":0, "losses":0, "draws":0, "id":51},
    {"name":"Roar Tyranno",      "spin":"right", "system":"BX", "weight":35.97, "height":0, "abbv":"RrTn", "wins":0, "losses":0, "draws":0, "id":52},
    {"name":"SilverWolf",        "spin":"right", "system":"UX", "weight":36.83, "height":0, "abbv":"SlWl", "wins":0, "losses":0, "draws":0, "id":53},
    {"name":"CrimsonGaruda",     "spin":"right", "system":"BX", "weight":34.90, "height":0, "abbv":"CrGr", "wins":0, "losses":0, "draws":0, "id":54},
    {"name":"SamuraiSaber",      "spin":"right", "system":"UX", "weight":36.41, "height":0, "abbv":"Smba", "wins":0, "losses":0, "draws":0, "id":55},
    {"name":"KnightMail",        "spin":"right", "system":"UX", "weight":36.61, "height":0, "abbv":"KnMl", "wins":0, "losses":0, "draws":0, "id":56},
    {"name":"DracielShield",     "spin":"right", "system":"BX", "weight":28.15, "height":0, "abbv":"DcSh", "wins":0, "losses":0, "draws":0, "id":57},
    {"name":"ImpactDrake",       "spin":"right", "system":"UX", "weight":38.85, "height":0, "abbv":"ImDr", "wins":0, "losses":0, "draws":0, "id":58},
    {"name":"GhostCircle",       "spin":"right", "system":"UX", "weight":26.71, "height":0, "abbv":"GhCr", "wins":0, "losses":0, "draws":0, "id":59},
    {"name":"GolemRock",         "spin":"right", "system":"UX", "weight":34.00, "height":0, "abbv":"GlRc", "wins":0, "losses":0, "draws":0, "id":60},
    {"name":"ShelterDrake",      "spin":"right", "system":"BX", "weight":32.65, "height":0, "abbv":"ShDr", "wins":0, "losses":0, "draws":0, "id":61},
    {"name":"DragoonStorm",      "spin":"left",  "system":"BX", "weight":25.35, "height":0, "abbv":"DrSt", "wins":0, "losses":0, "draws":0, "id":62},
    {"name":"StormPegasis",      "spin":"right", "system":"BX", "weight":30.75, "height":0, "abbv":"StPg", "wins":0, "losses":0, "draws":0, "id":63},
    {"name":"VictoryValkyrie",   "spin":"right", "system":"BX", "weight":33.05, "height":0, "abbv":"VcVl", "wins":0, "losses":0, "draws":0, "id":64},
    {"name":"XenoXcalibur",      "spin":"right", "system":"BX", "weight":30.95, "height":0, "abbv":"XnXc", "wins":0, "losses":0, "draws":0, "id":65},
    {"name":"Brave",             "spin":"right", "system":"CX", "weight":31.06, "height":0, "abbv":"Br",   "wins":0, "losses":0, "draws":0, "id":66},
    {"name":"Arc",               "spin":"right", "system":"CX", "weight":29.25, "height":0, "abbv":"Ar",   "wins":0, "losses":0, "draws":0, "id":67},
    {"name":"Dark",              "spin":"right", "system":"CX", "weight":30.50, "height":0, "abbv":"Dr",   "wins":0, "losses":0, "draws":0, "id":68},
    {"name":"Reaper",            "spin":"right", "system":"CX", "weight":29.05, "height":0, "abbv":"Rp",   "wins":0, "losses":0, "draws":0, "id":69},
    {"name":"ScorpioSpear",      "spin":"right", "system":"UX", "weight":39.60, "height":0, "abbv":"ScSp", "wins":0, "losses":0, "draws":0, "id":70}//,
    //{"name":"Brush",             "spin":"right", "system":"CX", "weight":0.00, "height":0, "abbv":"Br",   "wins":0, "losses":0, "draws":0, "id":71}
    
];

var assistBlades = [

    {"name":"Slash",  "spin":"right", "system":"CX", "weight":4.71, "height":0, "abbv":"S",   "wins":0, "losses":0, "draws":0, "id":0},
    {"name":"Round",  "spin":"right", "system":"CX", "weight":4.64, "height":0, "abbv":"R",   "wins":0, "losses":0, "draws":0, "id":1},
    {"name":"Bumper", "spin":"right", "system":"CX", "weight":5.31, "height":0, "abbv":"B",   "wins":0, "losses":0, "draws":0, "id":2},
    {"name":"Turn-A", "spin":"right", "system":"CX", "weight":5.85, "height":0, "abbv":"T:A", "wins":0, "losses":0, "draws":0, "id":3},
    {"name":"Turn-D", "spin":"right", "system":"CX", "weight":5.85, "height":0, "abbv":"T:D", "wins":0, "losses":0, "draws":0, "id":4},
    {"name":"Charge", "spin":"right", "system":"CX", "weight":5.05, "height":0, "abbv":"C",   "wins":0, "losses":0, "draws":0, "id":5}//,
    //{"name":"Jaggy",  "spin":"right", "system":"CX", "weight":0.00, "height":0, "abbv":"J", "wins":0, "losses":0, "draws":0, "id":6}
    
 ];

var rachets = [

    {"name":"3-60", "weight":6.32, "height":6,   "abbv":"3-60", "wins":0, "losses":0, "draws":0, "id":0},
    {"name":"3-80", "weight":7.10, "height":8,   "abbv":"3-80", "wins":0, "losses":0, "draws":0, "id":1},
    {"name":"4-60", "weight":6.30, "height":6,   "abbv":"4-60", "wins":0, "losses":0, "draws":0, "id":2},
    {"name":"4-80", "weight":7.00, "height":8,   "abbv":"4-80", "wins":0, "losses":0, "draws":0, "id":3},
    {"name":"5-60", "weight":6.60, "height":6,   "abbv":"5-60", "wins":0, "losses":0, "draws":0, "id":4},
    {"name":"5-80", "weight":7.15, "height":8,   "abbv":"5-80", "wins":0, "losses":0, "draws":0, "id":5},
    {"name":"9-60", "weight":6.19, "height":6,   "abbv":"9-60", "wins":0, "losses":0, "draws":0, "id":6},
    {"name":"9-80", "weight":6.80, "height":8,   "abbv":"9-80", "wins":0, "losses":0, "draws":0, "id":7},
    {"name":"1-60", "weight":6.06, "height":6,   "abbv":"1-60", "wins":0, "losses":0, "draws":0, "id":8},
    {"name":"3-70", "weight":6.42, "height":7,   "abbv":"3-70", "wins":0, "losses":0, "draws":0, "id":9},
    {"name":"5-70", "weight":6.70, "height":7,   "abbv":"5-70", "wins":0, "losses":0, "draws":0, "id":10},
    {"name":"4-70", "weight":6.50, "height":7,   "abbv":"4-70", "wins":0, "losses":0, "draws":0, "id":11},
    {"name":"1-80", "weight":6.72, "height":8,   "abbv":"1-80", "wins":0, "losses":0, "draws":0, "id":12},
    {"name":"2-60", "weight":6.20, "height":6,   "abbv":"2-60", "wins":0, "losses":0, "draws":0, "id":13},
    {"name":"2-80", "weight":6.90, "height":8,   "abbv":"2-80", "wins":0, "losses":0, "draws":0, "id":14},
    {"name":"7-60", "weight":7.12, "height":6,   "abbv":"7-60", "wins":0, "losses":0, "draws":0, "id":15},
    {"name":"9-70", "weight":6.32, "height":7,   "abbv":"9-70", "wins":0, "losses":0, "draws":0, "id":16},
    {"name":"2-70", "weight":6.34, "height":7,   "abbv":"2-70", "wins":0, "losses":0, "draws":0, "id":17},
    {"name":"3-85", "weight":4.79, "height":8.5, "abbv":"3-85", "wins":0, "losses":0, "draws":0, "id":18},
    {"name":"7-70", "weight":7.24, "height":7,   "abbv":"7-70", "wins":0, "losses":0, "draws":0, "id":19},
    {"name":"0-80", "weight":7.53, "height":8,   "abbv":"0-80", "wins":0, "losses":0, "draws":0, "id":20},
    {"name":"7-80", "weight":7.82, "height":8,   "abbv":"7-80", "wins":0, "losses":0, "draws":0, "id":21},
    {"name":"6-60", "weight":6.13, "height":6,   "abbv":"6-60", "wins":0, "losses":0, "draws":0, "id":22},
    {"name":"6-80", "weight":6.91, "height":8,   "abbv":"6-80", "wins":0, "losses":0, "draws":0, "id":23},
    {"name":"4-55", "weight":4.78, "height":5.5, "abbv":"4-55", "wins":0, "losses":0, "draws":0, "id":24},
    {"name":"0-70", "weight":7.02, "height":7,   "abbv":"0-70", "wins":0, "losses":0, "draws":0, "id":25}
];

var bits = [

    {"name":"Ball",         "weight":2.10, "height":2, "abbv":"B",  "wins":0, "losses":0, "draws":0, "id":0},
    {"name":"Flat",         "weight":2.28, "height":2, "abbv":"F",  "wins":0, "losses":0, "draws":0, "id":1},
    {"name":"Needle",       "weight":2.03, "height":2, "abbv":"N",  "wins":0, "losses":0, "draws":0, "id":2},
    {"name":"Taper",        "weight":2.19, "height":2, "abbv":"T",  "wins":0, "losses":0, "draws":0, "id":3},
    {"name":"High Needle",  "weight":2.17, "height":3, "abbv":"HN", "wins":0, "losses":0, "draws":0, "id":4},
    {"name":"Low Flat",     "weight":2.15, "height":1, "abbv":"LF", "wins":0, "losses":0, "draws":0, "id":5},
    {"name":"Point",        "weight":2.20, "height":2, "abbv":"P",  "wins":0, "losses":0, "draws":0, "id":6},
    {"name":"Orb",          "weight":2.02, "height":2, "abbv":"O",  "wins":0, "losses":0, "draws":0, "id":7},
    {"name":"Rush",         "weight":2.02, "height":2, "abbv":"R",  "wins":0, "losses":0, "draws":0, "id":8},
    {"name":"High Taper",   "weight":2.22, "height":3, "abbv":"HT", "wins":0, "losses":0, "draws":0, "id":9},
    {"name":"Spike",        "weight":2.02, "height":2, "abbv":"S",  "wins":0, "losses":0, "draws":0, "id":10},
    {"name":"Gear Flat",    "weight":2.28, "height":2, "abbv":"GF", "wins":0, "losses":0, "draws":0, "id":11},
    {"name":"Gear Ball",    "weight":2.08, "height":2, "abbv":"GB", "wins":0, "losses":0, "draws":0, "id":12},
    {"name":"Gear Point",   "weight":2.25, "height":2, "abbv":"GP", "wins":0, "losses":0, "draws":0, "id":13},
    {"name":"Gear Needle",  "weight":2.00, "height":2, "abbv":"GN", "wins":0, "losses":0, "draws":0, "id":14},
    {"name":"Accel",        "weight":2.58, "height":2, "abbv":"A",  "wins":0, "losses":0, "draws":0, "id":15},
    {"name":"Hexa",         "weight":2.58, "height":2, "abbv":"H",  "wins":0, "losses":0, "draws":0, "id":16},
    {"name":"Disc Ball",    "weight":3.23, "height":4, "abbv":"DB", "wins":0, "losses":0, "draws":0, "id":17},
    {"name":"Quake",        "weight":2.17, "height":2, "abbv":"Q",  "wins":0, "losses":0, "draws":0, "id":18},
    {"name":"Metal Needle", "weight":2.75, "height":2, "abbv":"MN", "wins":0, "losses":0, "draws":0, "id":19},
    {"name":"Unite",        "weight":2.12, "height":2, "abbv":"U",  "wins":0, "losses":0, "draws":0, "id":20},
    {"name":"Cyclone",      "weight":2.12, "height":2, "abbv":"C",  "wins":0, "losses":0, "draws":0, "id":21},
    {"name":"Dot",          "weight":2.00, "height":2, "abbv":"D",  "wins":0, "losses":0, "draws":0, "id":22},
    {"name":"Glide",        "weight":2.52, "height":2, "abbv":"G",  "wins":0, "losses":0, "draws":0, "id":23},
    {"name":"Elevate",      "weight":3.23, "height":1, "abbv":"E",  "wins":0, "losses":0, "draws":0, "id":24},
    {"name":"Free Ball",    "weight":1.94, "height":2, "abbv":"FB", "wins":0, "losses":0, "draws":0, "id":25},
    {"name":"Trans Point",  "weight":2.21, "height":1, "abbv":"TP", "wins":0, "losses":0, "draws":0, "id":26},
    {"name":"Level",        "weight":2.65, "height":2, "abbv":"L",  "wins":0, "losses":0, "draws":0, "id":27},
    {"name":"Bound Spike",  "weight":2.00, "height":2, "abbv":"BS", "wins":0, "losses":0, "draws":0, "id":28},
    {"name":"Rubber Accel", "weight":3.10, "height":2, "abbv":"RA", "wins":0, "losses":0, "draws":0, "id":29},
    {"name":"Low Rush",     "weight":1.93, "height":1, "abbv":"LR", "wins":0, "losses":0, "draws":0, "id":30},
    {"name":"Under Needle", "weight":1.88, "height":0, "abbv":"UN", "wins":0, "losses":0, "draws":0, "id":31},
    {"name":"Vortex",       "weight":2.15, "height":2, "abbv":"V",  "wins":0, "losses":0, "draws":0, "id":32},
    {"name":"Low Orb",      "weight":1.85, "height":1, "abbv":"LO", "wins":0, "losses":0, "draws":0, "id":33},
    {"name":"Wedge",        "weight":1.83, "height":2, "abbv":"W",  "wins":0, "losses":0, "draws":0, "id":34},
    {"name":"Kick",         "weight":2.20, "height":2, "abbv":"K",  "wins":0, "losses":0, "draws":0, "id":35},
    {"name":"Zap",          "weight":2.49, "height":2, "abbv":"Z",  "wins":0, "losses":0, "draws":0, "id":36},
    //{"name":"Gear Rush",    "weight":0.00, "height":2, "abbv":"GR", "wins":0, "losses":0, "draws":0, "id":37}

];