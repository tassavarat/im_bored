import React, { useReducer, useEffect } from 'react';
import './snake.css';

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
function initGrid (size) {
  const grid = [];
  for (let row = 0; row < size; ++row) {
    const cols = [];
    for (let col = 0; col < size; ++col) {
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
 * initState - Initialises the game state
 *
 * Return: Objects containing pertinent information on game
 */
function InitState () {
  const size = 21;
  const min = 0;
  const max = size - 1;
  const grid = initGrid(size);

  return {
    grid,
    snake: {
      head: {
        row: max / 2,
        col: max / 2
      },
      tail: []
    },
    direction: null,
    food: {
      row: random(min, max),
      col: random(min, max)
    }
  };
}

function reducer (state, action) {
  switch (action.type) {
    case 'ArrowLeft':
      return { ...state, snake: { head: { row: state.snake.head.row, col: state.snake.head.col - 1 } }, direction: 'left' };
    case 'ArrowUp':
      return { ...state, snake: { head: { row: state.snake.head.row - 1, col: state.snake.head.col } }, direction: 'up' };
    case 'ArrowRight':
      return { ...state, snake: { head: { row: state.snake.head.row, col: state.snake.head.col + 1 } }, direction: 'right' };
    case 'ArrowDown':
      return { ...state, snake: { head: { row: state.snake.head.row + 1, col: state.snake.head.col } }, direction: 'down' };
    default:
      throw new Error();
  }
}

// state => ({ ...state, snake: { head: direction.up } })
const mapper = {
  37: 'ArrowLeft',
  38: 'ArrowUp',
  39: 'ArrowRight',
  40: 'ArrowDown'
};

/**
 * displayGrid - Changes cell's className according to position in cell
 *
 * Return: Div tag containing correct className for each cell
 */
function DisplayGrid () {
  const [state, dispatch] = useReducer(reducer, InitState());

  const newDirection = e => {
    if (mapper[e.keyCode]) {
      dispatch({ type: mapper[e.keyCode] });
    }
  };
  useEffect(() => {
    window.addEventListener('keyup', newDirection);
    return () =>
      window.removeEventListener('keyup', newDirection);
  });

  useEffect(() => {
    const onTick = () => {
      if (state.direction === 'up') {
        dispatch({ type: 'ArrowUp' });
      } else if (state.direction === 'down') {
        dispatch({ type: 'ArrowDown' });
      } else if (state.direction === 'right') {
        dispatch({ type: 'ArrowRight' });
      } else if (state.direction === 'left') {
        dispatch({ type: 'ArrowLeft' });
      }
    };
    const interval = setInterval(onTick, 100);
    return () => clearInterval(interval);
  }, [state]);

  const cellStyle = (cell) => {
    let style = 'cell';
    if ((cell.row === state.food.row) && (cell.col === state.food.col)) {
      style = 'food';
    } else if ((cell.row === state.snake.head.row) &&
      (cell.col === state.snake.head.col)) {
      style = 'snakeHead';
    }
    return style;
  };

  return (
    state.grid.map((row) => {
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
