import Ball from "./ball.js";
import { Player, Opponent } from "./paddle.js";
import { isCollide } from "./utils.js";

const player = new Player(document.querySelector(".paddle.player"));
const opponent = new Opponent(
  document.querySelector(".paddle.opponent"),
  document.querySelector(".ball")
);
const ball = new Ball(document.querySelector(".ball"));

const startTextElem = document.querySelector(".start-text");
const playerScoreElem = document.querySelector(".score .player");
const opponentScoreElem = document.querySelector(".score .opponent");

let lastTime;
let playerScore = 0;
let opponentScore = 0;

const update = (time) => {
  let delta;

  if (!lastTime) {
    lastTime = time;
    return requestAnimationFrame(update);
  }

  delta = time - lastTime;
  lastTime = time;

  ball.update(delta);
  opponent.update(delta);

  const ballRect = ball.rect();
  const ballWidth = parseInt(getComputedStyle(ball.elem).width);

  if (
    (isCollide(player.rect(), ballRect) && ball.direction.x < 0) ||
    (isCollide(ballRect, opponent.rect()) && ball.direction.x > 0)
  )
    ball.onCollision(true);

  if (ballRect.x + ballWidth >= window.innerWidth) {
    ball.setUp();
    playerScore++;
    playerScoreElem.textContent = playerScore;
  }

  if (ballRect.x <= 0) {
    ball.setUp();
    opponentScore++;
    opponentScoreElem.textContent = opponentScore;
  }

  requestAnimationFrame(update);
};

const handleStart = () => {
  lastTime = null;
  playerScore = 0;
  opponentScore = 0;

  playerScoreElem.textContent = playerScore;
  opponentScoreElem.textContent = opponentScore;
  startTextElem.classList.add("hide");

  requestAnimationFrame(update);
};

document.addEventListener("keydown", handleStart, { once: true });
