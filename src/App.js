import React from 'react';
import './App.css';
import {Timer} from './Timer';
import {CuriosityClock, MtcClock} from './MarsCalendar';
import {EarthClock} from './EarthCalendar';

function App() {
    return (
        <div className="App">
            <Timer/>
            <EarthClock
                name={"Local Time"}
            />
            <MtcClock />
            <CuriosityClock />
        </div>
    );
}

export default App;
