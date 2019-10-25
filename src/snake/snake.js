import React, { useState, useEffect } from 'react';
import './snake.css';

const SIZE = 21;
const MIN = 0;
const MAX = SIZE - 1;
const mapper = {
  37: 'ArrowLeft',
  38: 'ArrowUp',
  39: 'ArrowRight',
  40: 'ArrowDown'
};

/**
 * random - Generates random number not contained within optional array
 * @min: Minimum value (exclusive)
 * @max: Maximum value (exclusive)
 * @array: Values to avoid
 *
 * Return: Pseudo-random number
 */
function random (min, max, array) {
  min = Math.ceil(min) + 1;
  max = Math.floor(max);

  while (true) {
    const num = Math.floor(Math.random() * (max - min)) + min;
    if (!array) return num;
    if (!array.includes(num)) return num;
  }
}

/**
 * initGrid - Creates a grid
 * @size: Dimensions of grid
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

function initSnake () {
  return {
    head: {
      row: MAX / 2,
      col: MAX / 2
    },
    tail: [],
    direction: null
  };
}

function initFood () {
  return {
    row: random(MIN, MAX),
    col: random(MIN, MAX)
  };
}

/**
 * displayGrid - Changes cell's className according to position in cell
 *
 * Return: Div tag containing correct className for each cell
 */
function DisplayGrid () {
  // eslint-disable-next-line
  const [grid, setGrid] = useState(initGrid());
  const [snake, setSnake] = useState(initSnake());
  // eslint-disable-next-line
  const [food, setFood] = useState(initFood());
  const direction = {
    left: { ...snake, head: { row: snake.head.row, col: snake.head.col - 1 } },
    up: { ...snake, head: { row: snake.head.row - 1, col: snake.head.col } },
    right: { ...snake, head: { row: snake.head.row, col: snake.head.col + 1 } },
    down: { ...snake, head: { row: snake.head.row + 1, col: snake.head.col } }
  };
  console.log('snake:', snake);

  const newDirection = e => {
    if (mapper[e.keyCode]) {
      setSnake(snake => ({ ...snake, direction: mapper[e.keyCode] }));
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', newDirection);
    return () =>
      window.removeEventListener('keydown', newDirection);
  });

  useEffect(() => {
    const onTick = () => {
      console.log('onTick');
      if (snake.direction === 'ArrowLeft') setSnake(snake => (direction.left));
      if (snake.direction === 'ArrowUp') setSnake(snake => (direction.up));
      if (snake.direction === 'ArrowRight') setSnake(snake => (direction.right));
      if (snake.direction === 'ArrowDown') setSnake(snake => (direction.down));
    };
    const interval = setInterval(onTick, 250);
    return () => clearInterval(interval);
  });

  const cellStyle = (cell) => {
    let style = 'cell';
    if ((cell.row === food.row) && (cell.col === food.col)) {
      style = 'food';
    } else if ((cell.row === snake.head.row) &&
      (cell.col === snake.head.col)) {
      style = 'snakeHead';
    }
    return style;
  };

  return (
    grid.map((row) => {
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
 * Display - Displays game
 *
 * Return: HTML content
 */
function Display () {
  return (
    <div className='game'>
      <div className='wrapper'>
        <h1> Snake </h1>
        <div className='grid'>
          {DisplayGrid()}
        </div>
      </div>
    </div>
  );
}

export default Display;
