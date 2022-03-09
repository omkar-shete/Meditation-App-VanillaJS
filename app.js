// document.querySelector("video").playbackRate = 0.25;
// bcz .playbackRate is not in document.querySelector
//some properties are not in jQ bcz of "All"selector; that's why used DOM also


//DECLARATIONS
var song = document.querySelector(".song");
// var video = document.querySelector(".bg-video video");
var trackOutline = document.querySelector(".moving-track-outline circle");
var trackLength = trackOutline.getTotalLength();
var timeBtnList = document.querySelectorAll(".timer-section button");
let totalTime = 600; //just declaring
var soundBtnList = document.querySelectorAll(".sounds-section button");

app();


// -------
function app() {

  trackOutline.style.strokeDasharray = trackLength;
  trackOutline.style.strokeDashoffset = trackLength;
  document.querySelector(".time-display").innerText = `${Math.floor(totalTime/60)}:${totalTime%60}`;


  //SHOWING TIME AFTER BTN CLICKING
  timeBtnList.forEach(function(nthBtn) {
    nthBtn.addEventListener("click", function() {
      totalTime = nthBtn.dataset.time; //this.getAttribute("data-time")
      document.querySelector(".time-display").innerText = `${Math.floor(totalTime/60)}:${totalTime%60}`;
      checkPlaying(song);
    });
  });

  //CHANGING BG & SONG
  soundBtnList.forEach(function(nthBtn) {
    nthBtn.addEventListener("click", function(){
      let vidSrc = nthBtn.dataset.video;
      let audSrc = nthBtn.dataset.sound;
      document.querySelector("video").setAttribute("src", vidSrc);
      document.querySelector("audio").setAttribute("src", audSrc);
      document.querySelector("video").playbackRate = 0.5;
      document.querySelector(".play-btn").setAttribute("src", "svg/play.svg");
    });
  });

  // for (var i = 0; i < timeBtnList.length; i++) {
  //   timeBtnList[i].addEventListener("click",function(){
  //     var totalTime = timeBtnList[i].getAttribute("data-time");
  //     console.log(totalTime);
  //   });
  // }
  //alt to prev loop but not working----

  document.querySelector(".play-btn").addEventListener("click", function() {
    checkPlaying(song);
  });


  //PLAY/PAUSE using PLAY BTN
  function checkPlaying(song) {
    song.currentTime = 0;
    if (song.paused) {
      song.play();
      // video.play();
      document.querySelector(".play-btn").setAttribute("src", "svg/pause.svg");
      //animation start
    } else {
      song.pause();
      // video.pause();
      document.querySelector(".play-btn").setAttribute("src", "svg/play.svg");
      //stop animation...we're animating using song
    }
  }



  // RUNS WHEN SONG PLAYS
  song.ontimeupdate = function() {
    // TIME DISPLAYING
    var songTime = Math.floor(song.currentTime);
    var songTimeLeft = (totalTime - songTime);
    var songMinutes = Math.floor(songTimeLeft / 60);
    var songSeconds = songTimeLeft % 60;
    document.querySelector(".time-display").innerText = `${songMinutes}:${songSeconds}`;

    //ANIMATING THE OUTLINE
    var trackProgress = trackLength * (songTime / totalTime);
    trackOutline.style.strokeDashoffset = trackLength - trackProgress;
    //bcz every new strokeDashoffset resets the previous ones

    //PAUSING WHEN FINISHED
    if (songTime >= totalTime) {
      song.pause();
      song.currentTime = 0;
      document.querySelector(".play-btn").setAttribute("src", "svg/play.svg");
    }
  };

} //app
