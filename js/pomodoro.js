       // Declare variables

      let currentSession = 25;
      let seconds = currentSession * 60; 
      let minutes = Math.floor(seconds / 60);
      let breakTime = 5;
      let remainderSeconds = seconds % 60; 
      let started = false;
      let countDown;


      // Session length buttons

      const sessionLength = document.querySelector('#session-num');
      sessionLength.textContent=(currentSession);

      // Break time buttons
      const breakLength = document.querySelector('#break-num');
      breakLength.textContent=(breakTime);

      // Session length displayed
    const timerDisplay = document.querySelector('#time');


    // Start the timer

    const startTimerButton = document.querySelector('#start-button');


    startButton(){

      if (!started) {
        startTimerButton.addEventListener('click', () =>{
        startTimer();
        startTimerButton.textContent=('Pause');
      })
      }
      else if (started) {
        startTimerButton.addEventListener('click', () =>{
        clearInterval(countDown);
      console.log('nope.');
      })
    }
        }



function startTimer(sessionLength) { 
  countDown = setInterval(() => {
    seconds--;
    minutes = Math.floor(seconds / 60);
    remainderSeconds = seconds % 60; 
    
    started = true;
    console.log(minutes);
    console.log(seconds);

if (seconds < 0) {
  clearInterval(countDown);
  currentSession = breakTime;
  seconds = breakTime * 60;
  startBreakTimer(breakTime);
  playSound();
}
displayTime();
}, 1000);
}

function displayTime() {
 timerDisplay.textContent = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
}

      const increaseSession = document.getElementById('session-more');
      const increaseBreakTime = document.getElementById('break-more');   

increaseSession.addEventListener('click', increaseTime);
increaseBreakTime.addEventListener('click', increaseTime);


// Increase session or break time

function increaseTime(e) {

if(e.target == increaseSession){
currentSession++;
minutes = currentSession;
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
currentSession--;
minutes = currentSession;
displayTime();
sessionLength.textContent=(currentSession);
}

else if(e.target == reduceBreakTime) {
  breakTime--;
  breakLength.textContent=(breakTime);
}
} 

// Play a sound when timer has finished

      function playSound() {
        var gong = new Audio('Temple_Bell.mp3');
        gong.play();
      }

