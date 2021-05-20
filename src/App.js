import React from 'react'
import './App.css';
import Nav from './components/Nav'
import ClockTimer from './components/ClockTimer'
import Todos from './components/Todos'


function App() {

  //state of the session type. By default is pomodoro. This state can be change in Nav.js
  //value of state is passed to clocktimer component to adjust-set default times of each session.
  const [sessionType, setSessionType] = React.useState('Pomodoro')
  
  return (
    <div className="App">
      <h1 className='h1-title'>1+Pomodoro</h1>
      <div className='main-wrapper'>

      <div className='wrapper-clock-timer'>
          <Nav valueType={sessionType} valueSetType={setSessionType}/>
          <ClockTimer valueType={sessionType}/>
      </div>

        <Todos />
      </div>   
    </div>
  );
}

export default App;
