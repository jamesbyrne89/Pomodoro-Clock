$(document).ready(function(){


var count = parseInt($('#session-num').html());
var breakCount = parseInt($('#break-num').html());
var counter = parseInt($('#counter').html());

$('#reset-button').hide();
$("#remaining-time").hide();

// Session time buttons

$('#session-less').click(function(){
	if (count > 5)
count -= 5;
$('#session-num').html(count);
$('#counter').html(count+":00");

});

$('#session-more').click(function(){
	if (count > 5)
count += 5;
$('#session-num').html(count);
$('#counter').html(count+":00");
});

// Break time buttons

$('#break-less').click(function(){
	if (breakCount > 5);
breakCount -= 5;
$('#break-num').html(breakCount);
});

$('#break-more').click(function(){
	if (breakCount > 5);
breakCount += 5;
$('#break-num').html(breakCount);
});

// Start countdown

$('#start-button').click(function(){
var counter = setInterval(timer, 1000);
count*=60;
function timer(){

// Show time remaining
$('#reset-button').show();
$("#remaining-time").show();
// Hide variables
$("#start-button").hide();
$('.buttons-wrapper').hide();
	count -= 1;
if (count===0){

	// Play sound
	var myAudio = new Audio("Temple_Bell.mp3");
	myAudio.play();
	clearInterval(counter);
	var startBreak = setInterval (breakTimer, 1000);
}
if (count%60>=10){
	$('#counter').html(Math.floor(count/60)+":"+count%60);
	}
else{
	$('#counter').html(Math.floor(count/60)+":"+"0"+count%60);
}


// Start break countdown
breakCount*=60;
function breakTimer(){
	
	$("#remaining-time").show();
	$("#remaining-time").html('Remaining break time: ');
	$("#break-num").show();
	breakCount -= 1;

	// Play sound
	var myAudio = new Audio("Temple_Bell.mp3");
	myAudio.play();

	 $("#break-num, #remaining-time").hide();
		if(breakCount===0){
clearInterval(startBreak);
 $("#break-num, #remaining-time").hide();
	}
	 if (breakCount%60>=10){
	$('#counter').html(Math.floor(breakCount/60)+":"+breakCount%60);
	}
else{
	$('#counter').html(Math.floor(breakCount/60)+":"+"0"+breakCount%60);
}
}
}

});

// Reset button

$('#reset-button').click(function(){

$('#counter').html(Math.floor(count/60)+":"+count%60);
clearInterval(timer);
clearInterval(breakTimer);
$('#break-num').html(breakCount);
 $(".buttons-wrapper, #break-num, #remaining-time").show();

})



});