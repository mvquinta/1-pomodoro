import React from 'react'
import ReactDom from 'react-dom'
import './styles/ModalPop.css'

export default function PopEditTodoText(props) {

    const [newTodoText, setNewTodoText] = React.useState('')

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
            <div className='container-EditAddTodo'>
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
                        <button className='popbuttons-EditAddTodo' onClick={() => handleOkClick(props.valueId)}>
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