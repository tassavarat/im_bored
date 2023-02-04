import React, { useState, useReducer, useEffect } from 'react'
import './Memory.css'

/**
 * 
 * @param {*integer} min: min value in range
 * @param {*integer} max: max value in range
 * @returns random number between min and max (inclusive)
 */
const getRandomNum = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * [[., ., ., ., *]
 *  [*, *, ., ., *]
 *  [., ., ., *, .]]
 * @returns board with empty and highlighted cells
 */
const createBoard = () => {
  const board = Array.from(Array(4), _ => Array(4).fill('.'))
  const numOfHighlightedCells =  6
  for (let i = 0; i <= numOfHighlightedCells; i++) {
    const randRow = getRandomNum(0, 3)
    const randCol = getRandomNum(0, 3)

    board[randRow][randCol] = '*'
  }
  return board
}

/**
 * updates the board with user input
 */
const updateBoard = (board, coordinates) => {
  const str = board[coordinates?.row][coordinates?.col]
  const boardCopy = JSON.parse(JSON.stringify(board))
  
  // delete 'x' if cell is clicked again
  if (str[1] === 'x') {
    boardCopy[coordinates?.row][coordinates?.col] = str[0]
  } else {
    // append 'x' to string
    boardCopy[coordinates?.row][coordinates?.col] = str + 'x'
  }
  
  return boardCopy
}

const checkBoard = (board) => {
  // iterate board and check if all '*' cells have an 'x'
  const WRONG = 'wrong'
  const CORRECT = 'correct'
  const MISSING = 'missing'

  const boardCopy = JSON.parse(JSON.stringify(board))
  let isCorrect = true

  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (board[row][col] === '.x') boardCopy[row][col] = WRONG
      if (board[row][col] === '*x') boardCopy[row][col] = CORRECT
      if (board[row][col] === '*') board[row][col] = MISSING

      if (board[row][col] === 'missing' || board[row][col] === 'wrong') isCorrect = false
    }
  }
  return boardCopy
}

// createBoard -> create board with highlighted cells
// checkBoard -> check if selected cells are equal to the highlighted cells
const reducer = (board, action) => {
  switch (action.type) {
    case 'createBoard': 
      return createBoard()
    case 'updateBoard':
      return updateBoard(board, action.payload)
    case 'checkBoard':
      return checkBoard(board)
    case 'emptyBoard':
      return []
    default:
    throw new Error('Invalid action')
  }
}

const Memory = () => {
  const [board, dispatch] = useReducer(reducer, [])
  const [showHighlightedCells, setShowHighlightedCells] = useState(false)
  const [score, setScore] = useState(0)

  /**
   * create the board and display highlighted cells to memorize on a timer.
   */
  const startGame = () => {
    dispatch({type: 'createBoard'})
    setShowHighlightedCells(true)
    setTimeout(() => {
      setShowHighlightedCells(false)
    }, 2000)
  }

  const onRestart = () => (dispatch({type: 'emptyBoard'}))
  const cellOnClick = (row, col) => (dispatch({type: 'updateBoard', payload: {row, col}}))
  const onCheck = () => (dispatch({type: 'checkBoard'}))

  return (
    <div>
      <div className='m-board-wrapper'>
        <h2>Memory Game</h2>
        {!board?.length ? (
          <div className='start'>
            <button onClick={startGame}>Start</button>
          </div>
        ) : (
          <>
            <div className='score'>Score: {score}</div>
            <div className='m-board'> 
            {board && board.map((_, rowIdx) => (
              <div className='row' key={`row-${rowIdx}`}>
                {board[rowIdx] && board[rowIdx].map((col, colIdx) => {
                  let cellClassName = col
                  const clickEnabled = !showHighlightedCells

                  if (col[1] === 'x') cellClassName = ' userSelected'
                  if (col === '*' && showHighlightedCells) cellClassName = 'cursor-disabled highlighted'
                  
                  return (
                  <div
                    key={`cell-${colIdx}`}
                    className={`m-cell ${clickEnabled ? 'click-enabled' : ''} ${cellClassName}`}
                    onClick={() => clickEnabled && cellOnClick(rowIdx, colIdx)}
                  >{col}</div>
                )})}
              </div>
            ))}
            </div>
            <div className='button-section'>
              <button onClick={onCheck}>Check</button>
              <button onClick={onRestart}>Restart</button>
            </div>
          </>
        )}
      </div>
    </div>
    )
}

export default Memory