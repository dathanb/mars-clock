import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Timer} from './Timer';
import {DebugView} from './DebugView';
import {MarsClock} from './MarsCalendar';

function App() {
  return (
    <div className="App">
      <Timer/>
      <DebugView />
      <MarsClock
          name={"Curiosity"}
          longitude={222.6}
      />
    </div>
  );
}

export default App;
