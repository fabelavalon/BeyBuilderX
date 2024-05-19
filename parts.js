/*==========================================================*
 * BeyBuilder v1.1 for Beyblade X                           *
 * Author: Fabel                                            *
 * Copyright 2023                                           *
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
    {"name":"ShinobiShadow", "spin":"right", "weight":28.23, "height":0, "abbv":"ShSh", "wins":0, "losses":0, "draws":0, "id":23}//,
    //{"name":"WeissTiger", "spin":"right", "weight":0, "height":0, "abbv":"WT", "wins":0, "losses":0, "draws":0, "id":24}
    
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
    {"name":"1-80", "weight":6.72, "height":8, "abbv":"1-80", "wins":0, "losses":0, "draws":0, "id":12}

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
    {"name":"Metal Needle", "weight":2.75, "height":2, "abbv":"MN", "wins":0, "losses":0, "draws":0, "id":19}//,
    //{"name":"Unite", "weight":0, "height":2, "abbv":"U", "wins":0, "losses":0, "draws":0, "id":20}

];