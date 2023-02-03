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
const updateBoard = () => {

}

// createBoard -> create board with highlighted cells
// checkBoard -> check if selected cells are equal to the highlighted cells
const reducer = (grid, action) => {
  switch (action) {
    case 'createBoard': 
      return createBoard()
    case 'updateBoard':
      return updateBoard()
  }
}

const Memory = () => {
  const [grid, dispatch] = useReducer(reducer, [])
  const [showHighlightedCells, setShowHighlightedCells] = useState(false)

  /**
   * create the board and display highlighted cells to memorize on a timer.
   */
  const startGame = () => {
    dispatch('createBoard')
    setShowHighlightedCells(true)
    setTimeout(() => {
      setShowHighlightedCells(false)
    }, 4000)
  }

  const cellOnClick = (row, col) => {

  }

  return (
    <div>
      <div className='m-board-wrapper'>
        <h2>Memory Game</h2>
        {!grid?.length ? (
          <div className='start'>
            <button onClick={startGame}>Start</button>
          </div>
        ) : (
          <div className='m-board'> 
            {grid && grid.map((_, rowx) => (
              <div className='row' key={`row-${rowx}`}>
                {grid[rowx] && grid[rowx].map((col, colIdx) => (
                  <div className={`m-cell ${showHighlightedCells && col === '*' ? 'highlighted' : 'm-cell'}`} key={`col-${colIdx}`}>{col}</div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    )
}

export default Memory