import React from 'react';
import { Switch, NavLink, Route } from 'react-router-dom';
import Game from '../tictactoe/tic-tac-toe.js';

const Home = () => (
  <div className='home'>
    <nav>
      <ul>
        <li><NavLink to='/ticTacToe'>Tic Tac Toe</NavLink></li>
        <li><NavLink to='/snake'>Snake</NavLink></li>
      </ul>
    </nav>
  </div>
);

const ticTacToe = () => (
  <div className='ticTacToe'>
    <Game />
  </div>

);

const snake = () => (
  <div className='snake'>
    <h1>About Me</h1>
    <p>Ipsum dolor dolorem consectetur est velit fugiat. Dolorem provident corporis fuga saepe distinctio ipsam? Et quos harum excepturi dolorum molestias?</p>
    <p>Ipsum dolor dolorem consectetur est velit fugiat. Dolorem provident corporis fuga saepe distinctio ipsam? Et quos harum excepturi dolorum molestias?</p>
  </div>
);

const Main = () => (
  <Switch>
    <Route exact path='/' component={Home}></Route>
    <Route exact path='/ticTacToe' component={ticTacToe}></Route>
    <Route exact path='/snake' component={snake}></Route>
  </Switch>
);

export default Main;
