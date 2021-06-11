import React from "react";
import "./App.css";
import TitleBar from "./components/TitleBar";
import Nav from "./components/Nav";
import ClockTimer from "./components/ClockTimer";
import Todos from "./components/Todos";
import { motion } from 'framer-motion'

function App() {
  //state of the session type. Default is Pomodoro. State comes from Nav.js
  //state sent to Clocktimer.js
  const [sessionType, setSessionType] = React.useState("Pomodoro");

  return (
    <div className="App">
      <div className="main-wrapper">
        <TitleBar />
        <div className="features-wrapper">
          <div className="wrapper-clock-timer">
            <Nav valueType={sessionType} valueSetType={setSessionType} />
            <ClockTimer valueType={sessionType} />
          </div>
          <div className="wrapper-todos">
            <Todos />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
