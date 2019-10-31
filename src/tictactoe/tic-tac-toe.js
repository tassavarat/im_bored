import React from 'react';
import './tic-tac-toe.css';
const request = require('request');

/**
 * Square - Updates button tag on click
 * @props: Click and square status
 *
 * Return: HTML button tag for each square
 */
function Square (props) {
  return (
    <button className='square' onClick={props.onClick}>
      {props.val}
    </button>
  );
}

class Game extends React.Component {
  /**
   * render - Displays Board class
   *
   * Return: Board class inside game div
   */
  render () {
    return (
      <div className='tttgame'>
        <Board />
        <span role='img' aria-label='' className='bText'>
          Click main title to change games &#9757;
        </span>
      </div>
    );
  }
}

class Board extends React.Component {
  /**
   * constructor - Creates attributes for the class
   */
  constructor (props) {
    super(props);
    this.state = {
      grid: Array(9).fill(null),
      playerTurn: true,
      turnCount: 0
    };
    this.initialState = this.state;
    this.scores = {
      x: 0,
      tie: 0,
      o: 0
    };
  }

  /**
   * computerMove - Calls tic-tac-toe API
   * @strGrid: String representation of grid
   *
   * Return: Position of move for computer to make
   */
  computerMove (strGrid, grid) {
    const options = {
      method: 'GET',
      url: `https://stujo-tic-tac-toe-stujo-v1.p.rapidapi.com/${strGrid}/O`,
      headers: {
        'x-rapidapi-host': 'stujo-tic-tac-toe-stujo-v1.p.rapidapi.com',
        'x-rapidapi-key': '9b15f452e0mshafc36b253ee9381p1ce860jsn98e739f1c98c'
      }
    };
    const gridComp = Array.from(Array(9).keys());
    const chance = 3;

    if (!Math.floor(Math.random() * chance)) {
      for (let i = 0; i < grid.length; ++i) {
        if (grid[i] === 'X' || grid[i] === 'O') {
          gridComp.splice(gridComp.findIndex((e) =>
            e === i), 1);
        }
      }
      return gridComp[Math.floor(Math.random() * (gridComp.length))];
    } else {
      return new Promise((resolve, reject) => {
        request(options, (err, resp, body) => {
          if (err) console.log(err);
          else resolve(JSON.parse(body).recommendation);
        });
      });
    }
  }

  /**
   * gameEnd - Checks for tie or winner
   *
   * Return: String of game ending condition or null if game not over
   */
  gameEnd () {
    const { grid, turnCount } = this.state;
    if (turnCount === 5) return 'It\'s a tie!';
    const win = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (const i in win) {
      const [a, b, c] = win[i];
      if (grid[a] && grid[a] === grid[b] &&
        grid[a] === grid[c]) {
        return grid[a] + ' wins!';
      }
    }
    return null;
  }

  /**
   * click - Updates state of grid, increments turnCount, and resets game state
   * @i: Square index
   */
  async click (i) {
    const grid = this.state.grid.slice();
    const turnCount = this.state.turnCount;
    if (this.gameEnd()) {
      this.setState(this.initialState);
      return;
    }
    if (grid[i]) return;

    // grid[i] = this.state.playerTurn ? 'X' : 'O';
    grid[i] = 'X';
    let strGrid = grid.slice();
    for (const i in strGrid) if (!strGrid[i]) strGrid[i] = '-';
    strGrid = strGrid.join('');
    const move = await this.computerMove(strGrid, grid);
    grid[move] = 'O';
    this.setState({
      grid: grid,
      turnCount: turnCount + 1
      // playerTurn: !this.state.playerTurn
    });
  }

  /**
   * displaySquare - Passes onClick and value for specific square to Square
   * @i: Position of specific square
   *
   * Return: Button HTML tag
   */
  displaySquare (i) {
    return (
      <Square
        onClick={() => this.click(i)}
        val={this.state.grid[i]}
      />
    );
  }

  /**
   * render - Displays the game
   *
   * Return: HTML content
   */
  render () {
    const gameStatus = this.gameEnd();
    let turn;
    if (this.gameEnd() && this.gameEnd().startsWith('X')) {
      this.scores.x++;
    } else if (this.gameEnd() && this.gameEnd().startsWith('O')) {
      this.scores.o++;
    } else if (this.gameEnd() && this.gameEnd().startsWith('I')) {
      this.scores.tie++;
    }

    if (gameStatus) turn = gameStatus + ' Click on a box to play again';
    else turn = 'You are X';
    // else turn = (this.state.playerTurn ? "X's " : "O's ") + 'turn';

    const score = 'X: ' + this.scores.x + ' | Ties: ' + this.scores.tie + ' | O: ' + this.scores.o;

    return (

      <div className='space'>
        <div className='ttt'>
          <h2> Tic Tac Toe </h2>
        </div>
        <div>Scores</div>
        <div className='scores'>{score}</div>
        <div className='board'>
          <div className='row'>
            {this.displaySquare(0)}
            {this.displaySquare(1)}
            {this.displaySquare(2)}
          </div>
          <div className='row'>
            {this.displaySquare(3)}
            {this.displaySquare(4)}
            {this.displaySquare(5)}
          </div>
          <div className='row'>
            {this.displaySquare(6)}
            {this.displaySquare(7)}
            {this.displaySquare(8)}
          </div>
        </div>
        <div className='turn'>{turn}</div>
      </div>
    );
  }
}

export default Game;
