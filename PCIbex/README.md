Note: As of 2021, [IBEX](https://adrummond.net/ibexfarm) has been superseded with [PCIbex](https://doc.pcibex.net/). However, one can still use all the codes compatible with IBEX in PCIbex as well. If you would like to learn the original IBEX syntax instead, please consult [Brian Dillon and Rodica Ivan's LSA tutorial](https://xlingumass.github.io/resources/LSA_Minicourse_DillonIvan.pdf), the [official IBEX manual](https://github.com/addrummond/ibex/blob/master/docs/manual.md), and the `IBEX-old-tutorial.md` in this repository. In this tutorial, we will concentrate on learning the newer, PCIbex-specific syntax instead. A more general purpose tutorial and further documentation on PCIbex can be found in the [PCIbex website](https://doc.pcibex.net/). A repository of useful PCIbex scripts and templates can be found in [Anna Pryslopska's website](https://pryslopska.com/templates.html). To try out the tutorial yourself, please sign up at the [PCIbex Farm](https://farm.pcibex.net/). 


# IBEX Tutorial: An Acceptability Judgement Experiment

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


## 3. Fine-tuning the elements and the flow of the main trials

Now, we can make reference to the .csv and loop over it by embedding the code above in `Template()`, and making reference to relevant column names with `row.` Below is the updated code, with some additional refinements (e.g., spacing added to the scale, feedback and continue button added after each selection, and loggers added at the end).

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

## 4. Defining the Sequence

The trial sequence can be set as follows, and this setting be included near the onset.

```
// Control trial sequence
Sequence("instructions", randomize("experimental-trial"))
```

The experiment is now more or less ready to be run! When everything is ready, uncomment `DebugOff()`, swipe to `Published`, and spread the experiment link you obtain from `Share`. The results from your participants will be saved under `Results`, which you can download.

If you run into errors, check the debugger. Another (more post-hoc) way to get an idea of where things went wrong, is to use View > Developer > Javascript Console in Google Chrome (or right click, Inspect). 





# IBEX Tutorial: Experiments using auditory or visual stimuli


## 0. Getting started

Here, we will learn how we can add a separate consent page and how we can include auditory or visual stimuli in the experiment. Consult the handout for more details on the mock experiments we will work on. Again, log in to your account at the [PCIbex Farm](https://farm.pcibex.net/) and click on *Empty project* under *Start a new project*.

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

## 1. Including auditory stimuli

A new component of the trial that we haven't dealt with yet involves the auditory stimuli. Sound files can also be uploaded to `Resources` (upload the ones included in the packet) and be rendered by using the `Audio` element (see the documentation for more details). A sample main trial can thus be rendered by the following kind of code. 

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
    newScale("rating", "&nbsp;&nbsp;1&nbsp;&nbsp;", "&nbsp;&nbsp;2&nbsp;&nbsp;", "&nbsp;&nbsp;3&nbsp;&nbsp;", "&nbsp;&nbsp;4&nbsp;&nbsp;", "&nbsp;&nbsp;5&nbsp;&nbsp;", "&nbsp;&nbsp;6&nbsp;&nbsp;", "&nbsp;&nbsp;7&nbsp;&nbsp;")
        .labelsPosition("top")
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

## 2. Including a consent form

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

## Assignment I

Complete the focused PNQ experiment, whereby a given participant hears each of the 3 target conditions exactly once, each instantiated as different items, and both of the 2 fillers. Consult the handout for more details.

## 3. Including visual stimuli

Adding visual and auditory stimuli work in roughly the same way. You upload the image files under `Resources`, and use the `Image` element. The relevant syntax is as follows (embedded under `newTrial`)

```
newImage("picture", "picture_file.png")
            .center()
            .size(400, 400)
            .print()
            .log()
```

## Assignment II

Complete the scalar implicature experiment, inspired by Jasbi and Frank (2017), whereby a given participant sees each of the 6 target conditions exactly once, each instantiated as different items. Consult the handout for more details. You will also need to create the .csv for this.


