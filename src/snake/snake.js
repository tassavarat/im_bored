import React, { useReducer, useState, useRef, useEffect } from 'react';
import './snake.css';
const random = require('./random');

function useInterval (callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick () {
      savedCallback.current();
    }
    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
}

function Timer ({ pause }) {
  const [hour, setHours] = useState(0);
  const [minute, setMinutes] = useState(0);
  const [second, setSeconds] = useState(0);

  const toTime = (time) => ('0' + time).slice(-2);
  const resetRef = useRef();
  // Trick to Intialize countRef.current on first render only.
  resetRef.current = resetRef.current || false;
  useEffect(() => {
    if (resetRef.current === true) {
      setSeconds(0);
    }
  });

  useInterval(() => {
    if (pause) {
      resetRef.current = true;
      return;
    }
    resetRef.current = false;
    setSeconds(second + 1);
  }, pause ? null : 1000);

  useInterval(() => {
    if (pause) {
      resetRef.current = true;
      return;
    }
    resetRef.current = false;
    setSeconds(0);
    setMinutes(minute + 1);
  }, pause ? null : 1000 * 60);

  useInterval(() => {
    if (pause) {
      resetRef.current = true;
      return;
    }
    setSeconds(0);
    setMinutes(0);
    setHours(hour + 1);
  }, pause ? null : 1000 * 60 * 60);

  return (
    <div className='timer'>
      <span>TIME:</span> <span>{toTime(hour)}:</span>
      <span>{toTime(minute)}:</span>
      <span>{toTime(second)}</span>
    </div>
  );
}

function initGrid (size) {
  // const grid = Array.from(Array(size), () => Array(size).fill('x'));
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

function initState () {
  const size = 21;
  const min = 0;
  const max = size - 1;
  const grid = initGrid(size);

  /*
  grid[min].fill('x');
  for (let i = 1; i < size; ++i) {
    grid[i][min] = 'x';
    grid[i][max] = 'x';
  }
  grid[max].fill('x');
  grid[max / 2][max / 2] = '#';
  grid[random(min, max)][random(min, max)] = '*';
  */

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
    showGrid: true,
    inprogress: false
  };
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'game_lost':
      return {
        ...state,
        showGrid: state.showGrid,
        lost: true,
        message: 'Press <space> or touch/click to start the game',
        inprogress: false
      };
    case 'update':
      // console.log('update state', action.newState);
      return {
        ...state,
        ...action.newstate
      };
    case 'toggle_grid':
      return {
        ...state,
        showGrid: !state.showGrid
      };
    case 'restart':
      const newState = {
        ...state,
        message: 'Game in progress ☝',
        inprogress: true,
        lost: false,
        snake: {
          ...state.snake,
          head: {
            row: Math.floor(random() * 5),
            col: Math.floor(random() * 5)
          },
          tail: []
        }
      };
      return newState;
    default: {
      return state;
    }
  }
};

const Keys = {
  Space: 32,
  Left: 37,
  Up: 38,
  Right: 39,
  Down: 40,
  a: 65,
  w: 87,
  s: 83,
  d: 68
};

var move = Keys.Up;

function Display () {
  const [state, dispatch] = useReducer(reducer, initState());
  let interval = null;

  const cellStyle = (cell) => {
    const { snake, food, showGrid } = state;
    let style = 'cell ';
    if (snake.head.row === cell.row && snake.head.col === cell.col) {
      style = 'cell head head-up';
      if (move === Keys.Left) {
        style = 'cell head head-left';
      } else if (move === Keys.Up) {
        style = 'cell head head-up';
      } else if (move === Keys.Right) {
        style = 'cell head head-right';
      } else if (move === Keys.Down) {
        style = 'cell head head-down';
      }
    } else if (food.row === cell.row && food.col === cell.col) {
      style = 'cell food';
    } else if (snake.tail.find(t => t.row === cell.row && t.col === cell.col)) {
      style = 'cell tail';
    }

    style = showGrid ? style + ' cell-border' : style;
    return style;
  };

  const displayGrid = () => {
    const { grid } = state;
    return (
      grid.map((row, i) => {
        return row.map(cell => {
          let actorStyle = cellStyle(cell);
          return (
            <div
              key={cell.row + cell.col}
              className={actorStyle}
            />
          );
        });
      })
    );
  };

  useEffect(() => {
    GameLoop();
  }, []);

  const useTimeout = (fctn, time) => {
    interval = setTimeout(fctn, time);
  };

  const GameLoop = () => {
    let moveX = 0;
    let moveY = -1;

    if (move === Keys.Left) {
      moveX = -1;
      moveY = 0;
    } else if (move === Keys.Right) {
      moveX = 1;
      moveY = 0;
    } else if (move === Keys.Up) {
      moveX = 0;
      moveY = -1;
    } else if (move === Keys.Down) {
      moveX = 0;
      moveY = 1;
    }

    const nextState = {
      snake: {
        ...state.snake,
        head: {
          row: state.snake.head.row + moveY,
          col: state.snake.head.col + moveX
        }
      },
      food: 1
    };

    dispatch({
      type: 'update',
      newState: nextState
    });

    clearTimeout(interval);
    useTimeout(GameLoop, 1000 / 6);
  };

  return (
    <div className='game'>
      <div className='wrapper'>
        <div className='grid'>
          {displayGrid()}
        </div>
      </div>
    </div>
  );
}

export default Display;
