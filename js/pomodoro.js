 

    $('document').ready(function() {

    var i = 0;
    var j = 0;
    var sessionLength = 25;
    var breakTime = 5;
    var timer = 0;
    var seconds;
    var onlyseconds;
    var minutes;

      /* Buttons */

      $('#session-more').click(function() {
        Math.round(sessionLength++);
        $('#session-num').html(sessionLength.toFixed(0));
        $('#time').html(sessionLength.toFixed(0)+":00");
      });
      $('#session-less').click(function() {
        if (sessionLength > 1) {
          sessionLength--;
          $('#time').html(sessionLength.toFixed(0)+":00");
        }
        $('#session-num').html(sessionLength.toFixed(0));
      });
      $('#break-more').click(function() {
        breakTime++;
        $('#break-num').html(breakTime);
      });
      $('#break-less').click(function() {
        if (breakTime > 1) {
          breakTime--;
        }
        $('#break-num').html(breakTime);
      });

      $('#start-button').click(function() {

        switch (i) {

          case 0:      
            currentSession = sessionLength;
            seconds = currentSession * 60;
            minutes = Math.round(currentSession);
            onlyseconds = 0;
            i = 1;
            if (j === 0 ) {
              started();  
            }
            else
              breakTimeStart();
            break;

          case 1:
            i = 0;
            stopped();
            break;
        }
      });

      function started() {
        $('#reset-button').hide();
        currentSession = sessionLength;
         $('#start-button').text('Pause');
        j = 0;
        $('#remaining-time').html('Time remaining:');
        seconds -= 1;
        if (onlyseconds <= 0.999) {
          minutes--;
        }
        onlyseconds = seconds % 60;
        onlyseconds = onlyseconds.toFixed(0);
        if (onlyseconds < 10) {
          onlyseconds = '0' + onlyseconds;
        }
        $('#time').html(minutes + ':' + onlyseconds);
        if (minutes < 0) {
          $('#time').html('0:00');
        }
  
        if (minutes >= 0) {
          timer = setTimeout(function() {
            started();
          }, 1000);
        } else {
          playSound();
          breakTimeStart();
        }
      };

      function breakTimeStart() {
        j = 1;
        currentSession = breakTime;
        seconds = currentSession * 60;
        minutes = currentSession;
        onlyseconds = 0;
        
        breaktime();
      };

      function breaktime() {
        $('#remaining-time').html('Break time');
        seconds -= 1;
        if (onlyseconds <= 0.999) {
          minutes--;
        }
        onlyseconds = seconds % 60;
        onlyseconds = onlyseconds.toFixed(0);
        if (onlyseconds < 10) {
          onlyseconds = '0' + onlyseconds;
        }
        $('#time').html(minutes + ':' + " " + onlyseconds);
        if (minutes < 0) {
          $('#time').html('0:00');
        }
        if (minutes >= 0) {
          timer = setTimeout(function() {
            breaktime();
          }, 1000);
        } else {
          playSound();
        }
      }
      if (minutes < 0) {
        $('#time').html('0:00');
      }

      function stopped() {
        $('#reset-button').show();
        sessionLength = seconds / 60;
        clearTimeout(timer);
        $('#start-button').text('Start');
      }

      /* Play sound */

      function playSound() {
        var gong = new Audio('Temple_Bell.mp3');
        gong.play();
      }

      /* Reset button */

      $('#reset-button').click(function() {
        clearTimeout(timer);
        i = 0;
        j = 0;
        breakTime = 6;
        timer = 0;
        seconds = currentSession * 60;
        onlyseconds = 0;
        minutes = 0;
        sessionLength = currentSession;
        $('#start-button').text('Start');
        $('#time').html(Math.round(currentSession)+":00");
      });

    });


  // Source: http://www.antiyes.com/jquery-blink-plugin
// http://www.antiyes.com/jquery-blink/jquery-blink.js
//(function($) {
  // $.fn.blink = function(options) {
      //  var defaults = {
        //    delay: 500
       // };
       // var options = $.extend(defaults, options);

      //  return this.each(function() {
      //      var obj = $(this);
      //      setInterval(function() {
       //         if ($(obj).css("visibility") == "visible") {
       //             $(obj).css('visibility', 'hidden');
       //         }
       //         else {
       //             $(obj).css('visibility', 'visible');
       //         }
      //      }, options.delay);
      //  });
   // }
//}(jQuery)) 

/////////////////////////////////////////////
///////////////////////////////////////////// 
/////////////////////////////////////////////

/// $(document).ready(function() {
 // default is 500ms blink interval.
   // $('.blink_second').blink({
       // delay: 100
   // }); // causes a 100ms blink interval.
   // $('.blink_third').blink({
     //   delay: 1500
  //  }); // causes a 1500ms blink interval.     
//});

/////////////////////////////////////////////
///////////////////////////////////////////// 
///////////////////////////////////////////// 