import React from 'react'
import './App.css';
import Nav from './components/Nav'
import ClockTimer from './components/ClockTimer'
import Todos from './components/Todos'


function App() {

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
