$(document).ready(function(){

// Play sound
var myAudio = new Audio("");


var count = parseInt($('#session-num').html());
var breakCount = parseInt($('#break-num').html());
var counter = parseInt($('#break-num').html());

$('#reset-button').hide();

// Session time buttons
$('#session-less').click(function(){
	if (count>5)
count-=5;
$('#session-num').html(count);
$('#counter').html(count);
});

$('#session-more').click(function(){
	if (count>5)
count+=5;
$('#session-num').html(count);
$('#counter').html(count);
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

// Countdown

$('#start-button').click(function(){
var counter = setInterval(timer, 1000);
function timer(){

// Hide variables

$('.buttons-wrapper').hide();



	count -= 1;
if (count===0){
	clearInterval(counter)
	myAudio.play();
}

$('break-num').html(count);

}


});

var countDownTimer = function(){

var time = 10; /* how long the timer runs for */
var initialOffset = '440';
var i = 1
var interval = setInterval(function() {
    $('.circle_animation').css('stroke-dashoffset', initialOffset-(i*(initialOffset/time)));
    $('h2').text(i);
    if (i == time) {
        clearInterval(interval);
    }
    i++;  
}, 1000);

};


});