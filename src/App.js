import React from 'react';
import './App.css';
import {Timer} from './Timer';
import {MarsClock} from './MarsCalendar';

function App() {
    return (
        <div className="App">
            <Timer/>
            <MarsClock
                name={"Curiosity"}
                longitude={222.6}
            />
        </div>
    );
}

export default App;
