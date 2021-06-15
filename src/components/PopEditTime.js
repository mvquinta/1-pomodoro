import React, { useState } from "react";
import ReactDom from "react-dom";
import "./styles/ModalPop.css";
import { motion } from "framer-motion";

//Animation Variants

const editTimeContainer = {
  initial: {
    origin: 0,
    origin: 0,
    scale: 0,
    opacity: 0,
    x: "-50%",
    y: "-50%",
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 0.4,
    },
  },
};

const buttonVariants = {
  hover: {
    origin: 0,
    origin: 0,
    scale: 1.1,
  },
  tap: {
    scale: 0.9,
  },
};

const timersContainerVariants = {
  hover: {},
};

export default function PopEditTime({
  valueSetPomodoroSession,
  valueSetShortSession,
  valueSetLongSession,
  valueSetActiveSession,
  valueSetPopEditTime,
}) {
  const [editPomodoroMin, setEditPomodoroMin] = useState(25);
  const [editPomodoroSec, setEditPomodoroSec] = useState(0);
  const [editShortMin, setEditShortMin] = useState(5);
  const [editShortSec, setEditShortSec] = useState(0);
  const [editLongMin, setEditLongMin] = useState(15);
  const [editLongSec, setEditLongSec] = useState(0);

  //reads the input fields and converts it to seconds. Values are then used to update setStates of sessions.
  //Set activeSession for new pomodoroTime as default and also to render-update the ui
  //As safe measure, I first set times to their default and edit them if needed
  function handleOkClick() {
    let convertedPomodorTime = 25 * 60;
    if (isNaN(parseInt(editPomodoroMin)) || isNaN(parseInt(editPomodoroSec))) {
      return false;
    } else {
      convertedPomodorTime =
        parseInt(editPomodoroMin) * 60 + parseInt(editPomodoroSec);
    }

    let convertedShortTime = 5 * 60;
    if (isNaN(parseInt(editShortMin)) || isNaN(parseInt(editShortSec))) {
      return false;
    } else {
      convertedShortTime = parseInt(editShortMin) * 60 + parseInt(editShortSec);
    }

    let convertedLongTime = 15 * 60;
    if (isNaN(parseInt(editLongMin)) || isNaN(parseInt(editLongSec))) {
      return false;
    } else {
      convertedLongTime = parseInt(editLongMin) * 60 + parseInt(editLongSec);
    }

    convertedPomodorTime === 0
      ? valueSetPomodoroSession(25 * 60)
      : valueSetPomodoroSession(convertedPomodorTime);

    convertedShortTime === 0
      ? valueSetShortSession(5 * 60)
      : valueSetShortSession(convertedShortTime);

    convertedLongTime === 0
      ? valueSetLongSession(15 * 60)
      : valueSetLongSession(convertedLongTime);

    valueSetActiveSession(convertedPomodorTime);
    valueSetPopEditTime(false);
  }

  //if press enter add project
  function handleKeyPress(event) {
    if (event.charCode === 13) {
      //could also be code === "Enter"
      handleOkClick();
    }
  }

  function handleCancelClick() {
    valueSetPopEditTime(false);
  }

  return ReactDom.createPortal(
    <>
      <div className="overlayStyles" />
      <motion.div
        className="container-EditTime"
        variants={editTimeContainer}
        initial="initial"
        animate="animate"
      >
        <div className="popup-EditTime">
          <div className="popInputContainer-EditTime">
            <h2 className="poph2-EditTime">Edit Time</h2>
            <div className="timersContainer-flex">
              <motion.div
                className="timersContainer-box"
                variants={timersContainerVariants}
                whileHover="hover"
              >
                <h3>Pomodoro</h3>
                <div className="timersContainer-innerBox">
                  <div>
                    <label className="popLabel-EditTime">min</label>
                  </div>
                  <div>
                    <label className="popLabel-EditTime">sec</label>
                  </div>
                </div>
                <div className="timersContainer-innerBox">
                  <div>
                    <input
                      autoFocus={true}
                      type="number"
                      value={editPomodoroMin}
                      onChange={(e) => setEditPomodoroMin(e.target.value)}
                      onKeyPress={(e) => handleKeyPress(e)}
                      className="popInput-EditTime"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      value={editPomodoroSec}
                      onChange={(e) => setEditPomodoroSec(e.target.value)}
                      onKeyPress={(e) => handleKeyPress(e)}
                      className="popInput-EditTime"
                    />
                  </div>
                </div>
              </motion.div>
              <motion.div
                className="timersContainer-box"
                variants={timersContainerVariants}
                whileHover="hover"
              >
                <h3>Short Break</h3>
                <div className="timersContainer-innerBox">
                  <div>
                    <label className="popLabel-EditTime">min</label>
                  </div>
                  <div>
                    <label className="popLabel-EditTime">sec</label>
                  </div>
                </div>
                <div className="timersContainer-innerBox">
                  <div>
                    <input
                      type="number"
                      value={editShortMin}
                      onChange={(e) => setEditShortMin(e.target.value)}
                      onKeyPress={(e) => handleKeyPress(e)}
                      className="popInput-EditTime"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      value={editShortSec}
                      onChange={(e) => setEditShortSec(e.target.value)}
                      onKeyPress={(e) => handleKeyPress(e)}
                      className="popInput-EditTime"
                    />
                  </div>
                </div>
              </motion.div>
              <motion.div
                className="timersContainer-box"
                variants={timersContainerVariants}
                whileHover="hover"
              >
                <h3>Long Break</h3>
                <div className="timersContainer-innerBox">
                  <div>
                    <label className="popLabel-EditTime">min</label>
                  </div>
                  <div>
                    <label className="popLabel-EditTime">sec</label>
                  </div>
                </div>
                <div className="timersContainer-innerBox">
                  <div>
                    <input
                      type="number"
                      value={editLongMin}
                      onChange={(e) => setEditLongMin(e.target.value)}
                      onKeyPress={(e) => handleKeyPress(e)}
                      className="popInput-EditTime"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      value={editLongSec}
                      onChange={(e) => setEditLongSec(e.target.value)}
                      onKeyPress={(e) => handleKeyPress(e)}
                      className="popInput-EditTime"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          <div className="popButtonsContainer-EditTime">
            <motion.button
              className="popbuttons-EditTime"
              onClick={handleCancelClick}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Cancel
            </motion.button>
            <motion.button
              className="popbuttons-EditTime"
              onClick={handleOkClick}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              OK
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>,
    document.getElementById("portal")
  );
}
