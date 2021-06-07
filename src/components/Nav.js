import React, { useState } from 'react'
import { motion } from 'framer-motion'

const buttonVariants = {
    initial: {
        y: 40,
    },
    hover: {
        scale: 1.1,
    },
    tap: {
        scale: 0.9,
    }
}

const buttonPomoVariants = {
    initial: {
        y: 0,
    },
    hover: {
        scale: 1.1,
    },
    tap: {
        scale: 0.9,
    }
}

export default function Nav({ valueSetType }) {

    const [activePomodoro, setActivePomodoro] = useState(true)
    const [activeShort, setActiveShort] = useState(false)
    const [activeLong, setActiveLong] = useState(false)

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
        valueSetType(event.target.innerText)
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
                <li><motion.button                
                onClick={handleShortOnClick}
                className={activeShort ? 'btn-pos-active' : 'btn-pos'}
                variants={buttonVariants}
                whileHover='hover'
                whileTap='tap'
                >
                    Short Break
                </motion.button></li>
                <li><motion.button                 
                 onClick={handlePomodoroOnClick}
                 id={activePomodoro ? 'btn-pomodoro-active' : 'btn-pomodoro'}
                 variants={buttonPomoVariants}
                 whileHover='hover'
                 whileTap='tap'
                 >
                     Pomodoro
                </motion.button></li>
                <li><motion.button                
                onClick={handleLongOnClick}
                className={activeLong ? 'btn-pos-active' : 'btn-pos'}
                variants={buttonVariants}
                whileHover='hover'
                whileTap='tap'
                >
                    Long Break
                </motion.button></li>
            </ul>
      </nav>
    )
}