import React from 'react'
import ReactDom from 'react-dom'
import './ModalPop.css'

export default function PopEditTodoText(props) {

    const [newTodoText, setNewTodoText] = React.useState('')

    /*function editTodo(id) {
        const updateTodos = [...props.valueTodos].map((todo) => {
            if(todo.id === id) {
                todo.text = newTodoText
            }
            return todo
        })
        props.valueSetTodos(updateTodos)
        //add a setTodoEdit state to false?
    }*/

    function handleOkClick (id) {
        //based on the passed id, spread all todos that exist and to the one matching the id add the new input from current state        
        const updateTodos = [...props.valueTodos].map((todo) => {
            if(todo.id === id) {
                todo.text = newTodoText
            }
            return todo
        })
        //then, setTodos state for this new create array of objects "todos"
        props.valueSetTodos(updateTodos)
        //sets toggle to false closing the window
        props.valueSetToggleEditTodo(false)
    }

    //sets toggle to false closing the window
    function handleCancelClick() {
        props.valueSetToggleEditTodo(false)
    }

    return ReactDom.createPortal(
        <>
            <div className='overlayStyles' />
            <div className='container'>
                <div className='popupEdit'>
                    <div className='editContainer'>
                        <h2 className='poph2'>Edit Todo</h2>
                        <div className='popInputContainer'>
                            <div>
                                <label className='popLabel'>Edit Todo Task</label>
                                <input
                                type="text"
                                placeholder='Edit Task'
                                onChange={(e) => setNewTodoText(e.target.value)}
                                className='popInput'
                                />
                            </div>
                        </div>
                    </div>
                    <div className='popButtonsContainer'>
                        <button className='popbuttons' onClick={() => handleOkClick(props.valueId)}>
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