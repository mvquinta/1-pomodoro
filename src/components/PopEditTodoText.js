import React from 'react'
import ReactDom from 'react-dom'
import './styles/ModalEditTodo.css'

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
            <div className='container-EditTodo'>
                <div className='popupEdit-EditTodo'>
                    <h2>Edit Todo</h2>
                        <div>
                            <input
                            type="text"
                            placeholder='Edit Task'
                            onChange={(e) => setNewTodoText(e.target.value)}
                            className='popInput-EditTodo'
                            />
                        </div>
                    <div className='popButtonsContainer-EditTodo'>
                        <button className='popbuttons-EditTodo' onClick={() => handleOkClick(props.valueId)}>
                        OK
                        </button>
                        <button className='popbuttons-EditTodo' onClick={handleCancelClick}>
                        Cancel
                        </button>
                    </div>
                </div>
            </div>
        </>,
        document.getElementById('portal')
    )
}