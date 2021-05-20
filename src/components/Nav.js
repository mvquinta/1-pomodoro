import React from 'react'

export default function Nav(props) {

    //reads the button innerText that is used to change the state of sessionType in App.js
    function getSessionType(event) {
        props.valueSetType(event.target.innerText)
  }

    return(
        <nav>
            <ul>
                <li><button className='btn-pos' onClick={getSessionType}>Short Break</button></li>
                <li><button onClick={getSessionType}>Pomodoro</button></li>
                <li><button className='btn-pos' onClick={getSessionType}>Long Break</button></li>
            </ul>
      </nav>
    )
}