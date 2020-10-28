var defaults = [
    "AcceptabilityJudgment", {
        q: "How natural does the following sentence sound?",
        as: ["1", "2", "3", "4", "5", "6", "7"],
        presentAsScale: true,
        instructions: "Use number keys or click boxes to answer.",
        leftComment: "(Bad)", rightComment: "(Good)"
    }
];


var items = [

    ["introduction", "Message", { 
        html: ["div", 
        ["p", "In this experiment... you will do blah blah. The experiment will take 10 mins."],
        ["p", "실험 시작!"]] 
        }
    ],

    [["main-non-short", 1], "AcceptabilityJudgment", {
        s: "Who thinks that Paul stole the necklace?"
            }
        ],

    [["main-non-long", 1], "AcceptabilityJudgment", {
        s: "What does the detective think that Paul stole?"
            }
        ], 

    [["main-isl-short", 1], "AcceptabilityJudgment", {
        s: "Who wonders whether Paul stole the necklace?"
            }
        ],

    [["main-isl-long", 1], "AcceptabilityJudgment", {
        s: "What does the detective wonder whether Paul stole?"
            }
        ]

];



var shuffleSequence = seq(
    "setcounter",
    "introduction",
    rshuffle(startsWith("main"), startsWith("fill")));