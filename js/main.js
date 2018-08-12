window.addEventListener('load', init);

const levels = {
  easy: 5,
  medium: 3,
  hard: 2
}

let currentLevel = levels.easy;

let time = currentLevel;
let score = 0;
let isPlaying;

const buttons = document.querySelectorAll('.btn');
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');

const words = [
  'hat',
  'river',
  'lucky',
  'statue',
  'generate',
  'stubborn',
  'cocktail',
  'runaway',
  'joke',
  'developer',
  'establishment',
  'hero',
  'javascript',
  'nutrition',
  'revolver',
  'echo',
  'sibling',
  'symptom',
  'laughter',
  'magic',
  'master',
  'space',
  'definition'
];

function setCurrentLevel() {
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function () {
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('btn-outline-success');
      }
      this.classList.add('btn-outline-success');

      switch (this.innerText) {
        case 'Easy':
          currentLevel = levels.easy;
          break;
        case 'Medium':
          currentLevel = levels.medium;
          break;
        case 'Hard':
          currentLevel = levels.hard;
          break;
      }
      seconds.innerText = currentLevel;
    });
  }
}

function init() {
  setCurrentLevel();
  seconds.innerText = currentLevel;
  loadWord(words);
  wordInput.addEventListener('input', startMatch);
  setInterval(countdown, 1000);
  setInterval(checkStatus, 50);
}

function startMatch() {
  if (matchWord()) {
    isPlaying = true;
    time = currentLevel + 1;
    loadWord(words);
    wordInput.value = '';
    score++;
  }

  scoreDisplay.innerText = score === -1 ? 0 : score;
}

function matchWord() {
  if (wordInput.value === currentWord.innerText) {
    message.innerText = 'CORRECT';
    makeMessageVisible('success');
    return true;
  } else {
    message.innerText = 'MESSAGE';
    hideMessage();
    return false;
  }
}

function loadWord(words) {
  const randomIndex = Math.floor(Math.random() * words.length);
  currentWord.innerText = words[randomIndex];
}

function countdown() {
  if (time > 0) {
    time--;
  } else if (time === 0) {
    isPlaying = false;
  }
  timeDisplay.innerText = time;
}

function checkStatus() {
  if (!isPlaying && time === 0) {
    message.innerText = 'GAME OVER';
    makeMessageVisible('danger');

    score = -1;
  }
}

function makeMessageVisible(colorType) {
  message.classList.remove('text-dark', 'text-danger', 'text-success');
  message.classList.add(`text-${colorType}`);
}

function hideMessage() {
  message.classList.add('text-dark');
}