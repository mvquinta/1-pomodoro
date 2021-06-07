import React from 'react'
import ReactDom from 'react-dom'
import './styles/ModalPop.css'
import { motion } from 'framer-motion'

//Animation Variants

const editAddContainer = {
    initial: {
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
        scale: 1.1,
    },
    tap: {
        scale: 0.9,
    }
}

export default function PopAddProject(props) {

    const [newProjectName, setNewProjectName] = React.useState('')

    //newModalState is updated because of onChange in input tag
    //Used as an argument to make it the new active project and, in consequence, creating a new project.
    //toggle to false to close window
    function handleOkClick () {
        props.valueSetActiveProjectName(newProjectName)
        props.valueSetPopProjectName(false)
    }

    //if press enter add project
    function handleKeyPress(event) {
        if (event.charCode === 13) { //could also be code === "Enter"
            handleOkClick()
        }
    }

    //sets toggle to false closing the window
    function handleCancelClick() {
        props.valueSetPopProjectName(false)
    }
    
    return ReactDom.createPortal(
        <>
            <div className='overlayStyles' />
            <motion.div 
            className='container-EditAddTodo'
            variants={editAddContainer}
            initial='initial'
            animate='animate'
            >
                <div className='popupEdit-EditAddTodo'>
                    <h2>Add Project</h2>
                     <div>
                        <input
                        autoFocus={true}
                        type="text"
                        placeholder='New Project Name'
                        onChange={(e) => setNewProjectName(e.target.value)}
                        onKeyPress={(e) => handleKeyPress(e)}
                        className='popInput-EditAddTodo'
                        />
                    </div>
                    <div className='popButtonsContainer-EditAddTodo'>
                        <motion.button
                        className='popbuttons-EditAddTodo'
                        onClick={handleCancelClick}
                        variants={buttonVariants}
                        whileHover='hover'
                        whileTap='tap'>
                        Cancel
                        </motion.button>
                        <motion.button 
                        className='popbuttons-EditAddTodo' 
                        onClick={handleOkClick}
                        variants={buttonVariants}
                        whileHover='hover'
                        whileTap='tap'>
                        OK
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </>,
        document.getElementById('portal')
    )
}