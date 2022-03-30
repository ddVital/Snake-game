let canvas = document.getElementById("snake"); // criar elemento que irá rodar o jogo
let context = canvas.getContext("2d");
let box = 32;
let score = 0;
let sound = true;
context.imageSmoothingQuality = 'high';

let snake = []; // criar cobrinha como lista, já que ela vai ser uma série de coordenadas, que quando pintadas, criam os quadradinhos
snake[0] = {
    x: 8 * box,
    y: 8 * box
};

let direction = "right";

let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function createBG() {
    context.fillStyle = "#77B255";
    context.fillRect(0,0,16 * box, 16 * box); // desenha o retângulo usando x e y e a largura e altura setadas
}

function createSnake() {
    const eyes = new Image();
    eyes.src = '/img/snake_eyes.png'
    for (i = 0; i < snake.length; i++) {
        context.fillStyle = "#1089cf";
        if (i === 0) {
            context.fillStyle = "#1089be";
            // context.drawImage(eyes, snake[i], snake[i]);
        }
        context.fillRect(snake[i].x, snake[i].y, box, box);
        
    }
}

function createFood() {
    const apple = new Image();
    apple.src = '/img/apple.svg';
    context.fillStyle = 'transparent';
    context.drawImage(apple, food.x, food.y);
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update); // quando um evento acontece, detecta e chama uma função

function update(event) {
    if (event.keyCode == 37 && direction != 'right') direction = 'left';
    if (event.keyCode == 38 && direction != 'down') direction = 'up';
    if (event.keyCode == 39 && direction != 'left') direction = 'right';
    if (event.keyCode == 40 && direction != 'up') direction = 'down';
}

function startGame() {
    if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if (snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if (snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;

    for (i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            soundEffect('gameover')
            clearInterval(game);
            alert('Game Over :(');
        }
    }

    createBG();
    createSnake();
    createFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if( direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    if (snakeX != food.x || snakeY != food.y) {
        snake.pop(); // pop removes the last element
    } else {
        soundEffect('eat');
        updateScore();
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    snake.unshift(newHead); // método unshift adiciona o primeiro quadrado da cobrinha
}

function updateScore() {
    score = score + 1;
    showScore();
}

function showScore() {
    const showScore = document.querySelector('#score');
    showScore.innerHTML = score;
}

function soundEffect(fileName) {
    const audio = new Audio(`/assets/${fileName}.mp3`);
    if (sound) audio.play();
}

function mute() {
    const speaker = document.querySelector('#sound');
    speaker.addEventListener('click', () => {
        sound = !sound;
        speaker.src = `/img/${sound ? 'on' : 'off'}.svg`;
    })
}

mute()

let game = setInterval(startGame, 120);