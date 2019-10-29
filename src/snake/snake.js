import React, { useState, useEffect } from 'react';
import './snake.css';

const SIZE = 11;
const MIN = 0;
const mapper = {
  37: 'ArrowLeft',
  38: 'ArrowUp',
  39: 'ArrowRight',
  40: 'ArrowDown'
};

/**
 * random - Generates random number not contained within optional array
 * @min: Minimum value (inclusive)
 * @max: Maximum value (exclusive)
 * @array: Values to avoid
 *
 * Return: Pseudo-random number
 */
function random (array) {
  const grid = Array.from(Array(SIZE).keys());

  // Check if both arrays were passed
  if (array) {
    // Make j variable, increment along w/ i
    for (let i = 0; i < array.length; ++i) {
      // Compare that both i and j not occupied
      const idx = grid.indexOf(array[i]);
      if (idx > -1) grid.splice(idx, 1);
    }
  }
  // Generate number for row and col
  // Return object or array with 2 values
  return grid[Math.floor(Math.random() * (grid.length - 0)) + 0];
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

function initFood () {
  return {
    row: random(),
    col: random()
  };
}

function eatFood (snake, food, setSnake, setFood) {
  if (snake.head.row !== food.row || snake.head.col !== food.col) {
    snakeCrash(snake, setSnake);
  } else if (snake.head.row === food.row && snake.head.col === food.col) {
    const tailRow = [];
    const tailCol = [];
    for (let i = 0; i < snake.tail.length; ++i) {
      tailRow.push(snake.tail[i].row);
      tailCol.push(snake.tail[i].col);
    }
    // Pass both arrays to random, probably call here also
    setFood(food =>
      ({ ...food, row: random(tailRow), col: random(tailCol) }));
    snake.tail.push(snake.head);
    // console.log('EATED AT', snake.head);
  }
}

function snakeCrash (snake, setSnake) {
  if (snake.head.row < MIN || snake.head.row === SIZE ||
    snake.head.col < MIN || snake.head.col === SIZE ||
    snake.tail.find((e) =>
      e.row === snake.head.row && e.col === snake.head.col)) {
    // console.log('died');
    setSnake(snake => (initSnake()));
  }
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
  const [food, setFood] = useState(initFood());
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
  // snakeCrash(snake, food, setSnake, setFood);
  if (!food.row || !food.col) console.log('tail', snake.tail);

  const newDirection = e => {
    if (mapper[e.keyCode]) {
      setSnake(snake => ({ ...snake, direction: mapper[e.keyCode] }));
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', newDirection);
    return () =>
      window.removeEventListener('keydown', newDirection);
  }, []);

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
      eatFood(snake, food, setSnake, setFood);
      for (let i = snake.tail.length - 1; i > -1; --i) {
        if (i > 0) snake.tail[i] = snake.tail[i - 1];
        else snake.tail[i] = snake.head;
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
