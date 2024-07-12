const timeDisplay = document.querySelector('.time-display');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const timeOptions = document.querySelectorAll('.time-options button');
const circle = document.querySelector('.progress-ring__circle');

let timer;
let time = 1500; // 25 minutes in seconds
let isRunning = false;
const radius = circle.r.baseVal.value;
const circumference = radius * 2 * Math.PI;

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = circumference;

function setProgress(percent) {
    const offset = circumference - (percent / 100 * circumference);
    circle.style.strokeDashoffset = offset;
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function updateDisplay() {
    timeDisplay.textContent = formatTime(time);
    setProgress((time / (25 * 60)) * 100);
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(() => {
            time--;
            updateDisplay();
            if (time === 0) {
                clearInterval(timer);
                isRunning = false;
            }
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    time = 1500;
    updateDisplay();
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

timeOptions.forEach(option => {
    option.addEventListener('click', function() {
        timeOptions.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        time = parseInt(this.dataset.time) * 60;
        updateDisplay();
    });
});

updateDisplay();