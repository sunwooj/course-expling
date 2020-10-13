var items = [

// Transitions (not activated for now)
// ["sep", "Separator", { }],

// Section 3 in the tutorial:
// Adding counter (for keeping track of Latin Square)
["setcounter", "__SetCounter__", { }],

// Section 3 in the tutorial: Adding Intro
["introduction", "Message", {
    html: { include: "tutorial-intro.html" }
    }
],

// Sections 1 in the tutorial: 
// Configuring main/filler trials
// Item 1
[["main-every-yesres-mirror", 1], "AcceptabilityJudgment", {
    s: "A maid polished every mirror spotless.",
    as: ["Each mirror was polished by a possibly different maid until it was spotless.", "All the mirrors were polished by the same maid until they were spotless."]}
    ],

[["main-every-nores-mirror", 1], "AcceptabilityJudgment", {
    s: "A maid polished every mirror.",
    as: ["Each mirror was polished by a possibly different maid.", "All the mirrors were polished by the same maid."]}
    ],

[["main-each-yesres-mirror", 1], "AcceptabilityJudgment", {
    s: "A maid polished each mirror spotless.",
    as: ["Each mirror was polished by a possibly different maid until it was spotless.", "All the mirrors were polished by the same maid until they were spotless."]}
    ],

[["main-each-nores-mirror", 1], "AcceptabilityJudgment", {
    s: "A maid polished each mirror.",
    as: ["Each mirror was polished by a possibly different maid.", "All the mirrors were polished by the same maid."]}
    ],

// Item 2    
[["main-every-yesres-shirt", 2], "AcceptabilityJudgment", {
    s: "A helper dyed every shirt blue.", 
    as: ["Each shirt was dyed by a possibly different helper until it was the color blue.", "All the shirts were dyed by the same helper until they were the color blue."]}
    ],

[["main-every-nores-shirt", 2], "AcceptabilityJudgment", {
    s: "A helper dyed every shirt.", 
    as: ["Each shirt was dyed by a possibly different helper.", "All the shirts were dyed by the same helper."]}
    ],

[["main-each-yesres-shirt", 2], "AcceptabilityJudgment", {
    s: "A helper dyed each shirt blue.", 
    as: ["Each shirt was dyed by a possibly different helper until it was the color blue.", "All the shirts were dyed by the same helper until they were the color blue."]}
    ],

[["main-each-nores-shirt", 2], "AcceptabilityJudgment", {
    s: "A helper dyed each shirt.", 
    as: ["Each shirt was dyed by a possibly different helper.", "All the shirts were dyed by the same helper."]}
    ],

// Item 3   
[["main-every-yesres-book", 3], "AcceptabilityJudgment", {
    s: "A janitor dusted every bookcase spotless.",
    as: ["Each bookcase was dusted by a possibly different janitor until it was spotless.", "All the bookcases were dusted by the same janitor until they were spotless."]}
    ],

[["main-every-nores-book", 3], "AcceptabilityJudgment", {
    s: "A janitor dusted every bookcase.",
    as: ["Each bookcase was dusted by a possibly different janitor.", "All the bookcases were dusted by the same janitor."]}
    ],

[["main-each-yesres-book", 3], "AcceptabilityJudgment", {
    s: "A janitor dusted each bookcase spotless.",
    as: ["Each bookcase was dusted by a possibly different janitor until it was spotless.", "All the bookcases were dusted by the same janitor until they were spotless."]}
    ],

[["main-each-nores-book", 3], "AcceptabilityJudgment", {
    s: "A janitor dusted each bookcase.",
    as: ["Each bookcase was dusted by a possibly different janitor.", "All the bookcases were dusted by the same janitor."]}
    ],

// Item 4   
[["main-every-yesres-bush", 4], "AcceptabilityJudgment", {
    s: "A gardener pruned every bush short.",
    as: ["Each bush was pruned by a possibly different gardener until it was short.", "All the bushes were pruned by the same gardener until they were short."]}
    ],

[["main-every-nores-bush", 4], "AcceptabilityJudgment", {
    s: "A gardener pruned every bush.",
    as: ["Each bush was pruned by a possibly different gardener.", "All the bushes were pruned by the same gardener."]}
    ],

[["main-each-yesres-bush", 4], "AcceptabilityJudgment", {
    s: "A gardener pruned each bush short.",
    as: ["Each bush was pruned by a possibly different gardener until it was short.", "All the bushes were pruned by the same gardener until they were short."]}
    ],

[["main-each-nores-bush", 4], "AcceptabilityJudgment", {
    s: "A gardener pruned each bush.",
    as: ["Each bush was pruned by a possibly different gardener.", "All the bushes were pruned by the same gardener."]}
    ],

// Fillers
// Filler1
["filler-good1-01-beach", "AcceptabilityJudgment", {
    s: "Only one boy enjoyed the show on the beach.",
    as: ["Nobody but one boy enjoyed the show on the beach.", "Nobody enjoyed the show on the beach."]}
    ],

// Filler2
["filler-good2-02-movies", "AcceptabilityJudgment", {
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