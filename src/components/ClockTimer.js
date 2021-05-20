import React, { useState, useEffect, useRef } from 'react'
import { IoPlay, IoStop, IoRefresh, IoSettings } from 'react-icons/io5'
import Hovertip from './Hovertip'
import PopEditTime from './PopEditTime'
import { IconContext } from 'react-icons'

export default function ClockTimer(props) {

    const [session, setSession] = useState(25 * 60) //converts session from minutes to seconds.
    const [play, setPlay] = useState(false) //state to toggle play timer
    const [pause, setPause] = useState(true) //state to toggle pause timer
    const [popEditTime, setPopEditTime] = useState(false) //state to toggle edit time popup window
    const id = useRef(null)

    //depending on selected session, that is sent as a prop from App.js, different default session times are set
    //they are all converted from minutes to seconds
    useEffect(() => {
        if (props.valueType === 'Pomodoro') {
            setSession(25 * 60)
        } else if ( props.valueType === 'Short Break') {
            setSession(5 * 60)
        } else if (props.valueType === 'Long Break') {
            setSession(15 * 60)
        }
    }, [props.valueType])


    //setInterval for when play is active to count the timer down 1 second each second XD
    //when pause is clicked, set to true, clearInterval method stops setInterval
    useEffect(() => {
        if (play) {
            id.current = window.setInterval(() => {
                setSession((second) => second - 1)
            }, 1000)
        } else if (pause){
            window.clearInterval(id.current)
        }
    }, [play, pause])

    //when session timer gets to 0 we stop timer by changing state of pause and play. If not it would go to negative values
    //than we reset session to pomodoro defaul time (this might be changed...)
    if(session === 0) {
        setPause(true)
        setPlay(false)
        setSession(25 * 60)
    }

    //math conversion of time to be rendered 
    function convertTime(updateSession) {
        const updateMinutes = Math.floor(updateSession / 60) //from total seconds gets all full minutes
        let updateSeconds = updateSession % 60 //from total seconds, gets the reminder that are the 'missing' seconds

        updateSeconds = updateSeconds < 10 ? ('0' + updateSeconds) : updateSeconds //if seconds under 10, add a 0. Only for rendering two numbers

        return `${updateMinutes}:${updateSeconds}` //returns the info to be rendered
    }

    function playTrue() { 
        setPlay(true)
        setPause(false)
        }

    function pauseTrue() {
        setPause(true)
        setPlay(false)
    }

    function restartTimer() {
        setPlay(false)
        setSession(25 * 60)
    }

    function togglePopEditTime() {
        popEditTime ? setPopEditTime(false) : setPopEditTime(true)
    }

    return(
        <div className='div-clock-timer'>
        <div className='circle'>
          <div className='circle-content'>
            <div>
                <Hovertip text='Click To Edit'>
                    {popEditTime ? <PopEditTime valueSetSession={setSession} valueSetPopEditTime={setPopEditTime}/> : null}
                    <span className='timer-session' onClick={togglePopEditTime}>{convertTime(session)}</span>
                </Hovertip>
            </div>
            <IconContext.Provider value={{ color: "#F25C5C", size:"1.75em", className: "global-class-name" }}>
                <div className='circle-buttons'>
                    <button onClick={playTrue}><IoPlay /></button>
                    <button onClick={pauseTrue}><IoStop /></button>
                    <button onClick={restartTimer}><IoRefresh /></button>
                </div>
            </IconContext.Provider>
          </div>
        </div>
      </div>
    )
}