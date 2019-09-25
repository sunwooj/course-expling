//Collecting data with php/server 

//var experimentName = "min-jp-exp";
//var submitAddress = "https://web.stanford.edu/~sunwooj/cgi-bin/process.php";


var stimuliList = shuffle([ 

"바늘", "파늘", "바마", "파마", "도망", "토망", "동밀", "통밀", "거래", "커래", "건닝", "컨닝", "소리", "사리", "누인", "노인", "모음", "마음", "얼음", "여름"

]);


var stimuliList2 = shuffle([ 

"바늘이", "파늘이", "바마", "파마", "도망이", "토망이", "동밀이", "통밀이", "거래", "커래", "건닝이", "컨닝이"

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
            if (trialnum == 32) {  
            showSlide('finish');
            }

            else {
            trialnum ++;

                if (trialnum < 21) {
                itemStim = stimuliList[trialnum-1];
                }

                else {
                itemStim = "나는 " + stimuliList2[trialnum-21] + "라 말했다.";
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