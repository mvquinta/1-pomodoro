import React, { useState, useEffect, useRef } from "react";
import { IoPlay, IoPause, IoRefresh, IoSettings } from "react-icons/io5";
import PopEditTime from "./PopEditTime";
import { motion } from "framer-motion";
import Hovertip from "./Hovertip";

//Animation Variants

const buttonVariants = {
  hover: {
    scale: 1.1,
  },
  tap: {
    scale: 0.9,
  },
};

export default function ClockTimer({ valueType }) {
  //State that identifies what session user has clicked.
  //I could use props.valueType directly but I translated it this way for a cleaner code
  const [sessionID, setSessionID] = useState(0);

  //State used to render and implement all other features (play, stop, etc)
  const [activeSession, setActiveSession] = useState(25 * 60);

  //For useState inital values: function that checks if there's some localStorage data.
  //If true, load localStorage data, if not, load default time values
  const [pomodoroSession, setPomodoroSession] = useState(() => {
    const localPomodoroTime = localStorage.getItem("pomodoroTime");
    return localPomodoroTime ? JSON.parse(localPomodoroTime) : 25 * 60;
  });
  const [shortSession, setShortSession] = useState(() => {
    const localShortTime = localStorage.getItem("shortTime");
    return localShortTime ? JSON.parse(localShortTime) : 5 * 60;
  });
  const [longSession, setLongSession] = useState(() => {
    const localLongTime = localStorage.getItem("longTime");
    return localLongTime ? JSON.parse(localLongTime) : 15 * 60;
  });

  const [play, setPlay] = useState(false); //state to toggle play timer
  const [pause, setPause] = useState(true); //state to toggle pause timer
  const [popEditTime, setPopEditTime] = useState(false); //state to toggle edit time popup window
  const id = useRef(null); //state to be used in window.setInterval

  //Audios for when time is up, play, stop and restart are clicked
  const audioBell = new Audio(
    "http://soundbible.com/grab.php?id=2218&type=mp3"
  );
  const audioTick = new Audio(
    "http://soundbible.com/grab.php?id=2044&type=mp3"
  );

  function playAudioBell() {
    audioBell.play();
  }
  function playAudioTick() {
    audioTick.play();
  }

  //save time session to localStorage
  useEffect(() => {
    localStorage.setItem("pomodoroTime", JSON.stringify(pomodoroSession));
  }, [pomodoroSession]);
  useEffect(() => {
    localStorage.setItem("shortTime", JSON.stringify(shortSession));
  }, [shortSession]);
  useEffect(() => {
    localStorage.setItem("longTime", JSON.stringify(longSession));
  }, [longSession]);

  //sent by Nav.js -> App.js, we get what session was clicked by the user and change the state of sessionID and activeSession accordingly
  useEffect(() => {
    if (valueType === "Pomodoro") {
      setPause(true);
      setPlay(false);
      setSessionID(0);
      setActiveSession(pomodoroSession);
    } else if (valueType === "Short Break") {
      setPause(true);
      setPlay(false);
      setSessionID(1);
      setActiveSession(shortSession);
    } else if (valueType === "Long Break") {
      setPause(true);
      setPlay(false);
      setSessionID(2);
      setActiveSession(longSession);
    }
  }, [valueType]);

  //setInterval, counter for when play is true, clearInterval when pause is true
  useEffect(() => {
    if (play) {
      id.current = window.setInterval(() => {
        setActiveSession((second) => second - 1);
      }, 1000);
    } else if (pause) {
      window.clearInterval(id.current);
    }
  }, [play, pause]);

  //when session timer gets to 0 timer is stopped by changing state of pause and play. If not it would go to negative values
  //then we reset activeSession based on the sessionID
  useEffect(() => {
    if (activeSession === 0) {
      playAudioBell();
      setPause(true);
      setPlay(false);
      switch (sessionID) {
        case 0:
          setActiveSession(pomodoroSession);
          break;
        case 1:
          setActiveSession(shortSession);
          break;
        case 2:
          setActiveSession(longSession);
          break;
        default:
          setActiveSession(25 * 60);
      }
    }
  }, [activeSession]);

  //math conversion of time to be rendered
  function convertTime(updateSession) {
    const updateMinutes = Math.floor(updateSession / 60); //from total seconds gets all full minutes
    let updateSeconds = updateSession % 60; //from total seconds, gets the reminder that are the 'missing' seconds

    updateSeconds = updateSeconds < 10 ? "0" + updateSeconds : updateSeconds; //if seconds under 10, add a 0. Only for rendering two numbers

    return `${updateMinutes}:${updateSeconds}`; //returns the info to be rendered
  }

  function playTrue() {
    playAudioTick();
    setPlay(true);
    setPause(false);
  }

  function pauseTrue() {
    playAudioTick();
    setPause(true);
    setPlay(false);
  }

  function restartTimer() {
    playAudioTick();
    setPlay(false);
    setPause(true);
    switch (sessionID) {
      case 0:
        setActiveSession(pomodoroSession);
        break;
      case 1:
        setActiveSession(shortSession);
        break;
      case 2:
        setActiveSession(longSession);
        break;
      default:
        setActiveSession(25 * 60);
    }
  }

  function togglePopEditTime() {
    popEditTime ? setPopEditTime(false) : setPopEditTime(true);
  }

  return (
    <div className="div-clock-timer">
      <div className="circle-ext">
        <div className="circle">
          <div className="circle-content">
            <div className="timer-session">{convertTime(activeSession)}</div>
          </div>
        </div>
      </div>
      <div className="circle-settings-icon">
        {popEditTime ? (
          <PopEditTime
            valueSetPopEditTime={setPopEditTime}
            valueSetPomodoroSession={setPomodoroSession}
            valueSetShortSession={setShortSession}
            valueSetLongSession={setLongSession}
            valueSetActiveSession={setActiveSession}
          />
        ) : null}
        <motion.button
          className="btn-clock-settings"
          onClick={togglePopEditTime}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <Hovertip text="Edit Times">
            <IoSettings />
          </Hovertip>
        </motion.button>
      </div>
      <div className="circle-buttons">
        <motion.button
          className={play ? "circle-button-disabled" : "circle-button-active"}
          disabled={play}
          onClick={playTrue}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <IoPlay />
        </motion.button>
        <motion.button
          className={pause ? "circle-button-disabled" : "circle-button-active"}
          disabled={pause}
          onClick={pauseTrue}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <IoPause />
        </motion.button>
        <motion.button
          className="circle-button-active"
          onClick={restartTimer}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <IoRefresh />
        </motion.button>
      </div>
    </div>
  );
}
