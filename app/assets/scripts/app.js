// Register service worker

if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('./sw.js', {
    scope: './'
  })
	.then(function(registration) {
		console.log('Yay!!')
	})
	.catch(function(error) {
		console.log('Failed to register because: ', error)
	})
};



   // Declare variables

  let currentSession = 25;
  let seconds = currentSession * 60; 
  let minutes = Math.floor(seconds / 60);
  let breakTime = 5;
  let remainderSeconds = seconds % 60; 
  let started = false;
  let breakStarted = false;
  let countDown;


  // Session length buttons

  const sessionLength = document.getElementById('session-num');
  sessionLength.textContent=(currentSession);


  // Break time buttons
  const breakLength = document.getElementById('break-num');
  breakLength.textContent=(breakTime);

  // Session length displayed
const timerDisplay = document.querySelector('#time');

  // Reamining time or break time text
const timeLeftDisplay = document.getElementById('timer__time-left');

// Start the timer

const startTimerButton = document.querySelector('#start-button');


const startButton =  startTimerButton.addEventListener('click', () =>{
  if (!started) {
    startTimer();
    startTimerButton.textContent=('Pause');
  }
  else if (started) {
    clearInterval(countDown);
    started = false;
    startTimerButton.textContent=('Start');
  }
});


// Start session timer

function startTimer(currentSession) { 
timeLeftDisplay.textContent=(`Time remaining:`);
  started = true;
  displayTime();
  countDown = setInterval(() => {
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
 timerDisplay.textContent = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
 if (minutes == currentSession) {
 }
 return;
}


// Increase session or break time

const increaseSession = document.getElementById('session-more');
const increaseBreakTime = document.getElementById('break-more');   

increaseSession.addEventListener('click', increaseTime);
increaseBreakTime.addEventListener('click', increaseTime);

function increaseTime(e) {

if(e.target == increaseSession){
currentSession++;
minutes = currentSession;
seconds = currentSession * 60; 
remainderSeconds = seconds % 60; 
displayTime();
sessionLength.textContent=(currentSession);
}
else if(e.target == increaseBreakTime) {
  breakTime++;
  breakLength.textContent=(breakTime);
}
} 

// Decrease session or break time

const reduceBreakTime = document.getElementById('break-less'); 
const reduceSession = document.getElementById('session-less');

reduceSession.addEventListener('click', decreaseTime);
reduceBreakTime.addEventListener('click', decreaseTime);

function decreaseTime(e) {

if(e.target == reduceSession){
  if(currentSession < 6) {
    return;
  }
  else {
currentSession--;
minutes = currentSession;
seconds = currentSession * 60; 
remainderSeconds = seconds % 60; 
displayTime();
sessionLength.textContent=(currentSession);
}
}

else if(e.target == reduceBreakTime) {
    if(breakTime < 2) {
    return;
  }
  else {
  breakTime--;
  breakLength.textContent=(breakTime);
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
  countDown = setInterval(() => {
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
 timeLeftDisplay.textContent = `Break time:`;
}, 1000);
}



// Reset the timer

const resetButton = document.querySelector('#reset-button');
const resetTimer =  resetButton.addEventListener('click', () =>{     
    clearInterval(countDown);
    minutes = currentSession;
    seconds = currentSession * 60;
    remainderSeconds = seconds % 60; 
     displayTime();
    started = false;
    startTimerButton.textContent=('Start');
    timeLeftDisplay.textContent=(`Session length:`);
});