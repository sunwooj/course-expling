Note: As of 2021, [IBEX](https://adrummond.net/ibexfarm) has been superseded with [PCIbex](https://doc.pcibex.net/). However, one can still use all the codes compatible with IBEX in PCIbex as well. If you would like to learn the original IBEX syntax instead, please consult [Brian Dillon and Rodica Ivan's LSA tutorial](https://xlingumass.github.io/resources/LSA_Minicourse_DillonIvan.pdf), the [official IBEX manual](https://github.com/addrummond/ibex/blob/master/docs/manual.md), and the `IBEX-old-tutorial.md` in this repository. In this tutorial, we will concentrate on learning the newer, PCIbex-specific syntax instead. A more general purpose tutorial and further documentation on PCIbex can be found in the [PCIbex website](https://doc.pcibex.net/). A repository of useful PCIbex scripts and templates can be found in [Anna Pryslopska's website](https://pryslopska.com/templates.html). To try out the tutorial yourself, please sign up at the [PCIbex Farm](https://farm.pcibex.net/). 


# Day 1: A classic acceptability judgement experiment

As a case study, we will create a simple acceptability judgement experiment. The experiment will be a mini-replication of experiment 1 reported in our reading, Sprouse et al (2016). In the interest of time, we will focus just on whether-island constructions and wh-dependencies (but it should be easy to expand the experiment further). See [the first author's website](https://www.jonsprouse.com/courses/experimental-syntax/) for additional resources on experimental syntax. 

## 0-1. A brief refresher

Recall that Sprouse et al. (2016) had 4 conditions from a 2x2 design (factor 1: long distance dependency or not? / factor 2: complex structure (island) or not?). We can refer to each condition as follows:

* island, short
* island, long
* non-island, short
* non-island, long

See the packet for a full list of the stimuli used.

## 0-2. Getting started

To create a new experiment, log in to your account at the [PCIbex Farm](https://farm.pcibex.net/) and click on *Empty project* under *Start a new project*. You need not start from scratch, and can use the templates on the right hand side and build from there. For this tutorial though, we will create an experiment from scratch. The main material you will be working on is the javascript file `main.js` under:

``` 
Scripts
```

You can work directly on the script editor on the web or go to a code editor of your choice (I recommend Visual Studio Code), work on the javascript, and import it back to the PCIbex farm. If you chose the latter option, save the experiment in an appropriate directory and give it an intuitive name with the extension `.js`. Usually, working on this file will involve 4 parts.

* Configuring the basic skeleton: intro and the main trials
* Configuring the .csv which will feed in the experimental items and conditions
* Fine-tuning the elements and the flow of the main trials
* Defining the `Sequence` which determines the general flow and order of the experiment, and fine-tuning other components of the experiment

Let's now go over each of the four steps one by one.

## 1. Configuring the basic skeleton

Our experiment will consist of two main parts: the intro page, and a series of main trials that can be construed as a kind of loop. Before beginning, it is useful to include the presets below -- they will likely be present in any .js file you work on. 

``` 
// Keep here
PennController.ResetPrefix(null) 

// Comment out when debugging and testing
DebugOff()
```

Let us now try creating the intro page. `Trial` as introduced by `newTrial` is the basic building block in PCIbex. It has the following kind of syntax. (See [Core concepts in PCIbex](https://doc.pcibex.net/core-concepts/) for more details.)

```
PennController.newTrial("TRIAL_LABEL",
    newX()
        .ELEMENT_COMMAND()
    ,
    newY()
        .ELEMENT_COMMAND()
    ,
    ...
)
```

The introduction consists of just texts, so we need text elements to be displayed. We can specify that as follows:

```
//Instructions
newTrial("instructions",
    defaultText
        .center()
        .print()
    ,
    newText("instructions-1", "Welcome!")
    ,
    newText("instructions-2", 
    "<p>In this experiment, you will read English sentences and rate how natural each of them sound.</p>")
    ,
    newButton("wait", "Click to start the experiment")
        .center()
        .print()
        .wait()
)
```

The main trials consist of (i) the stimuli text, (ii) the experimental question, and (iii) the acceptability rating scale. One example of it can be rendered by the following codes (see documentations on [Elements](https://doc.pcibex.net/elements/) for more details.)

```
newTrial("experimental-trial",
    newText("sentence", "What does the detective wonder whether Paul stole?")
        .settings.css("font-size", "1.4em")
        .center()
        .print()
        .log()
    ,
    newText("question", "<p><br>How natural is the sentence above?</p>")
        .center()
        .print()
    ,
    newScale("rating", "1", "2", "3", "4", "5", "6", "7")
        .labelsPosition("top")
        .center()
        .print()
        .log("last")
        .wait()
)
```

You can check the Preview window to confirm that everything is displaying the way it should.


## 2. Configuring the .csv

The code above only renders a single trial, but we want the same trial structure to loop over the randomized set of stimuli (item/condition pairings). Much like in Psychopy, this can be set by uploading a .csv that provides information about the conditions/stimuli, and invoking it in the script. I have already created the relevant .csv for you (it can be found in the packet). Examine it (especially the column names), and upload it under `Resources`.

**Exercise** *What are the first and the second column in the csv specifying? What type of counterbalancing do you think is relevant here?*


## 3. Fine-tuning the elements and the flow of the main trials

Now, we can make reference to the .csv and loop over it by embedding the code above in `Template()`, and making reference to relevant column names with `row.` 

**Exercise** *Update the relevant trial section and render it into a loop. Take note of parts you would like to change. Change them accordingly.*

Below is the updated code, with some additional refinements (e.g., spacing added to the scale, feedback and continue button added after each selection, and loggers added at the end).

```
Template("sprouse-items.csv", row =>
    newTrial("experimental-trial",
        newText("sentence", row.sentence)
            .settings.css("font-size", "1.4em")
            .center()
            .print()
            .log()
        ,
        newText("question", "<p><br>How natural is the sentence above?</p>")
            .center()
            .print()
        ,
        newScale("rating", "&nbsp;&nbsp;1&nbsp;&nbsp;", "&nbsp;&nbsp;2&nbsp;&nbsp;", "&nbsp;&nbsp;3&nbsp;&nbsp;", "&nbsp;&nbsp;4&nbsp;&nbsp;", "&nbsp;&nbsp;5&nbsp;&nbsp;", "&nbsp;&nbsp;6&nbsp;&nbsp;", "&nbsp;&nbsp;7&nbsp;&nbsp;")
            .labelsPosition("top")
            .before( newText("left", "(Very unnatural)&nbsp;&nbsp;") )
            .after( newText("right", "&nbsp;&nbsp;(Very natural)") )
            .center()
            .print()
            .log("last")
            .wait()
        ,
        newText("space", "<br><br>")
            .print()
        ,
        newButton("continue", "Continue")
            .center()
            .print()
            .wait()
    )
    .log("group", row.group)
    .log("item", row.item)
    .log("structure", row.structure)
    .log("gap", row.gap)
    .log("islandtype", row.islandtype)
)
```

**Exercise** *Run the experiment and download the results. Where do you think the main results are being saved? Notice any problems?*

The code below takes care of some problems noted above. What has changed?

```
// Looped main trials
Template("sprouse-items.csv", row =>
    newTrial("experimental-trial",
        newText("targetSentence", row.sentence)
            .settings.css("font-size", "1.4em")
            .center()
            .print()
            .log()
        ,
        newText("question", "<p><br>How natural is the sentence above?</p>")
            .center()
            .print()
        ,
        newScale("rating", "1", "2", "3", "4", "5", "6", "7")
            .labelsPosition("top")
            .label(0, "&nbsp;&nbsp;1&nbsp;&nbsp;")
            .label(1, "&nbsp;&nbsp;2&nbsp;&nbsp;")
            .label(2, "&nbsp;&nbsp;3&nbsp;&nbsp;")
            .label(3, "&nbsp;&nbsp;4&nbsp;&nbsp;")
            .label(4, "&nbsp;&nbsp;5&nbsp;&nbsp;")
            .label(5, "&nbsp;&nbsp;6&nbsp;&nbsp;")
            .label(6, "&nbsp;&nbsp;7&nbsp;&nbsp;")
            .before( newText("left", "(Very unnatural)&nbsp;&nbsp;") )
            .after( newText("right", "&nbsp;&nbsp;(Very natural)") )
            .center()
            .print()
            .log("last")
            .wait()
        ,
        newText("space", "<br><br>")
            .print()
        ,
        newButton("continue", "Continue")
            .center()
            .print()
            .wait()
    )
    .log("group", row.group)
    .log("item", row.item)
    .log("structure", row.structure)
    .log("gap", row.gap)
    .log("islandtype", row.islandtype)
)
```



## 4. Defining the Sequence

The trial sequence can be set as follows, and this setting be included near the onset.

```
// Control trial sequence
Sequence("instructions", randomize("experimental-trial"))
```

**Exercise** *Try running the experiment with and without specifying the sequence. Is there a difference?*

**Exercise** *Try including a simple exit page at the end. It can resemble the instructions page in terms of the key elements, and should come last in the sequence.*

The experiment is now more or less ready to be run! When everything is ready, uncomment `DebugOff()`, swipe to `Published`, and spread the experiment link you obtain from `Share`. The results from your participants will be saved under `Results`, which you can download.

If you run into errors, check the debugger. Another (more post-hoc) way to get an idea of where things went wrong, is to use View > Developer > Javascript Console in Google Chrome (or right click, Inspect). 

**Assignment 0** *Complete the mini-replication of the Sprouse et al. (2016) experiment*


# Day 2: Randomized answers, non-text stimuli (audio/visual), consent forms


## 0. Getting started

To diversify our toolbox, we will now learn how we can randomize answer choices, include auditory or visual stimuli in the experiment, and add a separate consent page. Consult the handout for more details on the mock experiments we will work on. Again, log in to your account at the [PCIbex Farm](https://farm.pcibex.net/) and click on *Empty project* under *Start a new project*.



## 1. Randomizing answer choices

By way of getting a handle on answer choice randomization, let us try and replicate an experiment which calls for this, namely, experiment 1 in Brasoveanu & Dotlacil (2015). We can use the experiment template we created in Sprouse et al. (2016). 

**Assignment 1** *Consult the .txt and create a mini-replication of the resultative/scope experiment from Brasoveanu & Dotlacil (2015). See the handout for more details.*

What needs to be updated? What is the key structure of the experiment in Brasoveanu & Dotlacil (2015)? Try creating the relevant .csv. You can name the headers for the columns which provide the response choices: `surfaceAnswer` and `wideAnswer`.

Once we've configured the rough structure of the experiment using the .csv, we can tackle the remaining problem below.

In many semantic/pragmatic experiments or other types of comprehension-related experiments, we may want to randomize not just the target sentences and trials, but also the order in which certain answer choices appear in. This can be done by updating the scale as follows: 

```     
        newVar("ansChoice").global()
        ,
        newScale("answer", ...[row.surfaceAnswer,row.wideAnswer].sort(v=>0.5-Math.random()))
            .labelsPosition("right")
            .vertical()
            .print()
            .log("last")
            .wait()
            .test.selected( row.surfaceAnswer )
            .success( getVar("ansChoice").set("surface") )  
            .failure( getVar("ansChoice").set("wide") )
        ,
```

The key part is the second line. Note that we also establish a new global variable at the onset using the `newVar()` command, and keep track of it near the end. This enables us to log intuitive stand-ins for participants' answer choices. Specifically, the last three lines perform a test that keeps track of and saves the shorthand answer choices to the long-form texts that actually appear. In order for the relevant variable to be logged, you will need to include `.log("ansChoice", getVar("ansChoice"))` at the end of the loop.



## 2. Including auditory stimuli

By way of getting a handle on audio stimuli inclusion, let us try and create a mini-experiment outlined in the handout, which probes the potential connection between focus prosody and the interpretation of preposed negation polar questions. 

**Assignment 2** *Consult the handout and create a mini-experiment involving the PNQ auditory stimuli. Set the experiment so that a given participant hears each of the 3 target conditions exactly once, each instantiated as different items, and both of the 2 fillers. Make sure to randomize the trials.*

Certain aspects of the experiment building process will already be familiar to you. For instance, The beginning and the instruction page would be as follows:

``` 
// Keep here
PennController.ResetPrefix(null) 

// Comment out when debugging and testing
//DebugOff()

//Instructions
newTrial("instructions",
    defaultText
        .center()
        .print()
    ,
    newText("instructions-1", "실험에 참여해 주셔서 감사합니다.")
    ,
    newText("instructions-2", 
    "<p>본 실험에서 귀하는 발화를 들으신 후 그것을 어떻게 해석하셨는지에 대한 질문에 답하실 것입니다.</p>")
    ,
    newButton("wait", "실험 시작")
        .center()
        .print()
        .wait()
)
```


A new component of the trial that we haven't dealt with yet involves the auditory stimuli. Sound files can also be uploaded to `Resources` (upload the ones included in the packet) and be rendered by using the `Audio` element (see the documentation for more details). 

A sample main trial can thus be rendered by the following kind of code. 

```
newTrial("experimental-trial",
    newText("context", "<p>발화를 들으시고 아래 질문에 답해주세요.</p>")
        .center()
        .print()
    ,
    newAudio("sound", "3-pnq-npf.wav")
        .center()
        .print()
        .play()
    ,
    newText("question", "<br><p>화자가 다음과 같이 생각할 확률은?:</p>")
        .center()
        .print()
    ,
    newText("sentence", "유라가 매미한테 물렸다.")
        .settings.css("font-size", "1.4em")
        .center()
        .print()
    ,
    newText("break", "<br>")
        .print()
    ,
    newScale("rating", "1", "2", "3", "4", "5", "6", "7")
        .labelsPosition("top")
        .label(0, "&nbsp;&nbsp;1&nbsp;&nbsp;")
        .label(1, "&nbsp;&nbsp;2&nbsp;&nbsp;")
        .label(2, "&nbsp;&nbsp;3&nbsp;&nbsp;")
        .label(3, "&nbsp;&nbsp;4&nbsp;&nbsp;")
        .label(4, "&nbsp;&nbsp;5&nbsp;&nbsp;")
        .label(5, "&nbsp;&nbsp;6&nbsp;&nbsp;")
        .label(6, "&nbsp;&nbsp;7&nbsp;&nbsp;")
        .before( newText("left", "(전혀 없음)&nbsp;&nbsp;") )
        .after( newText("right", "&nbsp;&nbsp;(매우 높음)") )
        .center()
        .print()
        .log("last")
        .wait()
    ,
    newText("space", "<br><br>")
        .print()
    ,
    newButton("next", "다음 문항으로")
        .center()
        .print()
        .wait()
)
```



## 3. Including visual stimuli

By way of getting a handle on visual stimuli inclusion, let us try and create a mini-experiment outlined in the handout, inspired by Jasbi and Frank (2017) and Barner et al. (2011).

**Assignment 3** *Complete the scalar implicature experiment, inspired by Jasbi and Frank (2017) and Barner et al. (2011). Consult the instructions below for more details. You will also need to create a .csv for this.* 

In this experiment, we have four conditions, based on two factors: quantifier (i.e., target sentence), and context (i.e., picture). 

* Some (sentence), Only some (picture)
* Some (sentence), All (picture)
* All (sentence), Only some (picture)
* All (sentence), All (picture)

The target sentences for each item would be as follows:

* Some/All apples have been bitten.
* Some/All eggs have brown spots.
* Some/All animals are sleeping.
* Some/All boxes have stars.

A given participant sees each of the 4 target conditions exactly once, each instantiated as different items. Item-condition pairings are again pseudo-randomized in a latin square fashion.

The rough structure of the experiment, as well as the accompanying .csv, should by now be fairly straightforward to create. All we need to learn is how to incorporate the visual stimuli.

Adding visual and auditory stimuli work in roughly the same way. You upload the image files under `Resources`, and use the `Image` element. The relevant syntax is as follows (embedded under `newTrial`)

```
newImage("picture", "picture_file.png")
            .center()
            .size(400, 400)
            .print()
            .log()
```

You will need to refer to the .csv and loop-ify this template accordingly.



## 4. Including a consent form

In an actual experiment, an introduction page would most likely be preceded by a page providing information about IRB and consent. When including lengthier text instructions, it is often useful to call in an external html file. I have included one such sample in the packet (`consent.html`). If you upload it to `Resources`, your script will be able to access it.

You can then include the following code before the code specifying the introduction.

```
// Consent form
newTrial("consent",
    newHtml("consent_form", "consent.html")
        .cssContainer({"width":"720px"})
        .checkboxWarning("실험에 참여하시려면 내용에 동의해 주셔야 합니다.")
        .print()
    ,
    newButton("continue", "")
        .center()
        .print()
        .wait(getHtml("consent_form").test.complete()
                  .failure(getHtml("consent_form").warn())
        )
)
```

If you'd like more info on HTML tags, you can do a quick tutorial in [Codecademy](https://www.codecademy.com/learn/learn-html) or consult the [HTML reference](https://www.w3schools.com/TAGS/default.ASP).

The Sequence would now have to be updated as follows:

```
Sequence("consent", "instructions", randomize("experimental-trial"))
```

**Exercise** *Try including the page for consent form in your demo experiments.*

**(Optional) Exercise** Try including the exit demographic questionnaire. Search for the relevant keywords in the Forum and see if any useful tips pop up.


# Wrapping up

I hope this tutorial has covered enough ground for you to be able to create whatever type of online experiment you have in mind. If you run into problems in creating your own experiments, be sure to check out the extensive documentation provided in the [PCIbex website](https://doc.pcibex.net/). Searching for certain keywords and issues in the [PCIbex Forum](https://www.pcibex.net/forums/) is also a great way to address any problems that arise. Chances are, someone else has already grappled with similar issues that you might be faced with. If nothing comes up, it never hurts to post a question yourself!



