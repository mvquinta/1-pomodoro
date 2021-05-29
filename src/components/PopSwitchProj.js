import React from 'react'
import ReactDom from 'react-dom'
import './ModalPop.css'


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
          <div className='container'>
            <div className='popupEdit'>
              <div className='editContainer'>
                <h2 className='poph2'>Select Project</h2>
                <div className='popInputContainer'>
                  <div>
                    {/*<label style={styles.popLabel}>Select Project</label>*/}
                    <ul>
                        {props.valueMergedProjs.map((item) => (
                        <li key={item}>
                            <button className='popButtonsContainer' onClick={handleOkClick}>{item}</button>
                        </li>
                        ))} 
                    </ul>
                  </div>    
                </div>
              </div>
              <div>
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