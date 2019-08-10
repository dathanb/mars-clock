import React from 'react';
import './App.css';
import {Timer} from './Timer';
import {MarsClock} from './MarsCalendar';
import {EarthClock} from './EarthCalendar';

function App() {
    return (
        <div className="App">
            <Timer/>
            <MarsClock
                name={"Curiosity"}
                longitude={222.6}
            />
            <EarthClock
                name={"Earth"}
            />
        </div>
    );
}

export default App;
