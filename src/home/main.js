import React from 'react';
import { Switch, NavLink, Route } from 'react-router-dom';
import Game from '../tictactoe/tic-tac-toe.js';
import Display from '../snake/snake.js';
import './App.css';

const Home = () => (
  <div className='home'>
    <nav>
      <ul>
        <li><NavLink to='/ticTacToe'>Tic Tac Toe</NavLink></li>
        <li><NavLink to='/snake'>Snake</NavLink></li>
      </ul>
    </nav>
    <footer>
      <ul> Made by
        <li> Tim Assavarat </li>
        <li> Sofia Cheung </li>
      </ul>
    </footer>
  </div>
);

const ticTacToe = () => (
  <div className='ticTacToe'>
    <Game />
  </div>

);

const snake = () => (
  <div className='snake'>
    <Display />
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
