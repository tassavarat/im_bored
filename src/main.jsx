import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import Home from './home/Home'
import TicTacToe from './tictactoe/tic-tac-toe'
import Snake from './snake/snake'
import Sudoku from './sudoku/sudoku'
import About from './about/About'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: '/tictactoe',
    element: <TicTacToe />
  },
  {
    path: '/snake',
    element: <Snake />
  },
  {
    path: '/sudoku',
    element: <Sudoku />
  },
  {
    path: '/about',
    element: <About />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <RouterProvider router={router} />
  </React.StrictMode>,
)
