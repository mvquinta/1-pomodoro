import React from "react";
import ReactDom from 'react-dom'
import './styles/ModalPop.css'

export default function PopEditTime(props) {
  const [editPomodoroMin, setEditPomodoroMin] = React.useState(0)
  const [editPomodoroSec, setEditPomodoroSec] = React.useState(0)
  const [editShortMin, setEditShortMin] = React.useState(0)
  const [editShortSec, setEditShortSec] = React.useState(0)
  const [editLongMin, setEditLongMin] = React.useState(0)
  const [editLongSec, setEditLongSec] = React.useState(0)

  //reads the input fields and converts it to seconds. These values are then used to update setStates of sessions.
  //I also set activeSession for new pomodoroTime as default and to render-update the ui
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

  function handleCancelClick() {
    props.valueSetPopEditTime(false);
  }

  return ReactDom.createPortal(
    <>
      <div className='overlayStyles' />
      <div className='container-EditTime'>
        <div className='popup-EditTime'>           
            <div className='popInputContainer-EditTime'>
              <h2 className='poph2-EditTime'>Edit Time</h2>            
              <div className='timersContainer-flex'>
                <div className='timersContainer-box'>
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
                      type="number"
                      placeholder="25"
                      onChange={(e) => setEditPomodoroMin(e.target.value)}
                      className='popInput-EditTime'
                      />
                    </div>
                    <div>
                      <input
                      type="number"
                      onChange={(e) => setEditPomodoroSec(e.target.value)}
                      placeholder="00"
                      className='popInput-EditTime'
                      />
                    </div>
                  </div>
                </div>
                <div className='timersContainer-box'>
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
                      placeholder="5"
                      className='popInput-EditTime'
                      />
                    </div>
                    <div>
                      <input
                      type="number"
                      onChange={(e) => setEditShortSec(e.target.value)}
                      placeholder="00"
                      className='popInput-EditTime'
                      />
                    </div>
                  </div>
                </div>
                <div className='timersContainer-box'>
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
                      placeholder="15"
                      className='popInput-EditTime'
                      />
                    </div>
                    <div>
                      <input
                      type="number"
                      onChange={(e) => setEditLongSec(e.target.value)}
                      placeholder="00"
                      className='popInput-EditTime'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          <div className='popButtonsContainer-EditTime'>
            <button className='popbuttons-EditTime' onClick={handleOkClick}>
              OK
            </button>
            <button className='popbuttons-EditTime' onClick={handleCancelClick}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  )
}
