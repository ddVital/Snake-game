import { randomGridPosition } from "./grid.js";
import { expandSnake, onSnake } from "./snake.js";

let food = { x: 10, y: 1};
const EXPANSION_RATE = 1;

export function update() {
  if (onSnake(food)) {
    expandSnake(EXPANSION_RATE);
    food = getRandomFoodPosition();
  }
}

export function draw(gameBoard) {
  const foodElement = document.createElement('div');
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList = 'food';
  gameBoard.appendChild(foodElement);
}

function getRandomFoodPosition() {
  let newFoodPosition;
  while(newFoodPosition == null || onSnake(newFoodPosition)) {
    newFoodPosition = randomGridPosition();
  }

  return newFoodPosition
}