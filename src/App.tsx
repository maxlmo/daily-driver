import './fonts';
import React from 'react'
import Draggable from 'react-draggable';
import { DailyDriver } from './components/DailyDriver';

function App() {
    return (
      <Draggable bounds={{left: 0, top: 0}}>
          <div style={{position: "absolute", left: 0, zIndex: 1000}}>
              <DailyDriver/>
          </div>
      </Draggable>
    )
}

export default App
