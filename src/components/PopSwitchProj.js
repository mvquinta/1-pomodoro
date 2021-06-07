import React from 'react'
import ReactDom from 'react-dom'
import './styles/ModalPop.css'
import { motion } from 'framer-motion'

//Animation Variants

const switchProjContainer = {
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

const projBoxVariants = {
  hover: {
    backgroundColor: 'rgba(217, 217, 217, 0.5)',
  }
}


export default function PopSwitchProj({ valueSetActiveProjectName, valueSetToggleSwitchProj, valueMergedProjs }) { 

    //switches projects by reading the innertext of the clicked button and making it the active project
    //Sets toggle to false closing the window
    function handleOkClick(event) {
        valueSetActiveProjectName(event.target.innerText)
        valueSetToggleSwitchProj(false)
    }

    //sets toggle to false closing the window
    function handleCancelClick() {
        valueSetToggleSwitchProj(false)
    }
    return ReactDom.createPortal(
        <>
          <div className='overlayStyles' />
          <motion.div 
          className='container-SwitchProj'
          variants={switchProjContainer}
          initial='initial'
          animate='animate'
          >
            <div className='popupEdit-SwitchProj'>
              <h2>Select Project</h2>
                  <div className="buttonProj-container">
                    <ul>
                        {valueMergedProjs.map((item) => (
                        <li key={item}>
                            <motion.div 
                            className="buttonProj-box"
                            variants={projBoxVariants}
                            whileHover='hover'
                            whileTap='tap'
                            onClick={handleOkClick}
                            >
                              <button>{item}</button>
                            </motion.div>
                        </li>
                        ))} 
                    </ul>
                  </div>
              <div>
                <motion.button 
                className='popbuttons-SwitchProj' 
                onClick={handleCancelClick}
                variants={buttonVariants}
                whileHover='hover'>
                  Cancel
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>,
        document.getElementById('portal')
      )
}