import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Timer} from './Timer';
import {DebugView} from './DebugView';

function App() {
  return (
    <div className="App">
      <Timer/>
      <DebugView />
    </div>
  );
}

export default App;
