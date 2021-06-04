import React from 'react'

export default function Nav(props) {

    const [activePomodoro, setActivePomodoro] = React.useState(true)
    const [activeShort, setActiveShort] = React.useState(false)
    const [activeLong, setActiveLong] = React.useState(false)

    const toggleActivePomodoro = () => {
        setActivePomodoro(true)
        setActiveShort(false)
        setActiveLong(false)
    }

    function toggleActiveShort () {
        setActivePomodoro(false)
        setActiveShort(true)
        setActiveLong(false)
    }

    function toggleActiveLong () {
        setActivePomodoro(false)
        setActiveShort(false)
        setActiveLong(true)
    }

    //reads the button innerText that is used to change the state of sessionType in App.js
    function getSessionType(event) {
        props.valueSetType(event.target.innerText)
  }

  function handlePomodoroOnClick(event) {
    getSessionType(event)
    toggleActivePomodoro()
  }

  function handleShortOnClick(event) {
    getSessionType(event)
    toggleActiveShort()
  }

  function handleLongOnClick(event) {
    getSessionType(event)
    toggleActiveLong()
  }

    return(
        <nav>
            <ul>
                <li><button                
                onClick={handleShortOnClick}
                className={activeShort ? 'btn-pos-active' : 'btn-pos'}>
                    Short Break
                </button></li>
                <li><button                 
                 onClick={handlePomodoroOnClick}
                 id={activePomodoro ? 'btn-pomodoro-active' : 'btn-pomodoro'}>
                     Pomodoro
                </button></li>
                <li><button                
                onClick={handleLongOnClick}
                className={activeLong ? 'btn-pos-active' : 'btn-pos'}>
                    Long Break
                </button></li>
            </ul>
      </nav>
    )
}