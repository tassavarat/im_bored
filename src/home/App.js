import React from 'react';
import './App.css';
import Main from './main.js';
import { NavLink } from 'react-router-dom';

const App = () => (
  <div className='app'>
    <nav>
      <h1><NavLink to='/'>im bored</NavLink></h1>
    </nav>
    <Main />
  </div>
);

export default App;
