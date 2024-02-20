const timerLabel = document.getElementById("timer");
const minutesLabel = document.getElementById("minutes");
const secondsLabel = document.getElementById("seconds");
const millisecondsLabel = document.getElementById("milliseconds");
const reloader = document.getElementById("ohfuck");

const playBtn = document.getElementById("playpause");
const lapBtn = document.getElementById("lapbtn");
const resetBtn = document.getElementById("reset");
const iPlay = document.getElementById("play-pause-id");

const lap = document.getElementById("lap");
const laplist = document.getElementById("lap-list");

const imgid = document.getElementById("bgimg");

let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let interval;

window;
if (window.screen.width > 320 && window.screen.width <= 390) {
  imgid.src = "portrait.webp";
}

reloader.addEventListener("click", function () {
  location.reload();
});

playBtn.addEventListener("click", function () {
  if (iPlay.classList.contains("ri-play-circle-fill")) {
    iPlay.classList.remove("ri-play-circle-fill");
    iPlay.classList.add("ri-pause-circle-fill");
    startTimer();
    timerLabel.style.backgroundColor = "rgba(0, 0, 0, 0.81)";
    timerLabel.style.color = "#fff";
    document.getElementById("minutes").style.color = "#fff";
    document.getElementById("seconds").style.color = "#fff";
    document.getElementById("milliseconds").style.color = "#fff";
  } else {
    iPlay.classList.remove("ri-pause-circle-fill");
    iPlay.classList.add("ri-play-circle-fill");
    timerLabel.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
    timerLabel.style.color = "rgba(255, 0, 0, 0.6)";
    document.getElementById("minutes").style.color = "rgba(255, 0, 0, 0.6)";
    document.getElementById("seconds").style.color = "rgba(255, 0, 0, 0.6)";
    document.getElementById("milliseconds").style.color =
      "rgba(255, 0, 0, 0.6)";
    pauseTimer();
  }
});

resetBtn.addEventListener("click", function () {
  resetTimer();
});

lapBtn.addEventListener("click", function () {
  stopTimer();
});

const updateTimer = function () {
  milliseconds++;
  if (milliseconds === 100) {
    milliseconds = 0;
    seconds++;
    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }
  }

  displayTimer();
};

const displayTimer = function () {
  millisecondsLabel.textContent = padTime(milliseconds);
  secondsLabel.textContent = padTime(seconds);
  minutesLabel.textContent = padTime(minutes);
};

const startTimer = function () {
  interval = setInterval(updateTimer, 10);
};

const padTime = function (ohhh) {
  return ohhh.toString().padStart(2, "0");
};

const pauseTimer = function () {
  clearInterval(interval);
};

const stopTimer = function () {
  addToLapList();
  resetTimer();
  timerLabel.style.backgroundColor = "rgba(0, 0, 0, 0.81)";
  timerLabel.style.color = "#fff";
  document.getElementById("minutes").style.color = "#fff";
  document.getElementById("seconds").style.color = "#fff";
  document.getElementById("milliseconds").style.color = "#fff";
};

const addToLapList = function () {
  const laptime = `${padTime(minutes)}:${padTime(seconds)}:${padTime(
    milliseconds
  )}`;
  console.log(laptime);
  const maxlaps = 7;

  const str = `<ul id="lap-list">Lap ${lap.childElementCount} : ${laptime}</ul>`;
  lap.insertAdjacentHTML("beforeend", str);
  if (lap.childElementCount >= maxlaps) {
    alert(`You have reached the maximum number of laps!`);
    lap.lastChild.remove();
    resetTimer();
    location.reload();
  }
};

const resetTimer = function () {
  pauseTimer();
  milliseconds = 0;
  seconds = 0;
  minutes = 0;
  displayTimer();
  if (iPlay.classList.contains("ri-pause-circle-fill")) {
    iPlay.classList.remove("ri-pause-circle-fill");
    iPlay.classList.add("ri-play-circle-fill");
  }
  timerLabel.style.backgroundColor = "rgba(0, 0, 0, 0.81)";
  timerLabel.style.color = "#fff";
  document.getElementById("minutes").style.color = "#fff";
  document.getElementById("seconds").style.color = "#fff";
  document.getElementById("milliseconds").style.color = "#fff";
};
