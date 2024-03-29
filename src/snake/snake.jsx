import React, { useState, useEffect } from 'react';
import './snake.css';

let START = 0;
let SCORE = 0;
let MOVED = 0;
const SIZE = 19;
const MIN = 0;
const mapper = {
  37: 'ArrowLeft',
  38: 'ArrowUp',
  39: 'ArrowRight',
  40: 'ArrowDown'
};

/**
 * randGrid - Generates array containing potential food positions
 * @snakePos: Array with all snake positions
 *
 * Return: Generated array
 */
function randGrid (snakePos) {
  const grid = [];

  for (let row = 0; row < SIZE; ++row) {
    for (let col = 0; col < SIZE; ++col) {
      grid.push({
        row, col
      });
    }
  }

  for (let i = 0; i < snakePos.length; ++i) {
    const idx = grid.findIndex(obj => obj.row === snakePos[i].row &&
      obj.col === snakePos[i].col);
    if (idx > -1) grid.splice(idx, 1);
  }

  return grid;
}

/**
 * random - Generates random number not contained within snake
 * @snake: snake object
 * @setFood: Function to modify food
 *
 * Return: Pseudo-random number
 */
function random (snake, setFood) {
  if (!setFood && START) return;

  let snakePos = [];

  if (setFood) {
    snakePos = snake.tail.slice();
    snakePos.push(Object.assign({}, snake.head));
    snakePos.push(Object.assign({}, snake.neck));
  }
  const grid = randGrid(snakePos);
  const randNum = Math.floor(Math.random() * (grid.length));

  if (!setFood) return grid[randNum];

  if (grid.length === 0) {
    console.log('Grid filled');
    return;
  }
  setFood(food =>
    ({ ...food, row: grid[randNum].row, col: grid[randNum].col }));
}

/**
 * initGrid - Creates a grid
 *
 * Return: Created grid
 */
function initGrid () {
  const grid = [];
  for (let row = 0; row < SIZE; ++row) {
    const cols = [];
    for (let col = 0; col < SIZE; ++col) {
      cols.push({
        row,
        col
      });
    }
    grid.push(cols);
  }
  return grid;
}

/**
 * initGame - Creates snake object
 *
 * Return: Snake object
 */
function initSnake () {
  // if (START) return;

  return {
    grid: initGrid(),
    head: {
      row: Math.floor(SIZE / 2),
      col: Math.floor(SIZE / 2)
    },
    neck: {
      row: Math.floor(SIZE / 2),
      col: Math.floor(SIZE / 2)
    },
    tail: [],
    direction: null
  };
}

/**
 * eatFood - Checks if snake position overlaps food and increments score
 * @snake: snake object
 * @food: food object
 * @setSnake: Function to set snake
 * @setFood: Function to set food
 */
function eatFood (snake, food, setSnake, setFood) {
  if (snake.head.row !== food.row || snake.head.col !== food.col) {
    snakeCrash(snake, setSnake);
  } else if (snake.head.row === food.row && snake.head.col === food.col) {
    random(snake, setFood);
    snake.tail.push(snake.head);
    ++SCORE;
  }
}

/**
 * snakeCrash - Checks if snake has left grid or collided with tail
 * @snake: snake object
 * @setSnake: Function to set snake
 */
function snakeCrash (snake, setSnake) {
  if (snake.head.row < MIN || snake.head.row === SIZE ||
    snake.head.col < MIN || snake.head.col === SIZE ||
    snake.tail.find((e) =>
      e.row === snake.head.row && e.col === snake.head.col)) {
    setSnake(snake => ({ ...snake, direction: null }));
  }
}

/**
 * displayGrid - Changes cell's className according to position in cell
 *
 * Return: Div tag containing correct className for each cell
 */
function DisplayGrid () {
  const [snake, setSnake] = useState(initSnake());

  !snake.direction ? START = 0 : START = 1;
  const [food, setFood] = useState(random([{
    row: Math.floor(SIZE / 2),
    col: Math.floor(SIZE / 2)
  }]));
  const direction = {
    left: {
      ...snake,
      head: { row: snake.head.row, col: snake.head.col - 1 },
      neck: { row: snake.head.row, col: snake.head.col }
    },
    up: {
      ...snake,
      head: { row: snake.head.row - 1, col: snake.head.col },
      neck: { row: snake.head.row, col: snake.head.col }
    },
    right: {
      ...snake,
      head: { row: snake.head.row, col: snake.head.col + 1 },
      neck: { row: snake.head.row, col: snake.head.col }
    },
    down: {
      ...snake,
      head: { row: snake.head.row + 1, col: snake.head.col },
      neck: { row: snake.head.row, col: snake.head.col }
    }
  };

  const newDirection = e => {
    e.view.event.preventDefault();
    if (!snake.direction) {
      SCORE = 0;
      setSnake(snake => (initSnake()));
      setSnake(snake => ({ ...snake, direction: mapper[e.keyCode] }));
    } else if (MOVED === 1 && (snake.direction === 'ArrowUp' ||
      snake.direction === 'ArrowDown') &&
      (mapper[e.keyCode] === 'ArrowLeft' ||
        mapper[e.keyCode] === 'ArrowRight')) {
      setSnake(snake => ({ ...snake, direction: mapper[e.keyCode] }));
    } else if (MOVED === 1 && (snake.direction === 'ArrowLeft' ||
      snake.direction === 'ArrowRight') &&
      (mapper[e.keyCode] === 'ArrowUp' ||
        mapper[e.keyCode] === 'ArrowDown')) {
      setSnake(snake => ({ ...snake, direction: mapper[e.keyCode] }));
    }
    MOVED = 0;
  };

  useEffect(() => {
    window.addEventListener('keydown', newDirection);
    return () =>
      window.removeEventListener('keydown', newDirection);
  });

  useEffect(() => {
    const onTick = () => {
      if (snake.direction === 'ArrowLeft') {
        setSnake(snake => (direction.left));
      } else if (snake.direction === 'ArrowUp') {
        setSnake(snake => (direction.up));
      } else if (snake.direction === 'ArrowRight') {
        setSnake(snake => (direction.right));
      } else if (snake.direction === 'ArrowDown') {
        setSnake(snake => (direction.down));
      }
      MOVED = 1;

      eatFood(snake, food, setSnake, setFood);
      if (snake.direction) {
        for (let i = snake.tail.length - 1; i > -1; --i) {
          if (i > 0) snake.tail[i] = snake.tail[i - 1];
          else snake.tail[i] = snake.head;
        }
      }
    };
    const interval = setInterval(onTick, 100);
    return () => clearInterval(interval);
  });

  const cellStyle = (cell) => {
    let style = 'cell';
    if ((cell.row === food.row) && (cell.col === food.col)) {
      style = 'food';
    } else if ((cell.row === snake.head.row) &&
      (cell.col === snake.head.col)) {
      style = 'head';
    } else if ((cell.row === snake.neck.row) &&
      (cell.col === snake.neck.col)) {
      style = 'neck';
    }
    for (let i = 0; i < snake.tail.length; ++i) {
      if (cell.row === snake.tail[i].row &&
      cell.col === snake.tail[i].col) {
        style = 'snakeTail';
      }
    }
    return style;
  };

  return (
    snake.grid.map((row) => {
      return row.map((cell) => {
        const st = cellStyle(cell);
        return (
          <div
            className={st}
            key={row + cell.col}
          />
        );
      });
    })
  );
}

/**
 * Snake - Displays game
 *
 * Return: HTML content
 */
function Snake () {
  return (
    <div className='snakegame'>
      <div className='wrapper'>
        <h1> Snake </h1>
        <div className='grid'>
          {DisplayGrid()}
        </div>
        <div className='score'>
          Points: {SCORE}
        </div>
        <div> Use arrow keys to move </div>
        <br />
      </div>
      <span role='img' aria-label='' className='bottomText'>
        Click main title to change games &#9757;
      </span>
    </div>
  );
}

export default Snake;
