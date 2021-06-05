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

export default function PopEditTodoText(props) {

    const [newTodoText, setNewTodoText] = React.useState('')

    function handleOkClick (id) {
        //based on the passed id, spread all todos that exist. To the one matching the id, add a new input to current state        
        const updateTodos = [...props.valueTodos].map((todo) => {
            if(todo.id === id) {
                todo.text = newTodoText
            }
            return todo
        })
        //then, setTodos state for this new create array of objects "todos"
        props.valueSetTodos(updateTodos)
        //Toggle to false to close window
        props.valueSetToggleEditTodo(false)
    }

    //Toggle to false to close window
    function handleCancelClick() {
        props.valueSetToggleEditTodo(false)
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
                    <h2>Edit Todo</h2>
                        <div>
                            <input
                            type="text"
                            placeholder='Edit Task'
                            onChange={(e) => setNewTodoText(e.target.value)}
                            className='popInput-EditAddTodo'
                            />
                        </div>
                    <div className='popButtonsContainer-EditAddTodo'>
                        <motion.button 
                        className='popbuttons-EditAddTodo' 
                        onClick={() => handleOkClick(props.valueId)}                        
                        variants={buttonVariants}
                        whileHover='hover'
                        whileTap='tap'>
                        OK
                        </motion.button>
                        <motion.button 
                        className='popbuttons-EditAddTodo' 
                        onClick={handleCancelClick}
                        variants={buttonVariants}
                        whileHover='hover'
                        whileTap='tap'>
                        Cancel
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </>,
        document.getElementById('portal')
    )
}