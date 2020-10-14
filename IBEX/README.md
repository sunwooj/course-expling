# IBEX Tutorial: Day 1

Day 1 will cover the basics of creating simple acceptability judgement or other types of forced-choice task experiments. We will do a mini-replication of experiment 1  reported in our reading, Sprouse et al (2016), focusing just on whether-island constructions and wh-dependencies. See [the first author's website](https://sprouse.uconn.edu/research.html) for more details on the data and the stimuli list. For a comprehensive step-by step guide to using IBEX, please consult [Brian Dillon and Rodica Ivan's LSA tutorial](https://xlingumass.github.io/resources/LSA_Minicourse_DillonIvan.pdf). The [official IBEX manual](https://github.com/addrummond/ibex/blob/master/docs/manual.md) will also function as an indispensible reference if you want to be more flexible with your experiment designs.

## 0. Getting started

To create a new experiment, log in to your account in [IBEX Farm](http://spellout.net/ibexfarm/) and click on *Create a new experiment*.
For a basic experiment, all you need to modify will be the javascript file under:

``` 
data_includes
```

You can download `examples_data.js` present under `data_includes` (it provides you with a basic template for a self-paced reading experiment including comprehension tasks) and work from there, or work from scratch, or work from another existing template that can execute tasks that are most similar to the experiment you have in mind. As a practice, let's try creating the main javascript file from scratch. Go to a code editor of your choice (I recommend Visual Studio Code) and open a new blank file. Save it in an appropriate directory and give it an intuitive name with the extension `.js`. Usually, working on this file will involve 4 parts.

* Defining experimental trials and filler/practice trials; representing them as `items` variables
* Defining controller defaults (when applicable) for experimental trials
* Adding introductions (involving consent info) and exits
* Defining `shuffleSequence` which determines the general flow and order of the experiment

Let's now go over each of the four steps one by one.

## 1. Defining potential trials in the items variable

We first create an `items` variable as below, which will often be a huge matrix containing of the list of potential trials (associated with distinct items and conditions), and other relevant pieces of the experiment such as the intro, the exit, and transitions between trials (if needed), as well as other backend tools such as counters. 

``` 
var items = [ ];
```

We'll now fill in this empty matrix, first with a list of possible trials. The syntax of each element (a given potential trial, i.e., condition-item pair), which will again be a matrix `[ ]`, is often as follows:

```
[["TrialType-TrialConditions", ItemNum], "ControllerType", {ArgumentsToControllers}]
```

* The first element: Again a matrix `[ ]`, in the case of target trials, consisting of:
    + TrialType: Is it a target or filler/control trial? We will label each as `main` and `fill`
    + TrialConditions: Which experimental condition is it? Recall that Sprouse et al. (2016) had 4 conditions from a 2x2 design (factor 1: long distance dependency or not? / factor 2: complex structure (island) or not?). Since we will focus only on whether islands and wh-dependencies for now, we can label each as follows:
        + `isl-short`: island, short
        + `isl-long`: island, long
        + `non-short`: non-island, short
        + `non-long`: non-island, long
    + ItemNum: Item number; 1, 2, 3, 4, etc.
* The second element: `ControllerType`. Here you specify the type of Controller you want to use, which will implement the main task in the trial. Commonly used Controllers in experiments which gather offline measures are `AcceptabilityJudgement` (often used for implementing naturalness rating tasks involving a series of sentences) and `Question` (forced choice tasks). We will use the `AcceptabilityJudgement` Controller, and use a standard 7 point Likert scale.
* The third element: `{ArgumentsToControllers}`. This is a list specifying the values of the arguments called for by the Controller above. Different types of Controllers call for different types of obligatory arguments. Consult the documentation in the [official manual](https://github.com/addrummond/ibex/blob/master/docs/manual.md) to check which arguments a given Controller calls for. The `AcceptabilityJudgement` Controller, for instance, calls for values of `s` (the sentence), `q` (the question), and `as: ["", "", ...]` (the scale or the options that will function as answer choices to the questions).

Here is an example of an element in the `items` list, which instantiates a specific condition-item pair (i.e.,~a potential trial). Proper indentations facilitate easy recognition of the components that make up the element, so change lines and introduce tab spaces in appropriate junctures.

```
[["main-isl-short", 1], "AcceptabilityJudgment", {
    s: "Who thinks that Paul stole the necklace?", 
    q: "Please click on the more likely interpretation of the sentence."
    as: ["1", "2", "3", "4", "5", "6", "7"]
        }
    ]
```

Each item (in this case, item 1), is associated with 4 conditions, though given the current experiment design, a given participant will see the item instantiated in only one of the 4 possible conditions. Create the rest of the 3 additional condition-item pairs for item 1 and add them in the `items` matrix, making sure to put a comma between these potential trials. (Consult `sprouse-2016-materials-english.xlsx`, downloaded from the author's website.) Your `items` variable should now look as follows: 

```
var items = [

    [["main-non-short", 1], "AcceptabilityJudgment", {
        s: "Who thinks that Paul stole the necklace?", 
        q: "How natural does the following sentence sound?"
        as: ["1", "2", "3", "4", "5", "6", "7"]
            }
        ],

    [["main-non-long", 1], "AcceptabilityJudgment", {
        s: "What does the detective think that Paul stole?", 
        q: "How natural does the following sentence sound?",
        as: ["1", "2", "3", "4", "5", "6", "7"]
            }
        ], 

    [["main-isl-short", 1], "AcceptabilityJudgment", {
        s: "Who wonders whether Paul stole the necklace?", 
        q: "How natural does the following sentence sound?",
        as: ["1", "2", "3", "4", "5", "6", "7"]
            }
        ],

    [["main-isl-long", 1], "AcceptabilityJudgment", {
        s: "What does the detective wonder whether Paul stole?", 
        q: "How natural does the following sentence sound?",
        as: ["1", "2", "3", "4", "5", "6", "7"]
            }
        ]

    ];
```

Spacings between elements as well as indentations introduced above are not necessary to make the script work; they are simply there to help you better see the structure of each element in the list. Note however the last element of the list in `items` does not have a comma after it. 

Having included a list of elements that will instantiate main trials in the experiment, let us now look at how we can add filler/control trials in the `items` variable. We can do it in the same way as we did the main trials, again with the following syntax:

```
["TrialType-FillerType", "ControllerType", {ArgumentsToControllers}]
```

The only difference is that now the first argument is not a matrix, but a string. As fillers are generally not subject to latin square / counterbalancing considerations (the full set of fillers will always be shown in a given experiment), specification of an item number is not needed. 

Here's an example of a filler element, added to the `items` list. In the `FillerType` slot, it is useful to include information on which response is the grammatical one, especially if you are using them as controls (below I keep track of this info with `G` vs `UG` labels, following the author.) It is also useful to include an identifier for the filler (below I keep track of this info with keywords).

```
["filler-1-G", "AcceptabilityJudgment", {
    s: "It seems to him that Kim solved the problem.", 
    q: "How natural does the following sentence sound?",
    as: ["1", "2", "3", "4", "5", "6", "7"]
        }
    ]
```


## 2. Defining controller defaults

You may have realized from doing the task above that some of the info you provided as a list are a bit redundant. In particular, values of certain arguments of the `AcceptabilityJudgement` Controller may be identical throughout the experiment. In this case, you can specify such values in the `defaults` variable, and need not provide it repetitively under `items`. The general syntax for the `defaults` variable is something like the following, for any number of Controllers and their arguments (e.g., arg1, arg2).

```
var defaults = [
    "Controller1", {
        arg1: "",
        arg2: ""
    },
    "Controller2", {
        arg1: ""
    }   
];
```

For instance, we can designate the default for the `q` argument of `AcceptabilityJudgement` as follows, and get rid of the `q` variable in the main `items` section. We can do the same for the `as` variable, which determines the scale (options) associated with the task. Your script should now look something like this:

```
var defaults = [
    "AcceptabilityJudgment", {
        q: "How natural does the sentence above sound?",
        as: ["1", "2", "3", "4", "5", "6", "7"]
    }
];


var items = [

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
```

The rest is easy, though a bit space consuming. (Not really time consuming though, copy/paste will do wonders!) You do the same for the rest of the experimental items as you did for item 1, making sure that the 4 conditions appear in the same order in the `TrialConditions` spot as above (this is because the built-in Latin Square ordering generator requires this). Our mock experiment will only have 4 items (so that each condition appears exactly once in the experiment). This will lead you to add 4 x 4 = 16 elements inside the `items` variable. *Your task is to complete this template so that it includes 4 items and 4 fillers. Consult the list of materials provided by the author to access more items.*


## 3. Adding introductions and exits

Trials all have the same basic structure, but an experiment usually involves an introductory slide, as well as an exit slide. These can also be added as elements in the `items` variable. The Controller that's often used to display a simple text is the `Message` controller. The obligatory argument it takes is `html`. The `Message` Controller displays whatever is specified by this argument in standard html encoding. In our next tutorial, we'll work on fine-tuning intros and exit slides and calling in external html files. For now, a simple slide like the one below will do.

```
["introduction", "Message", { 
    html: ["div", 
    ["p", "In this experiment... you will do blah blah. The experiment will take 10 mins."],
    ["p", "실험 시작!"]] 
    }
]
```

You can just give an intuitive name of the Message Controller (introduction, in this case) for the first argument.


## 4. Defining `shuffleSequence` 

We now have all the ingredients necessary to run the experiment. Now all we need to do is determine the general flow and order of the experiment. This is done through the `shuffleSequence` variable. The `seq()` function determines the order in which things appear. We first activate the backend `setcounter` (this is just something that ensures that the Latin Square ordering varies as much as possible across participants), then display the `introduction`. Then, we want the main trials and the filler trials to appear in random order, while alternating between them as much as possible. The `rshuffle()` function which takes two arguments does just that: It shuffles the potential trials and displays them, but takes care to alternate as much as possible between ones starting with `main` (recall that this is how the beginning of all the potential main trials are named (TrialType)) and ones starting with `fill` (recall that this is how the beginning of all the potential filler trials are named (TrialType)).

```
var shuffleSequence = seq(
    "setcounter",
    "introduction",
    rshuffle(startsWith("main"), startsWith("fill")));
```

The experiment is now more or less ready to be run!

## Running, collecting data, and troubleshooting

To run your experiment, go to the repository of your experiment in [IBEX Farm](http://spellout.net/ibexfarm/) and update the javascript under `data_includes`. You can do that by clicking on `upload a new version`, or by clicking on `upload a file to this directory` and deleting the old `example_data.js` template. The link provided on top of the page is your link to the experiment. People can click on this link to take your experiment, and results will be saved under the `results` section. They are saved in .csv format (comma separated values), which can be easily opened in Excel and other Spreadsheet programs. If you run into errors while running the experiment, it's likely that a comma is missing somewhere in the javascript or its syntax is off somewhere. One way to get an idea of where things went wrong, is to use View > Developer > Javascript Console in Google Chrome (or right click, Inspect). When building an experiment using IBEX, a lot of other people may have encountered and resolved similar problems as you! Check out [IBEX Discussion Group](https://groups.google.com/forum/#!forum/ibexexperiments) to search for answers. You may end up getting a lot of help and insights.

## In-lab assignment: part I

Complete the experiment by adding 4 items, as well as the introduction and the exit slides. Submit the resulting experiment as a URL. For ease of reference, make your URL have the following type of address:

```
https://spellout.net/ibexexps/yourIBEX-ID/200610134-jeong-exp1/experiment.html
```



# IBEX Tutorial: Day 2


## 0. Getting started

Today we will learn how we can add lengthier introductions, visual stimuli, auditory stimuli, and survey forms to your IBEX experiment.
Go to [IBEX Farm](http://spellout.net/ibexfarm/) and click on *Create a new experiment*.
Unlike the last time, where we only updated the javascript file under `data_includes`, we will modularize some of the experimental content and update the two following folders:

``` 
data_includes
chunk_includes
```

First, create a new .js file which we will add to `data_includes`. Create the `items` variable as before.
Now let us work on adding the following features, one-by-one, into our new experiment.

* Adding an introduction with a consent form
* Adding visual stimuli
* Adding auditory stimuli
* Adding a survey form



## 1. Adding an introduction

On our first day, we worked on creating a simple introductory slide for the experiment using inline html codes. 
If you'd like a proper instruction slides with multiple components however, it would be better to create an external html file and call that in as your intro slide.
You can do that by adding the following element in the `items` variable:

```
["introduction", "Form", {
    html: { include: "tutorial-intro.html" }
    }
]
```

Then you just need to upload a separate `tutorial-intro.html` file under `chunk_includes` in the [IBEX Farm](http://spellout.net/ibexfarm/).
HTML syntax may take some time getting used to, but for the most part, you can just tweak the template I shared (`tutorial-intro.html`). 
If you'd like more info on HTML tags, you can do a quick tutorial in [Codecademy](https://www.codecademy.com/learn/learn-html) or consult the [HTML reference](https://www.w3schools.com/TAGS/default.ASP).

The parts you would need to change: introductory texts between the paragraph tags `<p>` and `</p>`, and the link to your own consent form after `href`; you can upload your own consent form in your Github repository and link the address:

```
<a href="https://sunwooj.github.io/course-exsemprag/IBEX/example-consent.pdf" target="_blank">
    Consent Form
</a>
```

## 2. Adding visual stimuli

Adding visual and auditory stimuli work in roughly the same way. You render these stimuli as a part of the HTML elements, and make the html script call in pictures and sounds from appropriate link addresses. In the context of experimental trials, you would most likely pair a given picture or sound file with a question or an experimental task. To be able to do this, it would be useful for us to create a new Controller by combining existing ones (since there exists no pre-existing Controller that does just that). Controllers like `Message` and `Form` are the ones that take in `html` as an obligatory arguments and display them. And as we saw in day 1, the `AcceptabilityJudgement` Controller enables us to ask a question with forced choice options after presenting a sentence. We will therefore combine the `Message` Controller with the `AcceptabilityJudgement` controller. The script needed to do that is provided below. (You can place the script in the main .js file, right before defining the `items` variable.)

```
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
```

You can give it an appropriate name like `MyController1`. Depending on the type of experimental task you are envisaging, you can combine any two Controllers and create a new one using the method outlined above. 

You then specify the trial structure in the `items` variable in exactly the same way as you would any other Controller. Examples of elements in the `items` using the newly defined Controller is provided below:


```
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
]
```

You can upload images in your Github repository in .png format, and add the link addresses to them after `src=`, inside single quotations. The experiment will find the appropriate pictures and display them during the trials. (The sample pictures and trials are inspired by our Barner et al. (2011) reading.)

You'll notice that the `q` argument is missing; this is because we will create a separate `default` variable as questions and options will be identical across target trials; you can define the defaults in terms of the new Controller, like below:

```
var defaults = [
    "MyController1", {
        q: "Is the sentence true or false?",
        as: ["True", "False"]
    }
];
```


## 3. Adding auditory stimuli

Adding auditory stimuli will work in exactly the same way, with the following caveat: you cannot use Github repo links to call in sound files as html elements. Some web repos that will work: Dropbox and Google Drive, which auto-generate lengthy, random link addresses to uploaded sound files. If you want to avoid having to paste in lengthy link addresses that aren't transparent, you can sign up for a server/webhosting service (SNU offers this as a part of 스누인 지원 -- the yearly subscription costs 3만원). This allows you to have link addresses that are transparent, and maintain the file names of your audio files. A sample element that calls in a sound file uploaded to my SNU server is provided below:

```
["practice-audio", "MyController2",
    {
        html: "<center><audio controls><source src='http://hosting02.snu.ac.kr/~sunwooj/experiments/veridicality/painter-al-jul1-p4.wav' type='audio/wav'></audio></center>",
        q: "Which is true?",
        as: ["Is a painter", "Is not a painter"]
    }
]
```

Again, all you need to change in the html argument is the part after `src=`; you would put in appropriate link addresses to your sound files inside single quotations. Since the trial structure doesn't require displaying a target sentence in text, the above element uses yet another kind of Controller, `MyController2`, which combines `Message` and `Question` Controllers. See `tutorial2-1.js` for full documentation.


## 4. Adding a survey form

You might want to run an experiment that asks multiple survey-type questions in a given trial. Or, you might include an exit survey at the end of a standard, single-question-per-trial experiment. In these cases, using the `Form` Controller would be of help. Like the `Message` Controller, the `Form` Controller displays html arguments in HTML, but also dynamically records input responses to standard HTML elements like radio buttons, checkboxes, and text boxes. You can provide the html argument as inline codes, but once the questions get longer and complicated, providing them as a separate .html chunk would be more convenient. Just like the introduction, we will therefore create a separate html form, named `demographic-form.html`. The html file includes some frequently used input elements:

```
<p>What is your age?</p>
     
<input type='radio' name='age' value='20' /> 10-20대 
<input type='radio' name='age' value='40' /> 30-40대 
<input type='radio' name='age' value='60' /> 50-60대

<p>What is your dialect?</p>

<input type='radio' name='dialect' value='seoul' /> 서울
<input type='radio' name='dialect' value='jl' /> 전라도
<input type='radio' name='dialect' value='gn' /> 경상도

<p>Check all that applies.</p>

<input type='checkbox'/> rapper &nbsp;&nbsp; 
<input type='checkbox'/> dancer &nbsp;&nbsp; 
<input type='checkbox'/> director </p>

<p>Any comments?</p>

<input type='text'/>
```

Some brief remarks on each:

* radio buttons: To keep track of which options belong to which question, designate each radio button the same `name` value. By default, the experiment will record the `value` of the option that was chosen; participants can only choose one of the provided radio buttons.
* check boxes: Participants can check multiple checkboxes. By default, the experiment will record yes/no, depending on whether the given checkbox was checked or not.
* Text boxes: By default, the experiment will record whatever text was typed in the text box.

You can upload the `demographic-form.html` form under `chunk_includes` in the [IBEX Farm](http://spellout.net/ibexfarm/) and in the main .js file, include a survey trial using this form as follows:

```
["exitqs", "Form", {
    html: { include: "demographic-form.html" }
    }
]
```

The rest is as in Day 1! Define the `shuffleSequence`, upload the .js under `data_includes`, and you should be good to go!!