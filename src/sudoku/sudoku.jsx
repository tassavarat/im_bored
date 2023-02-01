import React, { useState, useReducer } from 'react';
import { validatePuzzle, sudokuSolver, generatePuzzle } from './sudoku-solver';
import './sudoku.css';

/**
 * Renders numbers 1-9 to use as input for the user to change the board
 * @param props - contains setSelectedNum to pass as onClick function
 */
function MappingNums (props) {
  const array = [];
  for (let i = 1; i <= 9; i++) array.push(i);
  return (
    <div>
        <p>Click on a number &#128071; then on a white cell in the board &#128070; </p>
        <div className='numbers'>
            {array.map((i) => {
                return <button key={i} className='s-num' onClick={() => props.setSelectedNum(i)}>{i}</button>;
            })}
        </div>
    </div>
  );
}

/**
 * Changes the value of a cell to selectedNum, given the cell's position
 * in the grid
 *
 * @param {array} grid - the game board, 2d array of integers and characters
 * @param {integer} i - index representing a cell's row on the grid
 * @param {integer} j - index representing a cell's column on the grid
 * @param {integer} selectedNum - new value of the cell
 */
function cellOnClick (grid, i, j, selectedNum) {
 
  const g = JSON.parse(JSON.stringify(grid));
  if (g[i][j] !== '.') g[i][j] = '.';
  else g[i][j] = selectedNum;
  return g;
}

/**
 * Returns a constructed cell component
 * @param props - contains a className, an onClick function and the value of the cell
 */
function Cell (props) {
  return (
    <div className={props.className} onClick={props.onClick}>{props.val}</div>
  );
}

/**
 * Reducer function to manipulate the grid's state.
 * @param {array} grid - 2d array representing the game's board
 * @param {object} action - information payload for the store to perform that action
 */
function reducer (grid, action) {
  switch (action.type) {
    case 'reset':
      return generatePuzzle();
    case 'solve':
      return sudokuSolver(grid);
    case 'check':
      return validatePuzzle();
    case 'update':
      return cellOnClick(...action.payload);
    default:
      throw new Error('Invalid action');
  }
}

/**
 * Constructs and renders the puzzle's board/grid
 * Manages the state of the grid, the current selected number, and the status
 * of the game.
 *
 * Returns - a rendered Sudoku grid
 */
function Board () {
  const [grid, dispatch] = useReducer(reducer, generatePuzzle());
  const [selectedNum, setSelectedNum] = useState(1);
  const [checked, setChecked] = useState('');

  function updateCell (payload) {
    dispatch({ type: 'update', payload: payload });
  }

  return (
    <div className='container'>
      <div className='grid-sudoku'>
        {grid.map((col, i) => (
          <div className='col-s' key={i}>
            {grid[i].map((cell, j) => {
              // if input cell
              if (grid[i][j] === '.') {
                const updatePayload = [grid, i, j, selectedNum];
                return (
                  <Cell className='cell-s' key={Math.random()} val=' ' onClick={() => updateCell(updatePayload)} />
                );
              }
              // if previously edited cell
              if (Number.isInteger(grid[i][j])) {
                const updatePayload = [grid, i, j, selectedNum];
                return (
                  <Cell className='cell-s' key={Math.random()} val={grid[i][j]} onClick={() => updateCell(updatePayload)} />
                );
              }
              // if default cell
              return (
                <Cell className='cell-s def' key={Math.random()} val={grid[i][j]} />
              );
            })}
          </div>
        ))}
      </div>
      <MappingNums setSelectedNum={setSelectedNum} />
      <div className='menu'>
        <button
          className={`menu-btn ${checked ? 'green' : checked === '' ? 'black' : 'red'}`}
          onClick={() => setChecked(validatePuzzle(grid))}
        >check progress
        </button>
        <button className='menu-btn' onClick={() => { dispatch({ type: 'reset' }); }}>new board</button>
        <button className='menu-btn' onClick={() => dispatch({ type: 'solve' })}>solve</button>
      </div>
      <p role='img' aria-label='' className='bottomText'>
        Click main title to change games &#128070;
      </p>
    </div>
  );
}

/**
 * Wrapper function that calls Board function
 */
function Sudoku () {
  return (
    <Board />
  );
}

export default Sudoku;
