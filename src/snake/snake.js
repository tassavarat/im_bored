#!/usr/bin/env node
const random = require('./random');

function space () {
  const size = 10;
  const min = 0;
  const max = 9;
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

console.log(space());
