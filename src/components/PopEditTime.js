import React from "react";
import ReactDom from 'react-dom'
import './styles/ModalPop.css'
import { motion } from 'framer-motion'



//Animation Variants

const editTimeContainer = {
  initial: {
    origin: 0,
    origin: 0,
    scale: 0,
    opacity: 0,
    x: '-50%',
    y: '-50%',
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      duration: 0.4,
    }
  }
}

const buttonVariants = {
    hover: {
        origin: 0,
        origin: 0,
        scale: 1.1,
    },
    tap: {
        scale: 0.9,
    }
}

const timersContainerVariants = {
  hover: {
       
  }
}


export default function PopEditTime(props) {
  const [editPomodoroMin, setEditPomodoroMin] = React.useState(0)
  const [editPomodoroSec, setEditPomodoroSec] = React.useState(0)
  const [editShortMin, setEditShortMin] = React.useState(0)
  const [editShortSec, setEditShortSec] = React.useState(0)
  const [editLongMin, setEditLongMin] = React.useState(0)
  const [editLongSec, setEditLongSec] = React.useState(0)

  //reads the input fields and converts it to seconds. Values are then used to update setStates of sessions.
  //Set activeSession for new pomodoroTime as default and also to render-update the ui
  function handleOkClick() {
    const convertedPomodorTime = parseInt(editPomodoroMin) * 60 + parseInt(editPomodoroSec);
    const convertedShortTime = parseInt(editShortMin) * 60 + parseInt(editShortSec);
    const convertedLongTime = parseInt(editLongMin) * 60 + parseInt(editLongSec);
    convertedPomodorTime === 0 
    ? props.valueSetPomodoroSession(25 * 60)
    : props.valueSetPomodoroSession(convertedPomodorTime);
    convertedShortTime === 0 
    ? props.valueSetShortSession(5 * 60)
    : props.valueSetShortSession(convertedShortTime);
    convertedLongTime === 0 
    ? props.valueSetLongSession(15 * 60)
    : props.valueSetLongSession(convertedLongTime);
    props.valueSetActiveSession(convertedPomodorTime)
    props.valueSetPopEditTime(false);
  }

    //if press enter add project
    function handleKeyPress(event) {
      if (event.charCode === 13) { //could also be code === "Enter"
          handleOkClick()
      }
  } 

  function handleCancelClick() {
    props.valueSetPopEditTime(false);
  }

 

  return ReactDom.createPortal(
    <>
      <div className='overlayStyles' />
      <motion.div
      className='container-EditTime'
      variants={editTimeContainer}
      initial='initial'
      animate='animate'
      >
        <div className='popup-EditTime'>           
            <div className='popInputContainer-EditTime'>
              <h2 className='poph2-EditTime'>Edit Time</h2>            
              <div className='timersContainer-flex'>
                <motion.div 
                className='timersContainer-box'
                variants={timersContainerVariants}
                whileHover='hover'
                >
                  <h3>Pomodoro</h3>
                  <div className='timersContainer-innerBox'>
                    <div>
                      <label className='popLabel-EditTime'>min</label>
                    </div>  
                    <div>
                      <label className='popLabel-EditTime'>sec</label>
                    </div>
                  </div>
                  <div className='timersContainer-innerBox'>
                    <div>
                      <input
                      autoFocus={true}
                      type="number"
                      placeholder="25"
                      onChange={(e) => setEditPomodoroMin(e.target.value)}
                      onKeyPress={(e) => handleKeyPress(e)}
                      className='popInput-EditTime'
                      />
                    </div>
                    <div>
                      <input
                      type="number"
                      onChange={(e) => setEditPomodoroSec(e.target.value)}
                      onKeyPress={(e) => handleKeyPress(e)}
                      placeholder="00"
                      className='popInput-EditTime'
                      />
                    </div>
                  </div>
                </motion.div>
                <motion.div 
                className='timersContainer-box'
                variants={timersContainerVariants}
                whileHover='hover'>
                  <h3>Short Break</h3>
                  <div className='timersContainer-innerBox'>
                    <div>
                      <label className='popLabel-EditTime'>min</label>
                    </div>  
                    <div>
                      <label className='popLabel-EditTime'>sec</label>
                    </div>
                  </div>
                  <div className='timersContainer-innerBox'>
                    <div>
                      <input
                      type="number"
                      onChange={(e) => setEditShortMin(e.target.value)}
                      onKeyPress={(e) => handleKeyPress(e)}
                      placeholder="5"
                      className='popInput-EditTime'
                      />
                    </div>
                    <div>
                      <input
                      type="number"
                      onChange={(e) => setEditShortSec(e.target.value)}
                      onKeyPress={(e) => handleKeyPress(e)}
                      placeholder="00"
                      className='popInput-EditTime'
                      />
                    </div>
                  </div>
                </motion.div>
                <motion.div 
                className='timersContainer-box'
                variants={timersContainerVariants}
                whileHover='hover'>
                  <h3>Long Break</h3>
                  <div className='timersContainer-innerBox'>
                    <div>
                      <label className='popLabel-EditTime'>min</label>
                    </div>  
                    <div>
                      <label className='popLabel-EditTime'>sec</label>
                    </div>
                  </div>
                  <div className='timersContainer-innerBox'>
                    <div>
                      <input
                      type="number"
                      onChange={(e) => setEditLongMin(e.target.value)}
                      onKeyPress={(e) => handleKeyPress(e)}
                      placeholder="15"
                      className='popInput-EditTime'
                      />
                    </div>
                    <div>
                      <input
                      type="number"
                      onChange={(e) => setEditLongSec(e.target.value)}
                      onKeyPress={(e) => handleKeyPress(e)}
                      placeholder="00"
                      className='popInput-EditTime'
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          <div className='popButtonsContainer-EditTime'>
            <motion.button
            className='popbuttons-EditTime'
            onClick={handleCancelClick}
            variants={buttonVariants}
            whileHover='hover'
            whileTap='tap'
            >
              Cancel
            </motion.button>
            <motion.button
            className='popbuttons-EditTime'
            onClick={handleOkClick}
            variants={buttonVariants}
            whileHover='hover'
            whileTap='tap'
            >
              OK
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>,
    document.getElementById('portal')
  )
}
