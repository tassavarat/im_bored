import React from 'react';
// import ReactDOM from 'react-dom';
import './tic-tac-toe.css';
const request = require('request');

function Square (props) {
  return (
    <button className='square' onClick={props.onClick}>
      {props.val}
    </button>
  );
}

class Game extends React.Component {
  render () {
    return (
      <div className='game'>
        <div className='scores'>Tic Tac Toe</div>
        <Board />
      </div>
    );
  }
}

class Board extends React.Component {
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

  computerMove (strGrid) {
    const options = {
      method: 'GET',
      url: `https://stujo-tic-tac-toe-stujo-v1.p.rapidapi.com/${strGrid}/O`,
      headers: {
        'x-rapidapi-host': 'stujo-tic-tac-toe-stujo-v1.p.rapidapi.com',
        'x-rapidapi-key': '9b15f452e0mshafc36b253ee9381p1ce860jsn98e739f1c98c'
      }
    };

    return new Promise((resolve, reject) => {
      request(options, (err, resp, body) => {
        if (err) console.log(err);
        else resolve(JSON.parse(body).recommendation);
      });
    });
  }

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
    const move = await this.computerMove(strGrid);
    grid[move] = 'O';
    this.setState({
      grid: grid,
      turnCount: turnCount + 1
      // playerTurn: !this.state.playerTurn
    });
  }

  displaySquare (i) {
    return (
      <Square
        val={this.state.grid[i]}
        onClick={() => this.click(i)}
      />
    );
  }

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

    if (gameStatus) turn = gameStatus + ' Click on a box to go play again';
    else turn = 'You are X';
    // else turn = (this.state.playerTurn ? "X's " : "O's ") + 'turn';

    const score = 'Scores: X: ' + this.scores.x + ' Ties: ' + this.scores.tie + ' O: ' + this.scores.o;

    return (

      <div className='board'>
        <div className='scores'>{score}</div>
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
        <div className='turn'>{turn}</div>
      </div>
    );
  }
}

// ReactDOM.render(<Game />, document.getElementById('root'));
export default Game;
