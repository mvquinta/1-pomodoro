import React from 'react'

const styles = {
    container: {
        position: 'relative',
    },
    popupedit: {
        color: '#2d2d2d',
        boxSizing: 'border-box',
        position: 'absolute',
        width: '220px',
        height:'220px',
        left: '15%',
        transform: 'translateY(-34px)',
        borderRadius: '20px',
        border: '4px solid #F2636F',
        backgroundColor: '#F2E7DC',
        textAlign: 'center',
        fontSize: '24px',
        paddingTop:'10%',
    },
    popbuttons: {
        background: 'none',
        border: 'none',
        fonSize: '1.125rem',
        cursor: 'pointer',
        color: '#2d2d2d',
        marginTop:'20px',

        "&:hover": {
            color: '#F2E7DC',
            border: '2px solid red',
        },
    },
    popinput: {
        border: 'none',
        backgroundColor: '#FFF5EC',
        width: '80px',
        marginTop:'20px',
        marginLeft:'10px',
        fontSize: '1.125rem',
        textAlign: 'center',
    },
}

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
        //based on the passed id, spread all todos that exist abd to the one matching the id add the new input from current state        
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

    return(
        <div style={styles.container}>
            <div style={styles.popupedit}>
                <label>Edit Todo Task</label>
                <input 
                type='text'
                placeholder='edit task'
                onChange={(e) => setNewTodoText(e.target.value)}
                style={styles.popinput}
                />
                <button style={styles.popbuttons} onClick={() => handleOkClick(props.valueId)}>OK</button>
                <button style={styles.popbuttons} onClick={handleCancelClick}>Cancel</button>
            </div>
        </div>
    )
}