import React from 'react'
import ReactDom from 'react-dom'
import './styles/ModalPop.css'

export default function PopAddProject(props) {

    const [newProjectName, setNewProjectName] = React.useState('')

    //reads onChange what is being written in the input field changing newProjectName state
    //than is used as an argument to make it the new active project and, in consequence, creating a new project.
    //then sets toggle to false closing the window
    function handleOkClick () {
        props.valueSetActiveProjectName(newProjectName)
        props.valueSetPopProjectName(false)
    }

    //sets toggle to false closing the window
    function handleCancelClick() {
        props.valueSetPopProjectName(false)
    }
    
    return ReactDom.createPortal(
        <>
            <div className='overlayStyles' />
            <div className='container-EditAddTodo'>
                <div className='popupEdit-EditAddTodo'>
                    <h2>Add Project</h2>
                     <div>
                        <input
                        type="text"
                        placeholder='New Project Name'
                        onChange={(e) => setNewProjectName(e.target.value)}
                        className='popInput-EditAddTodo'
                        />
                    </div>
                    <div className='popButtonsContainer-EditAddTodo'>
                        <button className='popbuttons-EditAddTodo' onClick={handleOkClick}>
                        OK
                        </button>
                        <button className='popbuttons-EditAddTodo' onClick={handleCancelClick}>
                        Cancel
                        </button>
                    </div>
                </div>
            </div>
        </>,
        document.getElementById('portal')
    )
}