import { React, useState } from 'react';
import './App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="app">
      <section className="title-section">
        <h1>
          <a href="/" className="title-link"> Im Bored... </a>
          <small className="instruction"> choose a game to play </small>
        </h1>
      </section>
    </div>
  );
}

export default App;
