import React from "react";
import ReactDom from 'react-dom'
import './styles/ModalPop.css'

export default function PopEditTime(props) {
  const [editTime, setEditTime] = React.useState(0);
  const [secondsEditTime, setSecondsEdiTime] = React.useState(0);

  //reads the input fields and converts it to seconds. This value is than used to update the setSession time back in ClockTimer.js
  function handleOkClick() {
    const convertedTime = parseInt(editTime) * 60 + parseInt(secondsEditTime);
    props.valueSetSession(convertedTime);
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
                      onChange={(e) => setEditTime(e.target.value)}
                      placeholder="25"
                      className='popInput-EditTime'
                      />
                    </div>
                    <div>
                      <input
                      type="number"
                      onChange={(e) => setEditTime(e.target.value)}
                      placeholder="25"
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
                      onChange={(e) => setEditTime(e.target.value)}
                      placeholder="25"
                      className='popInput-EditTime'
                      />
                    </div>
                    <div>
                      <input
                      type="number"
                      onChange={(e) => setEditTime(e.target.value)}
                      placeholder="25"
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
                      onChange={(e) => setEditTime(e.target.value)}
                      placeholder="25"
                      className='popInput-EditTime'
                      />
                    </div>
                    <div>
                      <input
                      type="number"
                      onChange={(e) => setEditTime(e.target.value)}
                      placeholder="25"
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
