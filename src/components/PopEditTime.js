import React from "react";
import ReactDom from 'react-dom'
import './ModalPop.css'

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
      <div className='container'>
        <div className='popupEdit'>
          <div className='editContainer'>
            <h2 className='poph2'>Edit Time</h2>
            <div className='popInputContainer'>
              <div>
                <label className='popLabel'>Minutes</label>
                <input
                  type="number"
                  onChange={(e) => setEditTime(e.target.value)}
                  placeholder="25"
                  className='popInput'
                />
              </div>
              <div>
                <label className='popLabel'>Seconds</label>
                <input
                  type="number"
                  min="0"
                  onChange={(e) => setSecondsEdiTime(e.target.value)}
                  placeholder="0"
                  className='popInput'
                />
              </div>
            </div>
          </div>
          <div className='popButtonsContainer'>
            <button className='popbuttons' onClick={handleOkClick}>
              OK
            </button>
            <div>|</div>
            <button className='popbuttons' onClick={handleCancelClick}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  )
}
