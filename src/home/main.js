import React from 'react';
import { Switch, NavLink, Route } from 'react-router-dom';
import Game from '../tictactoe/tic-tac-toe.js';
import Display from '../snake/snake.js';
import './App.css';

const Home = () => (
  <div className='home'>
    <nav className='navi'>
      <ul>
        <li><NavLink to='/ticTacToe'>Tic Tac Toe</NavLink></li>
        <li><NavLink to='/snake'>Snake</NavLink></li>
      </ul>
    </nav>
    <footer>
      <h4> Made by </h4>
      <ul>
        <li><a href='https://www.linkedin.com/in/sof%C3%ADa-cheung-90056817a/'> Sofía Cheung </a></li>
        <li><a href='https://www.linkedin.com/in/tim-assavarat-04b14717a/'> Tim Assavarat </a></li>
      </ul>
      <form action='https://github.com/tassavarat/im_bored'>
        <input className='glink' type='submit' value='view on Github' />
      </form>
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
