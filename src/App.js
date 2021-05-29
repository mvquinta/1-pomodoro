import React from "react";
import "./App.css";
import Nav from "./components/Nav";
import ClockTimer from "./components/ClockTimer";
import Todos from "./components/Todos";
import { motion } from 'framer-motion'


function App() {
  //state of the session type. By default is pomodoro. This state can be change in Nav.js
  //value of state is passed to clocktimer component to adjust-set default times of each session.
  const [sessionType, setSessionType] = React.useState("Pomodoro");

  return (
    <div className="App">
      <div className="main-wrapper">
        <motion.h1 
        className="h1-title"
        initial={{opacity:0, y: -250}}
        animate={{opacity:1, y: 0}}
        ttransition={{delay: 0.2, duration: 1.5,type: 'spring'}}      
        >1+Pomodoro</motion.h1>
        <motion.div
        className="features-wrapper"
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{delay: 0.1, duration: 1}}
        >
          <div className="wrapper-clock-timer">
            <Nav valueType={sessionType} valueSetType={setSessionType} />
            <ClockTimer valueType={sessionType} />
          </div>
          <div className="wrapper-todos">
            <Todos />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default App;
