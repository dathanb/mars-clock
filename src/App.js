import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Timer} from './Timer';
import {CoordinatedMarsTime} from './CoordinatedMarsTime';

function App() {
  return (
    <div className="App">
      <Timer/>
      <CoordinatedMarsTime />
    </div>
  );
}

export default App;
