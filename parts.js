/*==========================================================*
 * BeyBuilder v1.1 for Beyblade X                           *
 * Author: Fabel                                            *
 * Copyright 2023-2024                                      *
 *==========================================================*/

//0 weight means no weight data yet, same for height

var blades = [

    {"name":"ColbaltDrake", "spin":"right", "weight":36.80, "height":0, "abbv":"CD", "wins":0, "losses":0, "draws":0, "id":0},
    {"name":"DranSword", "spin":"right", "weight":34.97, "height":0, "abbv":"DS", "wins":0, "losses":0, "draws":0, "id":1},
    {"name":"HellsScythe", "spin":"right", "weight":32.94, "height":0, "abbv":"HS", "wins":0, "losses":0, "draws":0, "id":2},
    {"name":"KnightShield", "spin":"right", "weight":32.70, "height":0, "abbv":"KS", "wins":0, "losses":0, "draws":0, "id":3},
    {"name":"WizardArrow", "spin":"right", "weight":31.86, "height":0, "abbv":"WA", "wins":0, "losses":0, "draws":0, "id":4},
    {"name":"DranzerSprial", "spin":"right", "weight":27.82, "height":0, "abbv":"DrS", "wins":0, "losses":0, "draws":0, "id":5},
    {"name":"KnightLance", "spin":"right", "weight":33.25, "height":0, "abbv":"KL", "wins":0, "losses":0, "draws":0, "id":6},
    {"name":"SharkEdge", "spin":"right", "weight":34.60, "height":0, "abbv":"SE", "wins":0, "losses":0, "draws":0, "id":7},
    {"name":"LeonClaw", "spin":"right", "weight":31.40, "height":0, "abbv":"LC", "wins":0, "losses":0, "draws":0, "id":8},
    {"name":"ViperTail", "spin":"right", "weight":34.55, "height":0, "abbv":"VT", "wins":0, "losses":0, "draws":0, "id":9},
    {"name":"DranDagger", "spin":"right", "weight":34.91, "height":0, "abbv":"DD", "wins":0, "losses":0, "draws":0, "id":10},
    {"name":"HellsChain", "spin":"right", "weight":33.33, "height":0, "abbv":"HC", "wins":0, "losses":0, "draws":0, "id":11},
    {"name":"RhinoHorn", "spin":"right", "weight":32.82, "height":0, "abbv":"RH", "wins":0, "losses":0, "draws":0, "id":12},
    {"name":"PheonixFeather", "spin":"right", "weight":33.33, "height":0, "abbv":"PF", "wins":0, "losses":0, "draws":0, "id":13},
    {"name":"PhoenixWing", "spin":"right", "weight":38.00, "height":0, "abbv":"PW", "wins":0, "losses":0, "draws":0, "id":14},
    {"name":"WyvernGale", "spin":"right", "weight":32.10, "height":0, "abbv":"WG", "wins":0, "losses":0, "draws":0, "id":15},
    {"name":"UnicornSting", "spin":"right", "weight":33.38, "height":0, "abbv":"US", "wins":0, "losses":0, "draws":0, "id":16},
    {"name":"SphinxCowl", "spin":"right", "weight":32.80, "height":0, "abbv":"SC", "wins":0, "losses":0, "draws":0, "id":17},
    {"name":"DranBuster", "spin":"right", "weight":36.32, "height":0, "abbv":"DrB", "wins":0, "losses":0, "draws":0, "id":18},
    {"name":"HellsHammer", "spin":"right", "weight":33.20, "height":0, "abbv":"HeHa", "wins":0, "losses":0, "draws":0, "id":19},
    {"name":"WizardRod", "spin":"right", "weight":35.35, "height":0, "abbv":"WR", "wins":0, "losses":0, "draws":0, "id":20},
    {"name":"DrigerSlash", "spin":"right", "weight":28.50, "height":0, "abbv":"DrSl", "wins":0, "losses":0, "draws":0, "id":21},
    {"name":"TyrannoBeat", "spin":"right", "weight":36.90, "height":0, "abbv":"TB", "wins":0, "losses":0, "draws":0, "id":22},
    {"name":"ShinobiShadow", "spin":"right", "weight":28.23, "height":0, "abbv":"ShSh", "wins":0, "losses":0, "draws":0, "id":23},
    {"name":"Tusk Mammoth", "spin":"right", "weight":32.10, "height":0, "abbv":"TM", "wins":0, "losses":0, "draws":0, "id":24},
    {"name":"Knife Shinobi", "spin":"right", "weight":30.90, "height":0, "abbv":"KfSh", "wins":0, "losses":0, "draws":0, "id":25},
    {"name":"Talon Ptera", "spin":"right", "weight":34.25, "height":0, "abbv":"TP", "wins":0, "losses":0, "draws":0, "id":26},
    {"name":"Steel Samurai", "spin":"right", "weight":31.08, "height":0, "abbv":"StSa", "wins":0, "losses":0, "draws":0, "id":27},
    {"name":"WeissTiger", "spin":"right", "weight":34.83, "height":0, "abbv":"WT", "wins":0, "losses":0, "draws":0, "id":28},
    {"name":"CobaltDragoon", "spin":"left", "weight":37.80, "height":0, "abbv":"CDg", "wins":0, "losses":0, "draws":0, "id":29},
    {"name":"BlackShell", "spin":"right", "weight":32.43, "height":0, "abbv":"BS", "wins":0, "losses":0, "draws":0, "id":30},
    {"name":"Optimus Prime", "spin":"right", "weight":31.75, "height":0, "abbv":"OP", "wins":0, "losses":0, "draws":0, "id":31},
    {"name":"Starscream", "spin":"right", "weight":29.81, "height":0, "abbv":"S", "wins":0, "losses":0, "draws":0, "id":32},
    {"name":"Optimus Primal", "spin":"right", "weight":32.43, "height":0, "abbv":"OPl", "wins":0, "losses":0, "draws":0, "id":33},
    {"name":"Megatron", "spin":"right", "weight":31.50, "height":0, "abbv":"M", "wins":0, "losses":0, "draws":0, "id":34},
    {"name":"AeroPegasus", "spin":"right", "weight":38.00, "height":0, "abbv":"AP", "wins":0, "losses":0, "draws":0, "id":35},
    {"name":"LeonCrest", "spin":"right", "weight":34.82, "height":0, "abbv":"LCr", "wins":0, "losses":0, "draws":0, "id":36},
    {"name":"PhoenixRudder", "spin":"right", "weight":34.68, "height":0, "abbv":"PR", "wins":0, "losses":0, "draws":0, "id":37},
    {"name":"Bite Croc", "spin":"right", "weight":34.05, "height":0, "abbv":"BC", "wins":0, "losses":0, "draws":0, "id":38},
    {"name":"Yell Kong", "spin":"right", "weight":31.24, "height":0, "abbv":"YK", "wins":0, "losses":0, "draws":0, "id":39},
    {"name":"Iron Man", "spin":"right", "weight":32.07, "height":0, "abbv":"IM", "wins":0, "losses":0, "draws":0, "id":40},
    {"name":"Thanos", "spin":"right", "weight":29.32, "height":0, "abbv":"T", "wins":0, "losses":0, "draws":0, "id":41},
    {"name":"Spider-man", "spin":"right", "weight":33.06, "height":0, "abbv":"Sp", "wins":0, "losses":0, "draws":0, "id":42},
    {"name":"Venom", "spin":"right", "weight":34.56, "height":0, "abbv":"V", "wins":0, "losses":0, "draws":0, "id":43},
    {"name":"Luke Skywalker", "spin":"right", "weight":30.19, "height":0, "abbv":"LS", "wins":0, "losses":0, "draws":0, "id":44},
    {"name":"Darth Vader", "spin":"right", "weight":30.40, "height":0, "abbv":"DV", "wins":0, "losses":0, "draws":0, "id":45},
    {"name":"Moff Gideon", "spin":"right", "weight":30.59, "height":0, "abbv":"MG", "wins":0, "losses":0, "draws":0, "id":46},
    {"name":"The Mandalorian", "spin":"right", "weight":30.88, "height":0, "abbv":"TM", "wins":0, "losses":0, "draws":0, "id":47},
    {"name":"WhaleWave", "spin":"right", "weight":38.15, "height":0, "abbv":"WW", "wins":0, "losses":0, "draws":0, "id":48},
    {"name":"L-Drago:Upper", "spin":"left", "weight":33.85, "height":0, "abbv":"LD:U", "wins":0, "losses":0, "draws":0, "id":49},
    {"name":"L-Drago:Rapid Hit", "spin":"left", "weight":33.22, "height":0, "abbv":"LD:R", "wins":0, "losses":0, "draws":0, "id":50},
    {"name":"Savage Bear", "spin":"right", "weight": 29.74, "height":0, "abbv":"SB", "wins":0, "losses":0, "draws":0, "id":51},
    {"name":"Roar Tyranno", "spin":"right", "weight":35.97, "height":0, "abbv":"RT", "wins":0, "losses":0, "draws":0, "id":52},
    {"name":"SilverWolf", "spin":"right", "weight":36.83, "height":0, "abbv":"SW", "wins":0, "losses":0, "draws":0, "id":53},
    {"name":"CrimsonGaruda", "spin":"right", "weight":34.9, "height":0, "abbv":"CG", "wins":0, "losses":0, "draws":0, "id":54},
    {"name":"SamuraiSaber", "spin":"right", "weight":36.41, "height":0, "abbv":"SaSa", "wins":0, "losses":0, "draws":0, "id":55},
    {"name":"KnightMail", "spin":"right", "weight":36.61, "height":0, "abbv":"KM", "wins":0, "losses":0, "draws":0, "id":56}
    

    
];

var rachets = [

    {"name":"3-60", "weight":6.32, "height":6, "abbv":"3-60", "wins":0, "losses":0, "draws":0, "id":0},
    {"name":"3-80", "weight":7.10, "height":8, "abbv":"3-80", "wins":0, "losses":0, "draws":0, "id":1},
    {"name":"4-60", "weight":6.30, "height":6, "abbv":"4-60", "wins":0, "losses":0, "draws":0, "id":2},
    {"name":"4-80", "weight":7.00, "height":8, "abbv":"4-80", "wins":0, "losses":0, "draws":0, "id":3},
    {"name":"5-60", "weight":6.60, "height":6, "abbv":"5-60", "wins":0, "losses":0, "draws":0, "id":4},
    {"name":"5-80", "weight":7.15, "height":8, "abbv":"5-80", "wins":0, "losses":0, "draws":0, "id":5},
    {"name":"9-60", "weight":6.19, "height":6, "abbv":"9-60", "wins":0, "losses":0, "draws":0, "id":6},
    {"name":"9-80", "weight":6.80, "height":8, "abbv":"9-80", "wins":0, "losses":0, "draws":0, "id":7},
    {"name":"1-60", "weight":6.06, "height":6, "abbv":"1-60", "wins":0, "losses":0, "draws":0, "id":8},
    {"name":"3-70", "weight":6.42, "height":7, "abbv":"3-70", "wins":0, "losses":0, "draws":0, "id":9},
    {"name":"5-70", "weight":6.70, "height":7, "abbv":"5-70", "wins":0, "losses":0, "draws":0, "id":10},
    {"name":"4-70", "weight":6.50, "height":7, "abbv":"4-70", "wins":0, "losses":0, "draws":0, "id":11},
    {"name":"1-80", "weight":6.72, "height":8, "abbv":"1-80", "wins":0, "losses":0, "draws":0, "id":12},
    {"name":"2-60", "weight":6.20, "height":6, "abbv":"2-60", "wins":0, "losses":0, "draws":0, "id":13},
    {"name":"2-80", "weight":6.90, "height":8, "abbv":"2-80", "wins":0, "losses":0, "draws":0, "id":14},
    {"name":"7-60", "weight":7.12, "height":6, "abbv":"7-60", "wins":0, "losses":0, "draws":0, "id":15},
    {"name":"9-70", "weight":6.32, "height":7, "abbv":"9-70", "wins":0, "losses":0, "draws":0, "id":16},
    {"name":"2-70", "weight":6.34, "height":7, "abbv":"2-70", "wins":0, "losses":0, "draws":0, "id":17},
    {"name":"3-85", "weight":4.79, "height":8.5, "abbv":"3-85", "wins":0, "losses":0, "draws":0, "id":18},
    {"name":"7-70", "weight":7.24, "height":7, "abbv":"7-70", "wins":0, "losses":0, "draws":0, "id":19}

];

var bits = [

    {"name":"Ball", "weight":2.10, "height":2, "abbv":"B", "wins":0, "losses":0, "draws":0, "id":0},
    {"name":"Flat", "weight":2.28, "height":2, "abbv":"F", "wins":0, "losses":0, "draws":0, "id":1},
    {"name":"Needle", "weight":2.03, "height":2, "abbv":"N", "wins":0, "losses":0, "draws":0, "id":2},
    {"name":"Taper", "weight":2.19, "height":2, "abbv":"T", "wins":0, "losses":0, "draws":0, "id":3},
    {"name":"High Needle", "weight":2.17, "height":3, "abbv":"HN", "wins":0, "losses":0, "draws":0, "id":4},
    {"name":"Low Flat", "weight":2.15, "height":1, "abbv":"LF", "wins":0, "losses":0, "draws":0, "id":5},
    {"name":"Point", "weight":2.20, "height":2, "abbv":"P", "wins":0, "losses":0, "draws":0, "id":6},
    {"name":"Orb", "weight":2.02, "height":2, "abbv":"O", "wins":0, "losses":0, "draws":0, "id":7},
    {"name":"Rush", "weight":2.02, "height":2, "abbv":"R", "wins":0, "losses":0, "draws":0, "id":8},
    {"name":"High Taper", "weight":2.22, "height":3, "abbv":"HT", "wins":0, "losses":0, "draws":0, "id":9},
    {"name":"Spike", "weight":2.02, "height":2, "abbv":"S", "wins":0, "losses":0, "draws":0, "id":10},
    {"name":"Gear Flat", "weight":2.28, "height":2, "abbv":"GF", "wins":0, "losses":0, "draws":0, "id":11},
    {"name":"Gear Ball", "weight":2.08, "height":2, "abbv":"GB", "wins":0, "losses":0, "draws":0, "id":12},
    {"name":"Gear Point", "weight":2.25, "height":2, "abbv":"GP", "wins":0, "losses":0, "draws":0, "id":13},
    {"name":"Gear Needle", "weight":2.00, "height":2, "abbv":"GN", "wins":0, "losses":0, "draws":0, "id":14},
    {"name":"Accel", "weight":2.58, "height":2, "abbv":"A", "wins":0, "losses":0, "draws":0, "id":15},
    {"name":"Hexa", "weight":2.58, "height":2, "abbv":"H", "wins":0, "losses":0, "draws":0, "id":16},
    {"name":"Disc Ball", "weight":3.23, "height":4, "abbv":"DB", "wins":0, "losses":0, "draws":0, "id":17},
    {"name":"Quake", "weight":2.17, "height":2, "abbv":"Q", "wins":0, "losses":0, "draws":0, "id":18},
    {"name":"Metal Needle", "weight":2.75, "height":2, "abbv":"MN", "wins":0, "losses":0, "draws":0, "id":19},
    {"name":"Unite", "weight":2.12, "height":2, "abbv":"U", "wins":0, "losses":0, "draws":0, "id":20},
    {"name":"Cyclone", "weight":2.12, "height":2, "abbv":"C", "wins":0, "losses":0, "draws":0, "id":21},
    {"name":"Dot", "weight":2.00, "height":2, "abbv":"D", "wins":0, "losses":0, "draws":0, "id":22},
    {"name":"Glide", "weight":2.52, "height":2, "abbv":"G", "wins":0, "losses":0, "draws":0, "id":23},
    {"name":"Elevate", "weight":2.23, "height":1, "abbv":"E", "wins":0, "losses":0, "draws":0, "id":24},
    {"name":"Free Ball", "weight":1.94, "height":2, "abbv":"FB", "wins":0, "losses":0, "draws":0, "id":25},
    {"name":"Trans Point", "weight":2.21, "height":1, "abbv":"TP", "wins":0, "losses":0, "draws":0, "id":26},
    {"name":"Level", "weight":2.65, "height":2, "abbv":"L", "wins":0, "losses":0, "draws":0, "id":27},
    {"name":"Bound Spike", "weight":2, "height":2, "abbv":"BS", "wins":0, "losses":0, "draws":0, "id":28},
    {"name":"Rubber Acell", "weight":3.1, "height":2, "abbv":"RA", "wins":0, "losses":0, "draws":0, "id":29}

];