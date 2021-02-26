let score = 0

export function updateScore() {
  score = score + 1;
  showScore();
}
  
function showScore() {
  const showScore = document.querySelector('.score');
  showScore.innerHTML = score;
}

export function eatSoundEffect() {
  const audio = new Audio('/sounds/snake_eating.mp3');
  audio.play();
}