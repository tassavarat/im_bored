import React, { useState, useEffect } from 'react';
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
    food: {
      row: random(min, max),
      col: random(min, max)
    }
  };
}

/**
 * displayGrid - Changes cell's className according to position in cell
 *
 * Return: Div tag containing correct className for each cell
 */
function DisplayGrid () {
  const [state, setState] = useState(InitState());

  const direction = {
    left: { row: state.snake.head.row, col: state.snake.head.col - 1 },
    up: { row: state.snake.head.row - 1, col: state.snake.head.col },
    right: { row: state.snake.head.row, col: state.snake.head.col + 1 },
    down: { row: state.snake.head.row + 1, col: state.snake.head.col }
  };

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

  useEffect(() => {
    const onTick = () => {
      window.addEventListener('keydown', (e) => {
        switch (e.key) {
          case 'Down': // IE/Edge specific value
          case 'ArrowDown':
            setState(state => ({ ...state, snake: { head: direction.down } }));
            // Do something for 'down arrow' key press.
            break;
          case 'Up': // IE/Edge specific value
          case 'ArrowUp':
            setState(state => ({ ...state, snake: { head: direction.up } }));
            // Do something for 'up arrow' key press.
            break;
          case 'Left': // IE/Edge specific value
          case 'ArrowLeft':
            setState(state => ({ ...state, snake: { head: direction.left } }));
            // Do something for 'left arrow' key press.
            break;
          case 'Right': // IE/Edge specific value
          case 'ArrowRight':
            setState(state => ({ ...state, snake: { head: direction.right } }));
            // Do something for 'right arrow' key press.
            break;
          default:
        }
      }, true);
      /*
        if (e.key === 'ArrowUp') {
        } else if (e.key === 'ArrowDown') {
          key = { row: state.snake.head.row + 1, col: state.snake.head.col };
        } else if (e.key === 'ArrowRight') {
          key = { row: state.snake.head.row, col: state.snake.head.col + 1 };
        } else if (e.key === 'ArrowLeft') {
          key = { row: state.snake.head.row, col: state.snake.head.col - 1 };
        }
      });
      */
    };

    const interval = setInterval(onTick, 250);
    return () => clearInterval(interval);
  }, [state]);

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
