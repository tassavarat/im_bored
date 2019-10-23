import React from 'react';
import './snake.css';

function random (min, max, array) {
  min = Math.ceil(min) + 1;
  max = Math.floor(max);

  while (true) {
    const num = Math.floor(Math.random() * (max - min)) + min;
    if (!array) return num;
    if (!array.includes(num)) return num;
  }
}

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
    }
  };
}

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

function Display () {
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
