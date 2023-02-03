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
  const char = board[coordinates?.row][coordinates?.col]

  console.log('coordinates', board, coordinates)
  const boardCopy = JSON.parse(JSON.stringify(board))
  boardCopy[coordinates?.row][coordinates?.col] = char + 'x'
  console.log('bAAA', board)
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
    default:
    throw new Error('Invalid action')
  }
}

const Memory = () => {
  const [board, dispatch] = useReducer(reducer, [])
  const [showHighlightedCells, setShowHighlightedCells] = useState(false)

  /**
   * create the board and display highlighted cells to memorize on a timer.
   */
  const startGame = () => {
    dispatch({type: 'createBoard'})
    setShowHighlightedCells(true)
    setTimeout(() => {
      setShowHighlightedCells(false)
    }, 4000)
  }

  const cellOnClick = (row, col) => { 
    dispatch({type: 'updateBoard', payload: {row, col}})
  }

  return (
    <div>
      <div className='m-board-wrapper'>
        <h2>Memory Game</h2>
        {!board?.length ? (
          <div className='start'>
            <button onClick={startGame}>Start</button>
          </div>
        ) : (
          <div className='m-board'> 
            {board && board.map((_, rowIdx) => (
              <div className='row' key={`row-${rowIdx}`}>
                {board[rowIdx] && board[rowIdx].map((col, colIdx) => {
                  let cellClassName = 'm-cell'
                  if (col === 'x') cellClassName += ' userSelected'
                  if (col === '*' && showHighlightedCells) cellClassName += ' highlighted'
                  
                  return (
                  <div
                    key={`cell-${colIdx}`}
                    className={cellClassName}
                    onClick={() => cellOnClick(rowIdx, colIdx)}
                  >{col}</div>
                )})}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    )
}

export default Memory