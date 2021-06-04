import React, { useState, useEffect, useRef } from 'react'
import { IoPlay, IoStop, IoRefresh, IoSettings } from 'react-icons/io5'
import PopEditTime from './PopEditTime'
import { IconContext } from 'react-icons'
import { motion } from 'framer-motion'

//Animation Variants

const buttonVariants = {
    hover: {
        scale: 1.1,
        //boxShadow: "0px 0px 5px rgba(0,0,0, 0.25)",
        //borderRadius: 10,
    },
    tap: {
        scale: 0.9,
    }
}

export default function ClockTimer(props) {
    //This state will be used in the app to interpret and to know what's the session that user as clicked.
    //I could use props.valueType directly but I translated it this way for a cleaner code
    const [sessionID, setSessionID] = useState(0)
    //this state will change and receive whatever are the values stored in pomodoroSession, shortSession or longSession
    //I'll use this state to render and implement all other features (play, stop, etc) instead of dealing with 3 states at the same time
    const [activeSession, setActiveSession] = useState(25 * 60) 
 
    //As my useState inital values, I call an arrow function that checks if there's some localStorage data.
    //If this is true, load localStorage data, if not, load default time values
    const [pomodoroSession, setPomodoroSession] = useState(() => {
        const localPomodoroTime = localStorage.getItem('pomodoroTime')
        return localPomodoroTime ? JSON.parse(localPomodoroTime) : (25 * 60)
    }) //initialized with default values
    const [shortSession, setShortSession] = useState(() => {
        const localShortTime = localStorage.getItem('shortTime')
        return localShortTime ? JSON.parse(localShortTime) : (5 * 60)
    }) //initialized with default values
    const [longSession, setLongSession] = useState(() => {
        const localLongTime = localStorage.getItem('longTime')
        return localLongTime ? JSON.parse(localLongTime) : (15 * 60)
    }) //initialized with default values

    const [play, setPlay] = useState(false) //state to toggle play timer
    const [pause, setPause] = useState(true) //state to toggle pause timer
    const [popEditTime, setPopEditTime] = useState(false) //state to toggle edit time popup window
    const id = useRef(null) //state to be used in window.setInterval

    //Audio const and functions to be used when time is up and play, stop and restart are clicked
    const audioBell = new Audio('http://soundbible.com/grab.php?id=2218&type=mp3') //2044 - tick 2218 - service bell 
    const audioTick = new Audio('http://soundbible.com/grab.php?id=2044&type=mp3') //2044 - tick 2218 - service bell 
    const audioWaterDroplet = new Audio('http://soundbible.com/grab.php?id=378&type=mp3') //2044 - tick 2218 - service bell - 378 - waterr droplet

    function playAudioBell() { audioBell.play() }
    function playAudioTick() { audioTick.play() }
    function playAudioWaterDroplet() {audioWaterDroplet.play()}
    //function pauseAudioBell() { audioBell.pause() }

    //save time session to localStorage
    useEffect(() => {
        localStorage.setItem('pomodoroTime', JSON.stringify(pomodoroSession))
    },[pomodoroSession])
    useEffect(() => {
        localStorage.setItem('shortTime', JSON.stringify(shortSession))
    },[shortSession])
    useEffect(() => {
        localStorage.setItem('longTime', JSON.stringify(longSession))
    },[longSession])


    //sent by Nav.js -> App.js, we get what session was clicked by the user and change the state of sessionID and activeSession accordingly
    useEffect(() => {
        if (props.valueType === 'Pomodoro') {
            setSessionID(0)
            setActiveSession(pomodoroSession)
        } else if ( props.valueType === 'Short Break') {
            setSessionID(1)
            setActiveSession(shortSession)
        } else if (props.valueType === 'Long Break') {
            setSessionID(2)
            setActiveSession(longSession)
        }
    }, [props.valueType])


    //setInterval for when play is active to count the timer down 1 second each second
    //when pause is clicked set it to true. clearInterval method stops setInterval
    useEffect(() => {
        if (play) {
            id.current = window.setInterval(() => {
                setActiveSession((second) => second - 1)
            }, 1000)
        } else if (pause){
            window.clearInterval(id.current)
        }
    }, [play, pause])

    //when session timer gets to 0 we stop timer by changing state of pause and play. If not it would go to negative values
    //then we reset activeSession based on the sessionID
    useEffect(() => {
        if(activeSession === 0) {
            playAudioBell()
            setPause(true)
            setPlay(false)
            sessionID === 0 
            ? setActiveSession(pomodoroSession)
            : sessionID === 1
            ? setActiveSession(shortSession)
            : sessionID === 2
            ? setActiveSession(longSession)
            : setActiveSession(25 * 60)
        }
    },[activeSession])

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
        sessionID === 0 
        ? setActiveSession(pomodoroSession)
        : sessionID === 1
        ? setActiveSession(shortSession)
        : sessionID === 2
        ? setActiveSession(longSession)
        : setActiveSession(25 * 60) //if by any chance sessionID is not found, we reset activeSession to defaul value
    }

    function togglePopEditTime() {
        popEditTime ? setPopEditTime(false) : setPopEditTime(true)
    }

    return(
        <div className='div-clock-timer'>
            <div className='circle-ext'>
                <div className='circle'>
                    <div className='circle-content'>
                        <div className='timer-session'>
                            {convertTime(activeSession)}
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
                valueSetActiveSession={setActiveSession}
                /> : null}
                <motion.button
                className='btn-clock-settings'
                onClick={togglePopEditTime}
                variants={buttonVariants}
                whileHover='hover'
                whileTap='tap'>
                    <IoSettings />
                </motion.button>
            </div>
            <IconContext.Provider value={{ color: "#F25C5C", size:"1.8em", className: "global-class-name" }}>
                <div className='circle-buttons'>
                    <motion.button 
                    onClick={playTrue}
                    variants={buttonVariants}
                    whileHover='hover'
                    whileTap='tap'>
                        <IoPlay />
                    </motion.button>
                    <motion.button
                    onClick={pauseTrue}
                    variants={buttonVariants}
                    whileHover='hover'
                    whileTap='tap'>
                        <IoStop />
                    </motion.button>
                    <motion.button
                    onClick={restartTimer}
                    variants={buttonVariants}
                    whileHover='hover'
                    whileTap='tap'>
                        <IoRefresh />
                    </motion.button>
                </div>
            </IconContext.Provider>
      </div>
    )
}