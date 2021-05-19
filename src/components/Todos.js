import React, { useState } from 'react'
import { IoPencil, IoTrash, IoSettings, IoMenu, IoSwapHorizontal,
    IoSquareOutline, IoCheckbox, IoAdd
} from 'react-icons/io5' 
import { IconContext } from 'react-icons'
import Hovertip from './Hovertip'
import PopEditProjectName from './PopEditProjectName'

export default function Todos() {

    const [todos, setTodos] = useState([])
    const [input, setInput] = useState('')
    const [projectName, setProjectName] = useState('1+Pomodoro Project')
    const [activeProjectName, setActiveProjectName] = useState('1+Pomodoro Project')
    const [toggleProjectName, setToggleProjectName] = useState(false)

    function generateId() {
        return '-' + Math.random().toString(36).substr(2,9)
    }

    const handleSubmit = () => {
        setTodos((todos) => todos.concat({
            project: projectName,
            text: input,
            id: generateId()
        }))
        setInput('')
    }

    const removeTodo = (id) => setTodos((todos) => todos.filter((t) => t.id !== id))

    function togglePopProjectName() {
        toggleProjectName ? setToggleProjectName(false) : setToggleProjectName(true)
    }

    function addProjectTodo () {
        console.log('All todos', todos)
        const allProjNames = todos.map((todo) => todo.project)
        console.log(allProjNames)
        //const b = allProjNames.some(proj === )
        //const getProjName = document.getElementsByClassName('todo-project-name')
        //const filteredTodos = todos.filter((todo) => todo.project === getProjName[0].innerText)
        /*const filteredTodos = todos.filter((todo) => todo.project === activeProjectName)
        console.log('Filtered todos', filteredTodos)
        const a = filteredTodos.map((todo) => todo.text)
        console.log('Mapped todos', a)
        console.log('active proj', activeProjectName)
        const together = todos.filter((todo) => todo.project === activeProjectName).map((t) => t.text)
        console.log('all together', together)*/
    }

    return(
        <div className='wrapper-project-todo'>
            <div className='div-project-name'>
                <div className='project-name-position'>
                    <h2 className='todo-project-name'>{projectName}</h2>
                    <div>
                        {toggleProjectName ? <PopEditProjectName
                        valueSetProjectName={setProjectName}
                        valueSetPopProjectName={setToggleProjectName}
                        valueSetActiveProjectName ={setActiveProjectName} 
                        /> : null}
                        <button><Hovertip text='Add New Project'><IoAdd onClick={togglePopProjectName} /></Hovertip></button>
                        <button><Hovertip text='Switch Project'><IoSwapHorizontal onClick={addProjectTodo} /></Hovertip></button>
                    </div>

                </div>                
            </div>
            <div className='div-project-separator'></div>
            <IconContext.Provider value={{ color: "#F2E7DC", size:"1.3em", className: "global-class-name" }}>
            <div className='div-project-todos'>
                <div className='project-todos-title-position'>
                    <h3>Todo List</h3>
                    <div>
                        <button><IoSettings /></button>                    
                        <button><IoMenu /></button>
                    </div>
                </div>
                <ul className='todos-list'>
                    {todos.filter((todo) => todo.project === activeProjectName).map(({ text, id }) => (
                        <li key={id}>
                            <div>
                                <button> <IoSquareOutline /></button>
                                {/*<button><IoCheckbox /></button>*/}
                                <span>{text}</span>
                            </div>
                            <div>
                                <button> <IoPencil /> </button>
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