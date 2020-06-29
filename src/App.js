import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Bookshelf from './containers/Bookshelf'
import './App.css';

function App() {
  return (
    <BrowserRouter>
        <Bookshelf />
    </BrowserRouter>
  );
}

export default App;
