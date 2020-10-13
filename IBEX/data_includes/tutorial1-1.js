var items = [

// Transitions (not activated for now)
// ["sep", "Separator", { }],

// Section 3 in the tutorial:
// Adding counter (for keeping track of Latin Square)
["setcounter", "__SetCounter__", { }],

// Section 3 in the tutorial: Adding Intro
["introduction", "Message", { 
    html: ["div", 
    ["p", "In this experiment you will choose the more likely interpretation of a given sentence. The experiment will take 10 mins."],
    ["p", "실험 시작!"]] }
],

// Sections 1 in the tutorial: 
// Configuring main/filler trials
// Item 1
[["main-every-yesres", 1], "AcceptabilityJudgment", {
    s: "A maid polished every mirror spotless.",
    as: ["Each mirror was polished by a possibly different maid until it was spotless.", "All the mirrors were polished by the same maid until they were spotless."]}
    ],

[["main-every-nores", 1], "AcceptabilityJudgment", {
    s: "A maid polished every mirror.",
    as: ["Each mirror was polished by a possibly different maid.", "All the mirrors were polished by the same maid."]}
    ],

[["main-each-yesres", 1], "AcceptabilityJudgment", {
    s: "A maid polished each mirror spotless.",
    as: ["Each mirror was polished by a possibly different maid until it was spotless.", "All the mirrors were polished by the same maid until they were spotless."]}
    ],

[["main-each-nores", 1], "AcceptabilityJudgment", {
    s: "A maid polished each mirror.",
    as: ["Each mirror was polished by a possibly different maid.", "All the mirrors were polished by the same maid."]}
    ],

// Item 2    
[["main-every-yesres", 2], "AcceptabilityJudgment", {
    s: "A helper dyed every shirt blue.", 
    as: ["Each shirt was dyed by a possibly different helper until it was the color blue.", "All the shirts were dyed by the same helper until they were the color blue."]}
    ],

[["main-every-nores", 2], "AcceptabilityJudgment", {
    s: "A helper dyed every shirt.", 
    as: ["Each shirt was dyed by a possibly different helper.", "All the shirts were dyed by the same helper."]}
    ],

[["main-each-yesres", 2], "AcceptabilityJudgment", {
    s: "A helper dyed each shirt blue.", 
    as: ["Each shirt was dyed by a possibly different helper until it was the color blue.", "All the shirts were dyed by the same helper until they were the color blue."]}
    ],

[["main-each-nores", 2], "AcceptabilityJudgment", {
    s: "A helper dyed each shirt.", 
    as: ["Each shirt was dyed by a possibly different helper.", "All the shirts were dyed by the same helper."]}
    ],

// Fillers
// Filler1
["filler-good1-01", "AcceptabilityJudgment", {
    s: "Only one boy enjoyed the show on the beach.",
    as: ["Nobody but one boy enjoyed the show on the beach.", "Nobody enjoyed the show on the beach."]}
    ],

// Filler2
["filler-good2-02", "AcceptabilityJudgment", {
    s: "Only three girls went to the movies.",
    as: ["Exactly two girls went to the movies.", "Exactly three girls went to the movies."]}
    ]

];


// Section 4 in the tutorial: Configuring shuffleSequence
var shuffleSequence = seq(
    "setcounter",
    "introduction",
    rshuffle(startsWith("main"), startsWith("fill")));

// If you want to use transitions/separators between trials, uncomment the code below and use this instead; also uncomment the relevant part in the beginning of the script specifying the separator
//var shuffleSequence = seq(
//     "introduction",
//     sepWith("sep", rshuffle(startsWith("main"), startsWith("fill"))));


// Section 2 in the tutorial: Setting defaults
var defaults = [
    "AcceptabilityJudgment", {
        q: "Please choose the more likely interpretation."
    }
];