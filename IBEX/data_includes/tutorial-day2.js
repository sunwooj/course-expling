// Day 2, section 2 of the tutorial
// Define new controllers

define_ibex_controller({
    name: "MyController1",
    jqueryWidget: {
        _init: function () {
            this.options.transfer = null; // Remove 'click to continue message'. 
            this.element.VBox({
                options: this.options,
                triggers: [1],
                children: [
                    "Message", this.options,
                    "AcceptabilityJudgment", this.options,
                ]
            });
        }
    },
    properties: {}
});


define_ibex_controller({
    name: "MyController2",
    jqueryWidget: {
        _init: function () {
            this.options.transfer = null;
            this.element.VBox({
                options: this.options,
                triggers: [1],
                children: [
                    "Message", this.options,
                    "Question", this.options,
                ]
            });
        }
    },
    properties: {}
});


var items = [

// Transitions (not activated for now)
// ["sep", "Separator", { }],

// Adding counter (for keeping track of Latin Square)
["setcounter", "__SetCounter__", { }],

// Section 1 in the tutorial: 
// Bringing in external Intro chunk
["introduction", "Message", { 
    html: { include: "tutorial-intro.html" }
    }
],

// Configuring main/filler trials
// Sample trials with pictures
[["main-pall-ssome", 1], "MyController1",
    {
        html: "<center><img src='https://sunwooj.github.io/course-exsemprag/IBEX/images/sleep-all.png' alt='imagefile' width='480'></center>",
        s: "Some animals are sleeping."
    }
],

[["main-pall-sall", 1], "MyController1",
    {
        html: "<center><img src='https://sunwooj.github.io/course-exsemprag/IBEX/images/sleep-all.png' alt='imagefile' width='480'></center>",
        s: "All animals are sleeping."
    }
],

[["main-psome-ssome", 2], "MyController1",
    {
        html: "<center><img src='https://sunwooj.github.io/course-exsemprag/IBEX/images/sleep-some.png' alt='imagefile' width='480'></center>",
        s: "Some animals are sleeping."
    }
],

[["main-psome-sall", 2], "MyController1",
    {
        html: "<center><img src='https://sunwooj.github.io/course-exsemprag/IBEX/images/sleep-some.png' alt='imagefile' width='480'></center>",
        s: "All animals are sleeping."
    }
],

// Sample trials with auditory stimuli
["practice-audio1", "MyController2",
    {
        html: "<center><audio controls><source src='https://sunwoojeong.com/experiments/veridicality/exp1b/exp1b-stimuli/year-al-pq-nv.wav' type='audio/wav'></audio></center>",
        q: "화자의 발화를 고려했을때, 다음 문장은 사실입니까?: 내란이 을미년에 일어났다.",
        as: ["네", "아니오"]
    }
],

["practice-audio2", "MyController2",
    {
        html: "<center><audio controls><source src='https://sunwoojeong.com/experiments/veridicality/exp1b/exp1b-stimuli/year-al-pq-mv.wav' type='audio/wav'></audio></center>",
        q: "화자의 발화를 고려했을때, 다음 문장은 사실입니까?: 내란이 을미년에 일어났다.",
        as: ["네", "아니오"]
    }
],

// A sample exit questionnaire with Form controller
["exitqs", "Form", {
    html: { include: "demographic-form.html" }
    }
]

];


// Configuring shuffleSequence
var shuffleSequence = seq(
    "setcounter",
    "introduction",
    rshuffle(startsWith("main")),
    rshuffle(startsWith("practice")),
    "exitqs");



// Setting defaults
var defaults = [
    "MyController1", {
        q: "Is the sentence true or false?",
        as: ["True", "False"]
    }
];