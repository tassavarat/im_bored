import React from 'react';
import './App.css';
import Main from './main.js';
import { NavLink } from 'react-router-dom';

const App = () => (
  <div className='app'>
    <nav className='title'>
      <h1><NavLink to='/'> Im Bored...</NavLink></h1>
      <div className='instruction'> choose a game to play </div>
    </nav>
    <Main />
  </div>
);

export default App;
