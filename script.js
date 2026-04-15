const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const digits = "0123456789";

let stimulus = "";
let expectedKey = "";
let startTime = null;

let trials = 0;
let correct = 0;
let sumRT = 0;

const stimulusEl = document.getElementById("stimulus");
const trialsEl = document.getElementById("trials");
const correctEl = document.getElementById("correct");
const avgEl = document.getElementById("avg");

function generateStimulus() {
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
}

function reset() {
  trials = 0;
  correct = 0;
  sumRT = 0;
  updateStats();
  generateStimulus();
}

document.addEventListener("keydown", function (e) {
  const key = e.key.toUpperCase();

  if (!startTime) return;

  if (key === "A" || key === "L") {
    const rt = Date.now() - startTime;

    trials++;
    sumRT += rt;

    if (key === expectedKey) {
      correct++;
    }

    updateStats();
    generateStimulus();
  }

  if (key === " ") {
    reset();
  }
});

// start first stimulus
generateStimulus();