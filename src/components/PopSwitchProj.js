import React from 'react'
import ReactDom from 'react-dom'
import './styles/ModalPop.css'


export default function PopSwitchProj(props) {

    //switches projects by reading the innertext of the clicked button and making it the active project
    //then sets toggle to false closing the window
    function handleOkClick(event) {
        props.valueSetActiveProjectName(event.target.innerText)
        props.valueSetToggleSwitchProj(false)
    }

    //sets toggle to false closing the window
    function handleCancelClick() {
        props.valueSetToggleSwitchProj(false)
    }
    return ReactDom.createPortal(
        <>
          <div className='overlayStyles' />
          <div className='container-SwitchProj'>
            <div className='popupEdit-SwitchProj'>
              <h2>Select Project</h2>
                  <div className="buttonProj-container">
                    <ul>
                        {props.valueMergedProjs.map((item) => (
                        <li key={item}>
                            <div className="buttonProj-box">
                              <button className='popButtonsContainer-SwitchProj' onClick={handleOkClick}>{item}</button>
                            </div>
                        </li>
                        ))} 
                    </ul>
                  </div>
              <div>
                <button className='popbuttons-SwitchProj' onClick={handleCancelClick}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>,
        document.getElementById('portal')
      )
}