import './App.css';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ContainerLayout from './app/layout/container-layout';

function App() {
  return (
    <Router>
      <ContainerLayout />
    </Router>
  );
}

export default App;
