import React from 'react'
import ReactDom from 'react-dom'

const styles = {
    container: {
      position: "fixed",
      zIndex: "100",
      top: '50%',
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
    popupedit: {
      color: "#F2E7DC",
      boxSizing: "border-box",
      width: "350px",
      height: "350px",
      borderRadius: "40px",
      backgroundColor: "#F25C5C",
      textAlign: "center",
      fontSize: "24px"
    },
    editContainer: {
      backgroundColor: "#2D2D2D",
      borderRadius: "40px",
      border: "4px solid #F25C5C",
      height: "80%"
    },
    poph2: {
      padding: "50px 0 30px 0"
    },
    popInputContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",
      gap: "30px"
    },
    popLabel: {
      padding: "20px"
    },
    popinput: {
      border: "none",
      color: "#F2E7DC",
      backgroundColor: "#404040",
      borderRadius: "6px",
      width: "120px",
      fontSize: "1.25rem",
      textAlign: "center"
    },
    popButtonsContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "25px",
      color: "#2D2D2D"
    },
    popbuttons: {
      background: "none",
      border: "none",
      fonSize: "1.125rem",
      cursor: "pointer",
      color: "#2D2D2D",
      margin: "15px"
    }
  };

const overlayStyles = {
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    backgroundColor: "rgba(0,0,0,0.5",
    zIndex: "100"
  };

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
            <div style={overlayStyles} />
            <div style={styles.container}>
                <div style={styles.popupedit}>
                    <div style={styles.editContainer}>
                        <h2 style={styles.poph2}>Edit Todo</h2>
                        <div style={styles.popInputContainer}>
                            <div>
                                <label style={styles.popLabel}>Edit Todo Task</label>
                                <input
                                type="text"
                                placeholder='Edit Task'
                                onChange={(e) => setNewTodoText(e.target.value)}
                                style={styles.popinput}
                                />
                            </div>
                        </div>
                    </div>
                    <div style={styles.popButtonsContainer}>
                        <button style={styles.popbuttons} onClick={() => handleOkClick(props.valueId)}>
                        OK
                        </button>
                        <div>|</div>
                        <button style={styles.popbuttons} onClick={handleCancelClick}>
                        Cancel
                        </button>
                    </div>
                </div>
            </div>
        </>,
        document.getElementById('portal')
    )
}