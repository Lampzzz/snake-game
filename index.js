const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const grid = 16;
let score = 0;
let gameSpeed = 0;

// snake default position and length
const snake = {
  x: 160,
  y: 160,
  dx: grid,
  dy: 0,
  cells: [],
  maxCells: 4,
};

// apple default position
const apple = {
  x: randomAppleSpawn(0, 25) * grid,
  y: randomAppleSpawn(0, 25) * grid,
};

function randomAppleSpawn(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function game() {
  requestAnimationFrame(game);

  if (++gameSpeed < 5) return;
  gameSpeed = 0;

  context.clearRect(0, 0, canvas.width, canvas.height);

  // snake movement
  snake.x += snake.dx;
  snake.y += snake.dy;

  // add cell to front
  snake.cells.unshift({ x: snake.x, y: snake.y });

  // remove cell in back
  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }

  // game over when crash in border
  if (
    snake.x >= canvas.width ||
    snake.y >= canvas.height ||
    snake.x < 0 ||
    snake.y < 0
  ) {
    alert("Game Over");
    reset();
  }

  // apple
  context.fillStyle = "red";
  context.fillRect(apple.x, apple.y, grid - 1, grid - 1);

  snake.cells.forEach(function (cell, index) {
    context.fillStyle = "green";
    context.fillRect(cell.x, cell.y, grid - 1, grid - 1);

    if (cell.x === apple.x && cell.y === apple.y) {
      snake.maxCells++;
      score++;

      apple.x = randomAppleSpawn(0, 25) * grid;
      apple.y = randomAppleSpawn(0, 25) * grid;
    }

    for (let i = index + 1; i < snake.cells.length; i++) {
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        reset();
      }
    }
  });
}

// Game Reset
function reset() {
  snake.x = 160;
  snake.y = 160;
  snake.cells = [];
  snake.maxCells = 4;
  snake.dx = grid;
  snake.dy = 0;

  apple.x = randomAppleSpawn(0, 25) * grid;
  apple.y = randomAppleSpawn(0, 25) * grid;
}

// Snake Direction
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowUp" && snake.dy === 0) {
    snake.dy = -grid;
    snake.dx = 0;
  } else if (e.key === "ArrowDown" && snake.dy === 0) {
    snake.dy = grid;
    snake.dx = 0;
  } else if (e.key === "ArrowRight" && snake.dx === 0) {
    snake.dy = 0;
    snake.dx = grid;
  } else if (e.key === "ArrowLeft" && snake.dx === 0) {
    snake.dy = 0;
    snake.dx = -grid;
  }
});

requestAnimationFrame(game);
