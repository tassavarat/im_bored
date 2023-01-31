/* @desc - Checks if a 2d array is a valid Sudoku board
 * @param array grid - 2d array of integers and characters that
 * represent a Sudoku board
 */
export function validatePuzzle (grid) {
  let subOne = {};
  let subTwo = {};
  let subThree = {};
  let dupRow = {};
  let dupCol = {};
  for (let i = 0; i < grid.length; i++) {
    dupCol = {};
    if (i % 3 === 0) {
      subOne = {};
      subTwo = {};
      subThree = {};
    }
    for (let j = 0; j < grid[i].length; j++) {
      if (parseInt(grid[i][j]) > 0 && parseInt(grid[i][j]) < 10) {
        if (j < 3) {
          if (!subOne[grid[i][j]]) subOne[grid[i][j]] = 1;
          else subOne[grid[i][j]] += 1;
        } else if (j < 6) {
          if (!subTwo[grid[i][j]]) subTwo[grid[i][j]] = 1;
          else subTwo[grid[i][j]] += 1;
        } else if (j < 9) {
          if (!subThree[grid[i][j]]) subThree[grid[i][j]] = 1;
          else subThree[grid[i][j]] += 1;
        }
        if (!dupCol[grid[i][j]]) dupCol[grid[i][j]] = 1;
        else dupCol[grid[i][j]] += 1;
      }
      if (dupCol[grid[i][j]] > 1 || subOne[grid[i][j]] > 1 || subTwo[grid[i][j]] > 1 || subThree[grid[i][j]] > 1) {
        return false;
      }
    }
  }

  for (let i = 0; i < grid.length; i++) {
    dupRow = {};
    for (let j = 0; j < grid[i].length; j++) {
      if (parseInt(grid[j][i]) > 0 && parseInt(grid[j][i]) < 10) {
        if (!dupRow[grid[j][i]]) dupRow[grid[j][i]] = 1;
        else dupRow[grid[j][i]] += 1;
      }
      if (dupRow[grid[j][i]] > 1) {
        return false;
      }
    }
  }
  return true;
}

/* @desc checks if the current number can be placed in the board correctly
 * @param [[]] board - 2d board representing the puzzle board
 * @param int row - current row in the board
 * @param int col - current col in row
 * @param int num - value to try to include in the board
 * @return: true or false
 */
function isValidPlace (board, row, col, num) {
  const rowIdx = Math.floor(row / 3) * 3;
  const colIdx = Math.floor(col / 3) * 3;
  // valid in rows and columns
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num) {
      return false;
    }
    if (board[i][col] === num) {
      return false;
    }
  }
  // valid in 3x3 subarray
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[rowIdx + i][colIdx + j] === num) {
        return false;
      }
    }
  }
  return true;
}

/* @desc - Generates a random number ranging from a min value
 * to a max value inclusively.
 * @param int min - represents minimum inclusive starting range of the
 * random number
 * @param int max - represents maximum inclusive ending range of the
 * random number
 */
function getRandomNum (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* @desc iterates through all possible rows and columns, recursively calling
 * itself and backtracking to constantly change values to check when needed.
 * @param [[]] board - 2d array of characters representing the puzzle
 * @param int row - current row of board
 * @param int col - current column of row
 * @return true or false
 */
function solver (board, row, col) {
  // if last column has been reached, increment row
  if (col === board[row].length) {
    col = 0;
    row++;
    // if last row has been reached, success
    if (row === board.length) {
      return true;
    }
  }
  // skip already placed characters
  if (board[row][col] !== '.' && !Number.isInteger(board[row][col])) {
    return solver(board, row, col + 1);
  }
  // get random num from 1 to 9
  for (let i = 0; i < 9; i++) {
    const num = getRandomNum(1, 9);
    if (isValidPlace(board, row, col, num.toString())) {
      // if valid, set value in board
      board[row][col] = num.toString();
      // recursively calls itself to check next column
      if (solver(board, row, col + 1)) {
        return true;
      }
      // placement failed, backtracking
      board[row][col] = '.';
    }
  }
  // no value could be placed
  return false;
}

/* @desc - Wrapper function that calls solver function
 * @board - 2d array of characters and integers representing the grid
 * Returns - a copy of the newly generated solved puzzle
 */
export function sudokuSolver (board) {
  while (!solver(board, 0, 0)) {
    solver(board, 0, 0);
  }
  return board.slice();
}

/* @desc - generates a puzzle boar, then randomly resets values to '.'
 * @return 2d array of chars
*/
export function generatePuzzle () {
  const board = Array.from(Array(9), _ => Array(9).fill('.'));
  let counter = 40;
  let x = 0;
  let y = 0;

  sudokuSolver(board);
  while (counter !== 0) {
    x = getRandomNum(0, 8);
    y = getRandomNum(0, 8);
    if (board[x][y] !== '.') {
      board[x][y] = '.';
      counter -= 1;
    }
  }

  return (board);
}
