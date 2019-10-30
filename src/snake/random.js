#!/usr/bin/env node

const SIZE = 3;

/*
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
*/
function random (array, setFood) {
  // if (!setFood && START) return;

  const grid = [];
  for (let row = 0; row < SIZE; ++row) {
    for (let col = 0; col < SIZE; ++col) {
      grid.push({
        row,
        col
      });
    }
  }

  // console.log('initial grid', grid);
  if (array) {
    for (let i = 0; i < array.length; ++i) {
      console.log('array i', array[i]);
      // const idx = grid.indexOf(array[i]);
      const idx = grid.findIndex(obj => obj.row === array[i].row && obj.col === array[i].col);
      console.log('idx', idx);
      if (idx > -1) grid.splice(idx, 1);
      // console.log('grid', grid);
    }
  } else {
    const idx = grid.indexOf({
      row: Math.floor(SIZE / 2), col: Math.floor(SIZE / 2)
    });
    grid.splice(idx, 1);
  }
  const num = Math.floor(Math.random() * (grid.length));

  console.log('grid', grid);
  console.log('grid', grid[num]);
  if (!array) return grid[num];

  /*
  setFood(food =>
    ({
      ...food,
      row: grid[num].row,
      col: grid[num].col
    }));
  */
}

console.log(random([{ row: 0, col: 1 }]));
