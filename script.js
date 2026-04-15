const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const digits = "0123456789";

let stimulus = "";
let expectedKey = "";
let startTime = null;

let trials = 0;
let correct = 0;
let sumRT = 0;

let wrongAttempts = 0;
let gameStarted = false;
let gameOver = false;

const stimulusEl = document.getElementById("stimulus");
const trialsEl = document.getElementById("trials");
const correctEl = document.getElementById("correct");
const avgEl = document.getElementById("avg");
const livesEl = document.getElementById("lives");
const statusEl = document.getElementById("status");
const startScreen = document.getElementById("startScreen");

function generateStimulus() {
  stimulusEl.classList.remove("correct", "wrong");

  const isLetter = Math.random() < 0.5;

  if (isLetter) {
    stimulus = letters[Math.floor(Math.random() * letters.length)];
    expectedKey = "A";
  } else {
    stimulus = digits[Math.floor(Math.random() * digits.length)];
    expectedKey = "L";
  }

  stimulusEl.textContent = stimulus;
  startTime = Date.now();
}

function updateStats() {
  trialsEl.textContent = trials;
  correctEl.textContent = correct;
  avgEl.textContent = trials === 0 ? 0 : (sumRT / trials).toFixed(2);
  livesEl.textContent = 5 - wrongAttempts;
}

function startGame() {
  gameStarted = true;
  gameOver = false;
  wrongAttempts = 0;
  trials = 0;
  correct = 0;
  sumRT = 0;

  startScreen.style.display = "none";
  statusEl.textContent = "Game Started!";
  updateStats();
  generateStimulus();
}

function endGame() {
  gameOver = true;
  stimulusEl.textContent = "GAME OVER";
  statusEl.textContent = "You lost! Press SPACE to restart";
}

function resetGame() {
  gameStarted = false;
  gameOver = false;
  startScreen.style.display = "block";

  stimulusEl.textContent = "?";
  statusEl.textContent = "Waiting to start...";
}

document.addEventListener("keydown", function (e) {
  const key = e.key.toUpperCase();

  // START OR RESTART
  if (key === " ") {
    if (!gameStarted || gameOver) {
      startGame();
    }
    return;
  }

  if (!gameStarted || gameOver || !startTime) return;

  if (key === "A" || key === "L") {
    const rt = Date.now() - startTime;

    trials++;
    sumRT += rt;

    stimulusEl.classList.remove("correct", "wrong");

    if (key === expectedKey) {
      correct++;
      stimulusEl.classList.add("correct");
    } else {
      wrongAttempts++;
      stimulusEl.classList.add("wrong");
    }
    
    updateStats();
    if (wrongAttempts >= 5) {
      endGame();
      return;
    }
    generateStimulus();
  }
});