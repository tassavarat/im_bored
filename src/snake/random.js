#!/usr/bin/env node

const SIZE = 11;

function random (array) {
  const grid = Array.from(Array(SIZE).keys());

  console.log('initial grid', grid);
  if (array) {
    for (let i = 0; i < array.length; ++i) {
      const idx = grid.indexOf(array[i]);
      if (idx > -1) grid.splice(idx, 1);
      console.log('grid', grid);
    }
  }
  console.log('daddy', grid[-1]);
  return grid[Math.floor(Math.random() * (grid.length - 0)) + 0];
}

const array = [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 8, 8, 8, 8, 8, 8, 7];
console.log('array.length', array.length);
console.log(random(array));
