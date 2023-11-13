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
[["main-découvrir", 1], "AcceptabilityJudgment", {
        s: "Julien demande: Est-ce que Paul a découvert que cette photo est prise par Laura?",
        q: "À quel point Jane est-elle certaine de cette phrase? Cette photo est prise par Laura."
    }
    ],

[["main-découvrir", 1], "AcceptabilityJudgment", {
        s: "Julien demande: Est-ce que Paul a découvert que Laura le trompe?",
        q: "À quel point Jane est-elle certaine de cette phrase? Laura trompe Paul."
    }
    ],

[["main-découvrir", 1], "AcceptabilityJudgment", {
        s: "Julien demande: Est-ce que Paul a découvert que Laura a bu le coca?",
        q: "À quel point Jane est-elle certaine de cette phrase? Laura a bu le coca."
    }
    ],

[["main-découvrir", 1], "AcceptabilityJudgment", {
        s: "Julien demande: Est-ce que Paul a découvert que Laura a achète une nouvelle BMW?",
        q: "À quel point Jane est-elle certaine de cette phrase? Laura a achète une nouvelle BMW."
    }
    ],

// Item 2    
[["main-regretter", 2], "AcceptabilityJudgment", {
    s: "Julien demande: Est-ce que Pierre regrette que cette photo est prise par Laura?",
        q: "À quel point Jane est-elle certaine de cette phrase? Pierre a commis une erreur."
    }
    ],

[["main-regretter", 2], "AcceptabilityJudgment", {
    s: "Julien demande: Est-ce que Pierre regrette que Laura le trompe?",
        q: "À quel point Jane est-elle certaine de cette phrase? Pierre a quitté avec Marie."
    }
    ],

[["main-regretter", 2], "AcceptabilityJudgment", {
    s: "Julien demande: Est-ce que Pierre regrette que Laura a achète une nouvelle BMW",
        q: "À quel point Jane est-elle certaine de cette phrase? Pierre a acheté une nouvelle BMW."
    }
    ],

[["main-regretter", 2], "AcceptabilityJudgment", {
        s: "Julien demande: Est-ce que Pierre regrette que Laura a bu le coca?",
        q: "À quel point Jane est-elle certaine de cette phrase? Pierre a commencé le ballet."
    }
    ],

//Item 3
[["main-savoir", 3], "AcceptabilityJudgment", {
        s: "Julien demande: Est-ce que Claire sait que Andréa chantait au coin de la salle?",
        q: "À quel point Jane est-elle certaine de cette phrase? Andréa chantait au coin de la salle."
    }
    ],

[["main-savoir", 3], "AcceptabilityJudgment", {
        s: "Julien demande: Est-ce que Claire sait que Andréa a joué le foot avec les enfants?",
        q: "À quel point Jane est-elle certaine de cette phrase? Andréa a joué le foot avec les enfants."
    }
    ],

[["main-savoir", 3], "AcceptabilityJudgment", {
        s: "Julien demande: Est-ce que Claire sait que Andréa a acheté une nouvelle BMW ?",
        q: "À quel point Jane est-elle certaine de cette phrase? Andréa a acheté une nouvelle BMW."
    }
    ],

[["main-savoir", 3], "AcceptabilityJudgment", {
        s: "Julien demande: Est-ce que Claire sait que John la trompe? ",
        q: "À quel point Jane est-elle certaine de cette phrase? John trompe Claire."
    }
    ],

//trigger 4
[["main-cleft", 4], "AcceptabilityJudgment", {
        s: "Julien demande: C’est Sophie qui a brisé cet ordinateur ? ",
        q: "À quel point Jane est-elle certaine de cette phrase? Quelqu'un a brisé l'ordinateur ."
    }
    ],

[["main-cleft", 4], "AcceptabilityJudgment", {
        s: "Julien demande: C’est Sophie qui chantait au coins de la salle ? ",
        q: "À quel point Jane est-elle certaine de cette phrase? Quelqu'un chantait au coins de la salle."
    }
    ],

[["main-cleft", 4], "AcceptabilityJudgment", {
        s: "Julien demande: C’est Sophie qui a commencé le ballet ? ",
        q: "À quel point Jane est-elle certaine de cette phrase? Quelqu'un a commencé le ballet ."
    }
    ],

[["main-cleft", 4], "AcceptabilityJudgment", {
        s: "Julien demande: C’est Sophie qui a joué le foot avec les enfants ?",
        q: "À quel point Jane est-elle certaine de cette phrase? Quelqu'un a joué le foot avec les enfants ."
    }
    ],


// Trigger 5

    [["main-deviner", 4], "AcceptabilityJudgment", {
        s: "Julien demande: C’est Sophie qui chantait au coins de la salle ? ",
        q: "À quel point Jane est-elle certaine de cette phrase? Quelqu'un chantait au coins de la salle."
    }
    ],

    [["main-cleft", 4], "AcceptabilityJudgment", {
        s: "Julien demande: C’est Sophie qui a commencé le ballet ? ",
        q: "À quel point Jane est-elle certaine de cette phrase? Quelqu'un a commencé le ballet ."
    }
    ],

    [["main-cleft", 4], "AcceptabilityJudgment", {
        s: "Julien demande: C’est Sophie qui a joué le foot avec les enfants ?",
        q: "À quel point Jane est-elle certaine de cette phrase? Quelqu'un a joué le foot avec les enfants ."
    }
    ],
// Fillers
// Filler1
["filler-good1-01-beach", "AcceptabilityJudgment", {
        s: "Only one boy enjoyed the show on the beach.",
        q: "filler"
    }
    ],

// Filler2
["filler-good2-02-movies", "AcceptabilityJudgment", {
        s: "Only three girls went to the movies.",
        q: "filler2"
    }
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
        as: ["1", "2", "3", "4", "5", "6", "7"],
        presentAsScale: true,
        instructions: "Cochez...",
        leftComment: "(pas du tout certaine)", rightComment: "(tres certaine)"
    }
];