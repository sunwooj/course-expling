// Keep here
PennController.ResetPrefix(null) 

// Comment out when debugging and testing
DebugOff()

// Control trial sequence
Sequence("instructions", randomize("experimental-trial"))

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

// Experimental trial
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

