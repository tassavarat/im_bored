import React, { useState, useReducer } from 'react'

/**
 * 
 * @param {*integer} min: min value in range
 * @param {*integer} max: max value in range
 * @returns random number between min and max (inclusive)
 */
const getRandomNum = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.ceil(Math.random() * (max - min + 1) + min)
}

/**
 * [[., ., ., ., *]
 *  [*, *, ., ., *]
 *  [., ., ., *, .]
 * ]
 */
const createBoard = () => {
  const board = Array.from(Array(6), _ => Array(6).fill('.'))
  const numOfHighlightedCells =  getRandomNum(0, 6)
  console.log('num', numOfHighlightedCells)
}

// createBoard -> create board with highlighted cells
// checkBoard -> check if selected cells are equal to the highlighted cells
const reducer = (grid, action) => {
  switch (action.type) {
    case 'createBoard': 
      return createBoard()
  }
}

const Memory = () => {
  const [grid, dispatch] = useReducer(reducer, createBoard())

  return (
    <div>Memory Game</div>
  )
}

export default Memory