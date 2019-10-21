#!/usr/bin/env node

module.exports = function random (min, max, array) {
  min = Math.ceil(min) + 1;
  max = Math.floor(max);

  while (true) {
    const num = Math.floor(Math.random() * (max - min)) + min;
    if (array && !array.includes(num)) return num;
    else return num;
  }
};
