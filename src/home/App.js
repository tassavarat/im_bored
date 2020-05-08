import React from 'react';
import './App.css';
import Main from './main.js';

const App = () => (
  <div className='app'>
    <section className='title-section'>
      <h1><a href='/' className='title-link'> Im Bored... </a><small className='instruction'> choose a game to play </small></h1>
    </section>
    <Main />
  </div>
);

export default App;
