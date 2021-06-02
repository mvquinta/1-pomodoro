import React, { useState, useEffect, useRef } from 'react'
import { IoPlay, IoStop, IoRefresh, IoSettings } from 'react-icons/io5'
import Hovertip from './Hovertip'
import PopEditTime from './PopEditTime'
import { IconContext } from 'react-icons'
import { motion } from 'framer-motion'


//Animation Variants

const buttonVariants = {
    hover: {
        scale: 1.1,
        //boxShadow: "0px 0px 5px rgba(0,0,0, 0.25)",
        //borderRadius: 10,
    }
}

export default function ClockTimer(props) {

    const [session, setSession] = useState(25 * 60) //converts session from minutes to seconds.

    const [sessionID, setSessionID] = useState(0)

    const [pomodoroSession, setPomodoroSession] = useState(24 * 60)
    const [shortSession, setShortSession] = useState(4 * 60)
    const [longSession, setLongSession] = useState(14 * 60)

    //const [clockSession, setClockSession] = useState(1300)

    const [play, setPlay] = useState(false) //state to toggle play timer
    const [pause, setPause] = useState(true) //state to toggle pause timer
    const [popEditTime, setPopEditTime] = useState(false) //state to toggle edit time popup window
    const id = useRef(null)

    //Audio const and functions to be used when time is up and play, stop and restart are clicked
    const audioBell = new Audio('http://soundbible.com/grab.php?id=2218&type=mp3') //2044 - tick 2218 - service bell 
    const audioTick = new Audio('http://soundbible.com/grab.php?id=2044&type=mp3') //2044 - tick 2218 - service bell 
    const audioWaterDroplet = new Audio('http://soundbible.com/grab.php?id=378&type=mp3') //2044 - tick 2218 - service bell - 378 - waterr droplet

    function playAudioBell() { audioBell.play() }
    function playAudioTick() { audioTick.play() }
    function playAudioWaterDroplet() {audioWaterDroplet.play()}
    //function pauseAudioBell() { audioBell.pause() }

    //update this comment
    useEffect(() => {
        if (props.valueType === 'Pomodoro') {
            setSessionID(0)
        } else if ( props.valueType === 'Short Break') {
            setSessionID(1)
        } else if (props.valueType === 'Long Break') {
            setSessionID(2)
        }
    }, [props.valueType])

    //setInterval for when play is active to count the timer down 1 second each second XD
    //when pause is clicked, set to true, clearInterval method stops setInterval

    useEffect(() => {
        if (play) {
            id.current = window.setInterval(() => {
                sessionID === 0
                ? setPomodoroSession((second) => second - 1)
                : sessionID === 1
                ? setShortSession((second) => second - 1)
                : sessionID === 2
                ? setLongSession((second) => second - 1)
                : console.log('cool')
            }, 1000)
        } else if (pause){
            window.clearInterval(id.current)
        }
    }, [play, pause])


    //when session timer gets to 0 we stop timer by changing state of pause and play. If not it would go to negative values
    //than we reset session to pomodoro defaul time (this might be changed...)
    useEffect(() => {
        if(pomodoroSession === 0 || shortSession === 0 || longSession === 0) {
            playAudioBell()
            setPause(true)
            setPlay(false)
            setSession(25 * 60)
        }
    },[pomodoroSession, shortSession, longSession])



    //math conversion of time to be rendered 
    function convertTime(updateSession) {
        const updateMinutes = Math.floor(updateSession / 60) //from total seconds gets all full minutes
        let updateSeconds = updateSession % 60 //from total seconds, gets the reminder that are the 'missing' seconds

        updateSeconds = updateSeconds < 10 ? ('0' + updateSeconds) : updateSeconds //if seconds under 10, add a 0. Only for rendering two numbers

        return `${updateMinutes}:${updateSeconds}` //returns the info to be rendered
    }

    function playTrue() { 
        playAudioTick()
        setPlay(true)
        setPause(false)
        }

    function pauseTrue() {
        playAudioTick()
        setPause(true)
        setPlay(false)
    }

    function restartTimer() {
        playAudioWaterDroplet()
        setPlay(false)
        setPause(true)
        setSession(25 * 60)
    }

    function togglePopEditTime() {
        popEditTime ? setPopEditTime(false) : setPopEditTime(true)
    }

    return(
        <div className='div-clock-timer'>
            <div className='circle-ext'>
                <div className='circle'>
                    <div className='circle-content'>
                        <div>
                            {sessionID === 0 
                            ? <span className='timer-session'>{convertTime(pomodoroSession)}</span>
                            : sessionID === 1
                            ? <span className='timer-session'>{convertTime(shortSession)}</span>
                            : sessionID === 2 
                            ? <span className='timer-session'>{convertTime(longSession)}</span>
                            : null}
                        </div>
                    </div>
                </div>
            </div>
            <div className='circle-settings-icon'>
                {popEditTime ? <PopEditTime
                valueSetPopEditTime={setPopEditTime}
                valueSetPomodoroSession={setPomodoroSession}
                valueSetShortSession={setShortSession}
                valueSetLongSession={setLongSession}
                /> : null}
                <button onClick={togglePopEditTime}><IoSettings /></button>
            </div>
            <IconContext.Provider value={{ color: "#F25C5C", size:"1.8em", className: "global-class-name" }}>
                <div className='circle-buttons'>
                    <motion.button 
                    onClick={playTrue}
                    variants={buttonVariants}
                    whileHover='hover'>
                        <IoPlay />
                    </motion.button>
                    <motion.button
                    onClick={pauseTrue}
                    variants={buttonVariants}
                    whileHover='hover'>
                        <IoStop />
                    </motion.button>
                    <motion.button
                    onClick={restartTimer}
                    variants={buttonVariants}
                    whileHover='hover'>
                        <IoRefresh />
                    </motion.button>
                </div>
            </IconContext.Provider>
      </div>
    )
}