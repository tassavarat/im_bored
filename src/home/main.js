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
        <li className='aboutLink'><NavLink to='/about'>About</NavLink></li>
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

const about = () => (
  <div className='about'>
    <div className='box'>
      <h1> About </h1>
      <p> I'm Bored was created to allow people to have easy access to
          casual games and was inspired by existing online gaming
          websites. The idea was accessibility and intuitiveness so that
          anyone can understand and play the games.<br />
          Made by Sofia Cheung and Tim Assavarat.
      </p>
    </div>
  </div>
);

const Main = () => (
  <Switch>
    <Route exact path='/' component={Home} />
    <Route exact path='/ticTacToe' component={ticTacToe} />
    <Route exact path='/snake' component={snake} />
    <Route exact path='/about' component={about} />
  </Switch>
);

export default Main;
