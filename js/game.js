import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection } from './snake.js'
import { update as updatefood, draw as drawFood } from './food.js';
import { outsideGrid } from './grid.js';

let lastRenderTime = 0
let gameOver = false
const gameBoard = document.querySelector("#game-board")


function main(currentTime) {
  if (gameOver) {
    if (confirm('you lost! Press OK to restart')) {
      window.location = '/';
    }
    return
  }

  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return

  lastRenderTime = currentTime

  update()
  draw()
}

window.requestAnimationFrame(main)

function update() {
  updateSnake();
  updatefood();
  checkDeath();
}

function draw() {
  gameBoard.innerHTML = ''
  drawSnake(gameBoard)
  drawFood(gameBoard)
}

function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}