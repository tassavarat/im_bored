import React from 'react';
import './snake.css';
const random = require('./random');

function State () {
  const grid = Space();
  return {
    grid
  };
}

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
// Default move the snake to the right
var move = Keys.Up;

function Space () {
  const size = 20;
  const min = 0;
  const max = 19;
  const grid = Array.from(Array(size), () => Array(size).fill('_'));

  grid[min].fill('x');
  for (let i = 1; i < size; ++i) {
    grid[i][min] = 'x';
    grid[i][max] = 'x';
  }
  grid[max].fill('x');
  grid[random(min, max)][random(min, max)] = '*';
  return grid;
}

function displayGrid () {
  const grid = Space();
  return (
    grid.map((row, i) => {
      return row.map((cell, j) => {
        const snake = '#';
        console.log(j)
        if (i === 9 && j === 10) {
          grid[j][i] = snake;
        }
        return (
          <div
            key={i + j}
            className='cell cell-border'>{cell}</div>
        );
      });
    })
  );
}

function ShowSpace () {
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


export default ShowSpace;
