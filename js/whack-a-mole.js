const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const startButton = document.querySelector('.play-button');
const gameBoard = document.querySelector('.game');
const timer = document.querySelector('.countdown');



let lastHole;
let timeUp = false;
let score;
let timeLeft = 30;

let randomTime = (min, max) => {
  return Math.random() * (max - min) + min;
}

let randomHole = (holes) => {
  // console.log("Hole: ",holes);
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if (hole === lastHole) {
    console.log('Ah same value..')
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

let peep = () => {
  const time = randomTime(200, 1000);
  const hole = randomHole(holes);
  hole.classList.add('up');

  setTimeout(() => {
    hole.classList.remove('up');
    if (!timeUp) peep();
  }, time);
}

let startGame = () => {
  timer.textContent = timeLeft;
  timer.classList.add('show');
  startButton.classList.add('hide');
  gameBoard.classList.add('start');
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  peep();
  countDown()
  setTimeout(() => {
    timeUp = true
  }, 30000);
}

let bonk = (e) => {
  if (!e.isTrusted === true) return; //Cheater!!
  score++;
  scoreBoard.textContent = score;
}


moles.forEach(mole => mole.addEventListener('click', bonk));

let countDown = () => {
  timer.textContent = timeLeft;

  let timeOfMyGame = setInterval(() => {
    timeLeft--;
    timer.textContent = timeLeft;
    console.log(timeLeft);
    if (timeLeft <= 15) {
      timer.classList.add('halfway');
    }

    if (timeLeft <= 10) {
      timer.classList.remove('halfway');
      timer.classList.add('ending');
    }

    if (timeLeft === 0) {

      clearInterval(timeOfMyGame);
    }
  }, 1000)


}