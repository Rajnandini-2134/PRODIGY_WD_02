// script.js
let startTime = 0;
let elapsedTime = 0;
let timerInterval;
const displayMinutes = document.getElementById("minutes");
const displaySeconds = document.getElementById("seconds");
const displayMilliseconds = document.getElementById("milliseconds");
const lapsList = document.getElementById("laps");

function formatTime(time) {
    const milliseconds = Math.floor((time % 1000) / 10);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);

    return {
        minutes: minutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0"),
        milliseconds: milliseconds.toString().padStart(2, "0"),
    };
}

function updateDisplay() {
    const { minutes, seconds, milliseconds } = formatTime(elapsedTime);
    displayMinutes.textContent = minutes;
    displaySeconds.textContent = seconds;
    displayMilliseconds.textContent = milliseconds;
}

function startTimer() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        updateDisplay();
    }, 10);
}

function pauseTimer() {
    clearInterval(timerInterval);
}

function resetTimer() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    updateDisplay();
    lapsList.innerHTML = "";
}

function recordLap() {
    const { minutes, seconds, milliseconds } = formatTime(elapsedTime);
    const lapItem = document.createElement("li");
    lapItem.textContent = `${minutes}:${seconds}:${milliseconds}`;
    lapsList.appendChild(lapItem);
}

document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("pause").addEventListener("click", pauseTimer);
document.getElementById("reset").addEventListener("click", resetTimer);
document.getElementById("lap").addEventListener("click", recordLap);
