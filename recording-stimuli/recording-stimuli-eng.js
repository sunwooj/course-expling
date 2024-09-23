//Collecting data with php/server 

//var experimentName = "min-jp-exp";
//var submitAddress = "https://web.stanford.edu/~sunwooj/cgi-bin/process.php";


var stimuliList = shuffle([ 

    "beetle", "peetle (rhymes with beetle)", "borridge (rhymes with porridge)", "porridge", "driver", "triver (rhymes with driver)", "daxi (rhymes with taxi)", "taxi", "garnish", "karnish (rhymes with garnish)", "goffee (rhymes with coffee)", "coffee", "melon", "lorry"

]);


var stimuliList2 = shuffle([ 

"beetle", "peetle", "borridge", "porridge", "driver", "triver", "daxi", "taxi", "garnish", "karnish", "goffee", "coffee"

]);



// var data = {}; 
// var trialnum = 0;


$(document).ready(function() {
    showSlide("intro");

    $('#startbutton').click(function() {
        // stepExperiment();
        trialnum = 1;
        itemStim = stimuliList[trialnum-1];
        $(".item_number").html(trialnum); 
        $(".currentItem").html(itemStim);
        showSlide('stage');
    });

    $('#continue').click(function() {
            // document.body.scrollTop = document.documentElement.scrollTop = 0;
            if (trialnum == 26) {  
            showSlide('finish');
            }

            else {
            trialnum ++;

                if (trialnum < 15) {
                itemStim = stimuliList[trialnum-1];
                }

                else {
                itemStim = "I said " + stimuliList2[trialnum-15] + " carefully.";
                }


            $(".item_number").html(trialnum); 
            $(".currentItem").html(itemStim);

            showSlide('stage');

            }
        });

});




function showSlide (slideName) {
    $('.slide').hide();
    $('#' + slideName).show();
}



function shuffle(v) { // non-destructive.
    newarray = v.slice(0);
    for (var j, x, i = newarray.length; i; j = parseInt(Math.random() * i), x = newarray[--i], newarray[i] = newarray[j], newarray[j] = x);
    return newarray;
}