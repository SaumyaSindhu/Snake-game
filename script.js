const board = document.querySelector(".board");
const startButton = document.querySelector(".btn-start");
const model = document.querySelector(".model");
const startGameModel = document.querySelector(".start-game");
const gameOverModel = document.querySelector(".game-over");
const restartButton = document.querySelector(".btn-restart");

const highScoreElement = document.querySelector("#high-score");
const scoreElement = document.querySelector("#score");
const timeElement = document.querySelector("#time");

const blockHeight = 50;
const blockWidth = 50;

let highScore = localStorage.getItem("highScore") || 0; // we used (|| 0) for passing 0 instead of undefined is value is not found of in localStorage
let score = 0;
let time = `00-00`;

highScoreElement.innerText = highScore;

const cols = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);
let intervalId = null;
let timerIntervalId = null;

const blocks = [];
let snake = [{ x: 1, y: 3 }];

// let food = {
//   x: Math.floor(Math.random() * rows),
//   y: Math.floor(Math.random() * cols),
// };

// could have used above code for generating food on random places but it will also generate food on the body of snake
let food = generateFood();

let direction = "down";

// for(let i = 0; i < rows * cols; i++) {
//     const block = document.createElement("div");
//     block.classList.add("block");
//     board.appendChild(block);
// }

// gives same result as above 
for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const block = document.createElement("div");
    block.classList.add("block");
    board.appendChild(block);
    // block.innerText = `${row}-${col}`;
    blocks[`${row}-${col}`] = block;
  }
}

// Prevent food from spawning on snake body (added by myself)
function generateFood() {
  let newFood;
  let isOnSnake;

  do {
    newFood = {
      x: Math.floor(Math.random() * rows),
      y: Math.floor(Math.random() * cols),
    };

    isOnSnake = snake.some(
      (segment) => segment.x === newFood.x && segment.y === newFood.y,
    );
  } while (isOnSnake);

  return newFood;
}


function render() {
  let head = null;

  blocks[`${food.x}-${food.y}`].classList.add("food");

  if (direction === "left") {
    head = { x: snake[0].x, y: snake[0].y - 1 };
  } else if (direction === "right") {
    head = { x: snake[0].x, y: snake[0].y + 1 };
  } else if (direction === "down") {
    head = { x: snake[0].x + 1, y: snake[0].y };
  } else if (direction === "up") {
    head = { x: snake[0].x - 1, y: snake[0].y };
  }

  // self-collision logic (added by myself)
  for (let i = 0; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      clearInterval(intervalId);
      clearInterval(timerIntervalId);

      model.style.display = "flex";
      startGameModel.style.display = "none";
      gameOverModel.style.display = "flex";
      return;
    }
  }

  // wall collision logic
  if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
    clearInterval(intervalId);

    model.style.display = "flex";
    startGameModel.style.display = "none";
    gameOverModel.style.display = "flex";

    return;
  }

  // food consume logic
  if (head.x == food.x && head.y == food.y) {
    blocks[`${food.x}-${food.y}`].classList.remove("food");
    food = generateFood();

    blocks[`${food.x}-${food.y}`].classList.add("food");

    snake.unshift(head);

    score += 10;
    scoreElement.innerText = score;

    if (score > highScore) {
      highScore = score;
      localStorage.setItem("highScore", highScore.toString());
    }
  }

  snake.forEach((segment) => {
    blocks[`${segment.x}-${segment.y}`].classList.remove("fill", "head");
  });

  // for moving the snake
  snake.unshift(head);
  snake.pop();

  // snake drawing logic with head of different color
  snake.forEach((segment, index) => {
    if (index === 0) {
      blocks[`${segment.x}-${segment.y}`].classList.add("head");
    } else {
      blocks[`${segment.x}-${segment.y}`].classList.add("fill");
    }
  });

}

// intervalId = setInterval(() => {
//   render();
// }, 300);

// above code is for starting the game again and again that is why it is used inside the startButton function so that the game renders only when the button is clicked
startButton.addEventListener("click", () => {
  model.style.display = "none";
  intervalId = setInterval(() => {
    render();
  }, 300);

  timerIntervalId = setInterval(() => {
    let [min, sec] = time.split("-").map(Number)

    if (sec == 59) {
      min += 1
      sec = 0
    }else {
      sec += 1;
    }
    
    time = `${min}-${sec}`; 
    timeElement.innerText = time;
  },1000);
});

// restartGame() function is directly passed in the event listener
restartButton.addEventListener("click", restartGame);

function restartGame() {
  blocks[`${food.x}-${food.y}`].classList.remove("food");
  snake.forEach((segment) => {
    blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
  });
  score = 0;
  time = `00-00`
  scoreElement.innerText = score;

  scoreElement,innerText = score;
  timeElement.innerText = time;
  highScore.innerText = highScore;

  model.style.display = "none";
  direction = "down";
  snake = [{ x: 1, y: 3 }];
  food = generateFood();

  intervalId = setInterval(() => {
    render();
  }, 200);
}

addEventListener("keydown", (event) => {
  if (event.key == "ArrowUp") {
    direction = "up";
  } else if (event.key == "ArrowRight") {
    direction = "right";
  } else if (event.key == "ArrowLeft") {
    direction = "left";
  } else if (event.key == "ArrowDown") {
    direction = "down";
  }
});
