#! /usr/bin/env node
import { sudokuSolver, generatePuzzle } from './sudoku-solver';


let a = generatePuzzle();
let b = generatePuzzle();
let c = generatePuzzle();

console.log(a)
sudokuSolver(a)
console.log(a)
