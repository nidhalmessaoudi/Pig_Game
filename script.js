'use strict';

// ELEMENTS
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const player0Score = document.getElementById("current--0");
const player1Score = document.getElementById("current--1");
const score0 = document.getElementById("score--0");
const score1 = document.getElementById("score--1");
const rollBtn = document.querySelector(".btn--roll");
const holdBtn = document.querySelector(".btn--hold");
const newBtn = document.querySelector(".btn--new");
const diceImg = document.querySelector(".dice");

// STATE
let gameState = true;


// STARTING CONDITIONS FUNCTION
const init = () => {
    player0Score.textContent = 0;
    player1Score.textContent = 0;
    score0.textContent = 0;
    score1.textContent = 0;
    diceImg.classList.add("hidden");
}
init();


const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let score = 0;


const switchPlayer = () => {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player0.classList.toggle("player--active");
    player1.classList.toggle("player--active");
}


// GAME IS ON

    // ROLL DICE FUNCTIONALITY
rollBtn.addEventListener("click", () => {
    // GAME IS ON
    if (gameState) {
        const diceNum = Math.trunc(Math.random() * 6) + 1;
        diceImg.classList.remove("hidden");
        diceImg.src = `dice-${diceNum}.png`;

        if (diceNum !== 1) {
            // ADD DICE TO CURRENT SCORE
            currentScore += diceNum;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;

        } else {
            // SWITCH PLAYER
            switchPlayer();
        }
    }

});

// HOLD SCORE FUNCTIONALITY
holdBtn.addEventListener("click", () => {
    if (gameState) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        if (scores[activePlayer] >= 100) {
            // END GAME
            gameState = false;
            diceImg.classList.add("hidden");
            document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
            document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
        } else {
            // SWITCH PLAYER
            switchPlayer();
        }
    }
});

// NEW GAME
newBtn.addEventListener("click", () => {
    init();
    gameState = true;
    document.querySelector(`.player--${activePlayer}`).classList.remove("player--winner");
    document.querySelector(`.player--0`).classList.add("player--active");
    document.querySelector(`.player--1`).classList.remove("player--active");
    scores[0] = 0;
    scores[1] = 0;
    activePlayer = 0;
});

