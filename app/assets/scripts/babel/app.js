'use strict';

// Register service worker

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js', {
    scope: '/'
  }).then(function (registration) {
    console.log('Yay!!');
  }).catch(function (error) {
    console.log('Failed to register because: ', error);
  });
};

// Declare variables

var currentSession = 25;
var seconds = currentSession * 60;
var minutes = Math.floor(seconds / 60);
var breakTime = 5;
var remainderSeconds = seconds % 60;
var started = false;
var breakStarted = false;
var countDown = void 0;

// Session length buttons

var sessionLength = document.getElementById('session-num');
sessionLength.textContent = currentSession;

// Break time buttons
var breakLength = document.getElementById('break-num');
breakLength.textContent = breakTime;

// Session length displayed
var timerDisplay = document.querySelector('#time');

// Reamining time or break time text
var timeLeftDisplay = document.getElementById('timer__time-left');

// Start the timer

var startTimerButton = document.querySelector('#start-button');

var startButton = startTimerButton.addEventListener('click', function () {
  if (!started) {
    startTimer();
    startTimerButton.textContent = 'Pause';
  } else if (started) {
    clearInterval(countDown);
    started = false;
    startTimerButton.textContent = 'Start';
  }
});

// Start session timer

function startTimer(currentSession) {
  timeLeftDisplay.textContent = 'Time remaining:';
  started = true;
  displayTime();
  countDown = setInterval(function () {
    console.log(seconds);
    seconds--;
    minutes = Math.floor(seconds / 60);
    remainderSeconds = seconds % 60;

    if (seconds <= 0) {
      clearInterval(countDown);
      currentSession = breakTime;
      seconds = breakTime * 60;
      startBreakTimer(breakTime);
      playSound();
    }
    displayTime();
  }, 1000);
}

// Show the timer

function displayTime() {
  timerDisplay.textContent = minutes + ':' + (remainderSeconds < 10 ? '0' : '') + remainderSeconds;
  if (minutes == currentSession) {}
  return;
}

// Increase session or break time

var increaseSession = document.getElementById('session-more');
var increaseBreakTime = document.getElementById('break-more');

increaseSession.addEventListener('click', increaseTime);
increaseBreakTime.addEventListener('click', increaseTime);

function increaseTime(e) {

  if (e.target == increaseSession) {
    currentSession++;
    minutes = currentSession;
    seconds = currentSession * 60;
    remainderSeconds = seconds % 60;
    displayTime();
    sessionLength.textContent = currentSession;
  } else if (e.target == increaseBreakTime) {
    breakTime++;
    breakLength.textContent = breakTime;
  }
}

// Decrease session or break time

var reduceBreakTime = document.getElementById('break-less');
var reduceSession = document.getElementById('session-less');

reduceSession.addEventListener('click', decreaseTime);
reduceBreakTime.addEventListener('click', decreaseTime);

function decreaseTime(e) {

  if (e.target == reduceSession) {
    if (currentSession < 6) {
      return;
    } else {
      currentSession--;
      minutes = currentSession;
      seconds = currentSession * 60;
      remainderSeconds = seconds % 60;
      displayTime();
      sessionLength.textContent = currentSession;
    }
  } else if (e.target == reduceBreakTime) {
    if (breakTime < 2) {
      return;
    } else {
      breakTime--;
      breakLength.textContent = breakTime;
    }
  }
}

// Play a sound when timer has finished

function playSound() {
  var gong = new Audio('Temple_Bell.mp3');
  gong.play();
}

// Start session timer

function startBreakTimer(breakTime) {

  displayTime();
  breakStarted = true;
  countDown = setInterval(function () {
    seconds--;
    minutes = Math.floor(seconds / 60);
    remainderSeconds = seconds % 60;

    if (seconds <= 0) {
      clearInterval(countDown);
      seconds = currentSession * 60;
      startTimer(currentSession);
      playSound();
      return;
    }
    displayTime();
    timeLeftDisplay.textContent = 'Break time:';
  }, 1000);
}

// Reset the timer

var resetButton = document.querySelector('#reset-button');
var resetTimer = resetButton.addEventListener('click', function () {
  clearInterval(countDown);
  minutes = currentSession;
  seconds = currentSession * 60;
  remainderSeconds = seconds % 60;
  displayTime();
  started = false;
  startTimerButton.textContent = 'Start';
  timeLeftDisplay.textContent = 'Session length:';
});