import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
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
