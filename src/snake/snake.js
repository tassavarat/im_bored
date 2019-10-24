import React, { useEffect, useReducer } from 'react';
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
const directions = {
  up: 'UP',
  bottom: 'BOTTOM',
  right: 'RIGHT',
  left: 'LEFT'
};
const coordinates = {
  up: (x, y) => ({ x, y: y - 1 }),
  bottom: (x, y) => ({ x, y: y + 1 }),
  right: (x, y) => ({ x: x + 1, y }),
  left: (x, y) => ({ x: x - 1, y }),
};
const KEY_CODES_MAPPER = {
  38: 'UP',
  39: 'RIGHT',
  37: 'LEFT',
  40: 'BOTTOM'
};

// key codes mapper
/*const keyCodeMapper = {
  left: 37,
  up: 38,
  right: 39,
  bottom: 40
};*/

// reducer
const reducer = (state, action) => {
  switch (action.type) {
    case 'ChangeSnakeDirection':
      return {
        ...state,
        playground: {
          ...state.playground,
          direction: action.direction
        }
      };
    default:
      throw new Error();
  }
};

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
function initState () {
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
    },
    playground: {
      direction: directions.right
    }
  };
}

/**
 * displayGrid - Changes cell's className according to position in cell
 *
 * Return: Div tag containing correct className for each cell
 */
function displayGrid () {
  const state = initState();
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
  const [state, dispatch] = React.useReducer(reducer, initState);
  console.log(state);
  const ifDirectionChanged = event => {
    if (KEY_CODES_MAPPER[event.keyCode]) {
      dispatch({
        type: 'ChangeSnakeDirection',
        direction: KEY_CODES_MAPPER[event.keyCode]
      });
    }
  };

  useEffect(() => {
    window.addEventListener('keyup', ifDirectionChanged, false);

    return () =>
      window.removeEventListener('keyup', ifDirectionChanged, false);
  }, []);

  useEffect(() => {
    const onTick = () => {
      dispatch({ type: 'ChangeSnakeDirection' });
    };
    const interval = setInterval(onTick, 1000);
    return () => clearInterval(interval);
  }, [state]);

  return (
    <div className='game'>
      <div className='wrapper'>
        <h1> Snake </h1>
        <div className='grid'>
          {displayGrid()}
        </div>
      </div>
    </div>
  );
}

export default Display;
