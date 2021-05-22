import React, { useState, useEffect } from 'react'
import { IoPencil, IoTrash, IoSettings, IoMenu, IoSwapHorizontal,
    IoSquareOutline, IoCheckbox, IoAdd
} from 'react-icons/io5' 
import { IconContext } from 'react-icons'
import Hovertip from './Hovertip'
import PopEditProjectName from './PopEditProjectName'
import PopSwitchProj from './PopSwitchProj'
import PopEditTodoText from './PopEditTodoText'

export default function Todos() {

    const [todos, setTodos] = useState([]) //state of todos
    const [input, setInput] = useState('') //state of input in the form-input to add new todo. Input will then become text in the todo object created
    //const [updateTodoText, setUpdateTodoText] = useState('')
    const [activeProjectName, setActiveProjectName] = useState('1+Pomodoro Project') //state used to tell the UI to only render the todos that belong to the active project
    const [mergedProjectNames, setMergedProjectNames] = useState(['1+Pomodoro Project']) //state of merged projects. Since I put all my todos on the same list. Many of them belong to a repeated project name. This merges and a creates an array with only one element, one proj name
    
    const [toggleProjectName, setToggleProjectName] = useState(false) //state of toggles to popwindow or close it
    const [toggleSwitchProj, setToggleSwitchProj] = useState(false) //state of toggles to popwindow or close it
    const [toggleEditTodo, setToggleEditTodo] = useState(false) //state of toggles to popwindow or close it

    const [stateId, setStateId] = useState('')


    //generateId is a "wild" function to create a random id. Mainly used to add an id to every todo created.
    function generateId() {
        return '-' + Math.random().toString(36).substr(2,9)
    }

    //handleSubmit is executed when Add Task is clicked. It creates a new todo adding it to the state.
    //concat() method merges existing arrays into a new one.
    //setInput('') resets/clears the form
    const handleSubmit = () => {
        setTodos((todos) => todos.concat({
            project: activeProjectName,
            text: input,
            id: generateId(),
            active: true,
        }))
        setInput('')
    }

    //removeTodo, filters all todos by id and creates a new array with all todos that DO NOT match the passed id
    const removeTodo = (id) => setTodos((todos) => todos.filter((t) => t.id !== id))    

    //based on the passed id, spread all todos that exist and to the one matching the id toggle todo active property 
    function activeTodo(id) {
        const updateTodos = [...todos].map((todo) => {
            if(todo.id === id) {
                todo.active ? todo.active = false : todo.active = true
            }
            return todo
        })
        //then, setTodos state for this new create array of objects "todos"
        setTodos(updateTodos)
    }

    //useEffect on mergedProjectNames is used iterate trough all todos and check what project names exists.
    //everytime it finds a repeated project he ignores it, when he finds a new one he adds it to the array mergedProjectNames
    //this array mergedProjectNames will than be used by PopSwitchProjs as a list of options
    useEffect(() => {
        todos.map((item) => 
        mergedProjectNames.includes(item.project) ? null : setMergedProjectNames(mergedProjectNames.concat(item.project)))
    },[todos,mergedProjectNames])

    //both these toggles are used to trigger popwindows
    function togglePopProjectName() {
        toggleProjectName ? setToggleProjectName(false) : setToggleProjectName(true)
    }
    function togglePopSwitchProj() {
        toggleSwitchProj ? setToggleSwitchProj(false) : setToggleSwitchProj(true)
    }

    function togglePopEditTodo() {
        toggleEditTodo ? setToggleEditTodo(false) : setToggleEditTodo(true)
    }

    //Reads the id of the todo that I want to edit.
    //I need to travell all those parentElements until I reach the <li> tag that holds the id I need
    function getIdFromTodoToEdit(event) {
        const id = event.target.parentElement.parentElement.parentElement.id
        console.log(id)
        setStateId(id)
    }

    //Since both these functions are meant to be executed, instead of having them inline, I grouped them both in one function
    function funsForEditTask(event) {
        getIdFromTodoToEdit(event)
        togglePopEditTodo()
    }

    return(
        <div className='wrapper-project-todo'>
            <div className='div-project-name'>
                <div className='project-name-position'>
                    <h2 className='todo-project-name'>{activeProjectName}</h2>
                    <div>
                        {toggleProjectName ? <PopEditProjectName
                        valueSetPopProjectName={setToggleProjectName}
                        valueSetActiveProjectName ={setActiveProjectName} 
                        /> : null}
                        {toggleSwitchProj ? <PopSwitchProj
                        valueMergedProjs={mergedProjectNames}
                        valueSetActiveProjectName={setActiveProjectName}
                        valueSetToggleSwitchProj={setToggleSwitchProj}
                         /> : null}
                        <button><Hovertip text='Add New Project'><IoAdd onClick={togglePopProjectName} /></Hovertip></button>
                        <button><Hovertip text='Switch Project'><IoSwapHorizontal onClick={togglePopSwitchProj} /></Hovertip></button>
                    </div>

                </div>                
            </div>
            <div className='div-project-separator'></div>
            <IconContext.Provider value={{ color: "#F2E7DC", size:"1.3em", className: "global-class-name" }}>
            <div className='div-project-todos'>
                <div className='project-todos-title-position'>
                    <h3>Todo List</h3>
                </div>
                {toggleEditTodo ? <PopEditTodoText
                                valueTodos={todos}
                                valueSetTodos={setTodos}
                                valueSetToggleEditTodo={setToggleEditTodo}
                                valueId={stateId}
                                /> : null}
                <ul className='todos-list'>
                    {todos.filter((todo) => todo.project === activeProjectName).map(({ text, id, active }) => (
                        <li key={id} id={id}>
                            <div>
                                <button onClick={() => activeTodo(id)}> {active ? <IoSquareOutline /> : <IoCheckbox /> }</button>
                                {active ? <span>{text}</span> : <span style={{textDecorationLine: 'line-through', opacity:'0.5'}}>{text}</span>}
                            </div>
                            <div>
                                <button onClick={funsForEditTask}><IoPencil /> </button>
                                <button onClick={() => removeTodo(id)}> <IoTrash /></button>                                
                            </div>
                        </li>
                    ))}
                </ul>
                <div className='todos-addTask'>
                    <input 
                    type='text'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder='New todo'
                    />
                    <button onClick={handleSubmit}>Add task</button>
                </div>

            </div>
            </IconContext.Provider>
      </div>
    )
}