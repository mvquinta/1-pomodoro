import React, { useState, useEffect } from "react";
import {
  IoPencil,
  IoTrash,
  IoSwapHorizontal,
  IoSquareOutline,
  IoCheckbox,
  IoAdd,
  IoRemove,
} from "react-icons/io5";
import PopAddProject from "./PopAddProject";
import PopSwitchProj from "./PopSwitchProj";
import PopEditTodoText from "./PopEditTodoText";
import { motion } from "framer-motion";
import Hovertip from "./Hovertip";

//Animation Variants

const liTodosVariants = {
  hover: {
    backgroundColor: "rgba(64,64,64,0.5)",
  },
};

const buttonVariants = {
  hover: {
    scale: 1.1,
    color: "rgb(242, 92, 92)",
  },
  tap: {
    scale: 0.9,
  },
};

export default function Todos() {
  //state of todos
  //As my useState inital value, instead of using an empty array [], I call an arrow function that checks if there's some localStorage data.
  //If this is true, load localStorage data, if not, load an empty []
  const [todos, setTodos] = useState(() => {
    const localTodos = localStorage.getItem("pomodoroTodos");
    return localTodos ? JSON.parse(localTodos) : [];
  });

  const [input, setInput] = useState(""); //state of input in the form-input to add new todo. Input will then become text in the todo object created
  //const [updateTodoText, setUpdateTodoText] = useState('')
  const [activeProjectName, setActiveProjectName] = useState("1+Project"); //state used to tell the UI to only render the todos that belong to the active project
  const [mergedProjectNames, setMergedProjectNames] = useState(["1+Project"]); //state of merged projects. Since I put all my todos on the same list. Many of them belong to a repeated project name. This merges and a creates an array with only one element, one proj name

  const [toggleProjectName, setToggleProjectName] = useState(false); //state of toggles to popwindow or close it
  const [toggleSwitchProj, setToggleSwitchProj] = useState(false); //state of toggles to popwindow or close it
  const [toggleEditTodo, setToggleEditTodo] = useState(false); //state of toggles to popwindow or close it

  const [stateId, setStateId] = useState("");
  const [todoText, setTodoText] = useState("");
  //const [moreThanOneProj, setMoreThanOneProj] = useState(true) //state to enable/disable remove and switch project
  const [moreThanOneProj, setMoreThanOneProj] = useState(() => {
    const localNumProjsState = localStorage.getItem("moreThanOneProjState");
    return localNumProjsState ? JSON.parse(localNumProjsState) : false;
  });

  //save todos to local storage. Each time a todo is added, edited or deleted, this useEffects hook is called and updates localStorage
  useEffect(() => {
    localStorage.setItem("pomodoroTodos", JSON.stringify(todos));
  }, [todos]);
  useEffect(() => {
    localStorage.setItem(
      "moreThanOneProjState",
      JSON.stringify(moreThanOneProj)
    );
  }, [moreThanOneProj]);

  //generateId is a "wild" function to create a random id. Mainly used to add an id to every todo created.
  function generateId() {
    return "-" + Math.random().toString(36).substr(2, 9);
  }

  //handleSubmit is executed when Add Task is clicked. It creates a new todo adding it to the state.
  //concat() method merges existing arrays into a new one.
  //setInput('') resets/clears the form
  const handleSubmit = () => {
    if (input !== "") {
      setTodos((todos) =>
        todos.concat({
          project: activeProjectName,
          text: input,
          id: generateId(),
          active: true,
        })
      );
      setInput("");
    } else {
      alert("No New Todo was found. Please review your form.");
    }
  };

  //if press enter submit new todo
  function handleKeyPress(event) {
    if (event.charCode === 13) {
      //could also be code === "Enter"
      handleSubmit();
    }
  }

  //removeTodo, filters all todos by id and creates a new array with all todos that DO NOT match the passed id
  const removeTodo = (id) =>
    setTodos((todos) => todos.filter((t) => t.id !== id));

  //remove project
  function removeProject() {
    if (mergedProjectNames.length <= 1) {
      return false;
    } else {
      //If active project is the first index of the array set it for index 1. If not, set it as index 0 (when removing project, by default, app will display the first project from the array)
      activeProjectName === mergedProjectNames[0]
        ? setActiveProjectName(mergedProjectNames[1])
        : setActiveProjectName(mergedProjectNames[0]);
      //remove all todos that have same project and, next, remove project from array of merged projetc names
      setTodos(todos.filter((todo) => todo.project !== activeProjectName));
      setMergedProjectNames(
        mergedProjectNames.filter(
          (mergedProject) => mergedProject !== activeProjectName
        )
      );
    }
  }

  //based on the passed id, spread all todos that exist and to the one matching the id toggle todo active property
  function activeTodo(id) {
    const updateTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.active ? (todo.active = false) : (todo.active = true);
      }
      return todo;
    });
    //then, setTodos state for this new create array of objects "todos"
    setTodos(updateTodos);
  }

  //useEffect on mergedProjectNames is used iterate trough all todos and check what project names exists.
  //everytime it finds a repeated project he ignores it, when he finds a new one he adds it to the array mergedProjectNames
  //this array mergedProjectNames will than be used by PopSwitchProjs as a list of options
  useEffect(() => {
    todos.map((item) =>
      mergedProjectNames.includes(item.project)
        ? null
        : setMergedProjectNames(mergedProjectNames.concat(item.project))
    );
  }, [todos, mergedProjectNames]);

  //
  useEffect(() => {
    mergedProjectNames.length === 1
      ? setMoreThanOneProj(false)
      : setMoreThanOneProj(true);
  }, [mergedProjectNames]);

  //both these toggles are used to trigger popwindows
  function togglePopProjectName() {
    toggleProjectName
      ? setToggleProjectName(false)
      : setToggleProjectName(true);
  }

  function togglePopSwitchProj() {
    if (mergedProjectNames.length <= 1) {
      setMoreThanOneProj(false);
      return false;
    } else {
      toggleSwitchProj ? setToggleSwitchProj(false) : setToggleSwitchProj(true);
    }
  }

  function togglePopEditTodo() {
    toggleEditTodo ? setToggleEditTodo(false) : setToggleEditTodo(true);
  }

  //Reads the id of the todo that I want to edit.
  function getIdFromTodoToEdit(event) {
    const id = event.target.id;
    setStateId(id);
  }

  function getTextFromTodoToEdit(event) {
    const id = event.target.id;
    let todoTextValue = "";
    todos.map((todo) => {
      if (todo.id === id) {
        todoTextValue = todo.text;
      }
    });
    setTodoText(todoTextValue);
  }

  //Since both these functions are meant to be executed, instead of having them inline, I grouped them both in one function
  function funsForEditTask(event) {
    getIdFromTodoToEdit(event);
    getTextFromTodoToEdit(event);
    togglePopEditTodo();
  }

  return (
    <div className="wrapper-project-todo">
      <div className="div-project-name">
        <div className="project-name-position">
          <h2 className="todo-project-name">{activeProjectName}</h2>
          <div>
            {toggleProjectName ? (
              <PopAddProject
                valueSetPopProjectName={setToggleProjectName}
                valueSetActiveProjectName={setActiveProjectName}
              />
            ) : null}
            {toggleSwitchProj ? (
              <PopSwitchProj
                valueMergedProjs={mergedProjectNames}
                valueSetActiveProjectName={setActiveProjectName}
                valueSetToggleSwitchProj={setToggleSwitchProj}
              />
            ) : null}
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Hovertip text="Add Project">
                <IoAdd onClick={togglePopProjectName} />
              </Hovertip>
            </motion.button>
            {moreThanOneProj ? (
              <motion.button
                disabled={!moreThanOneProj}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Hovertip text="Remove Project">
                  <IoRemove onClick={removeProject} />
                </Hovertip>
              </motion.button>
            ) : null}

            {moreThanOneProj ? (
              <motion.button
                disabled={!moreThanOneProj}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Hovertip text="Switch Project">
                  <IoSwapHorizontal onClick={togglePopSwitchProj} />
                </Hovertip>
              </motion.button>
            ) : null}
          </div>
        </div>
      </div>

      <div className="div-project-todos">
        {toggleEditTodo ? (
          <PopEditTodoText
            valueTodos={todos}
            valueSetTodos={setTodos}
            valueSetToggleEditTodo={setToggleEditTodo}
            valueId={stateId}
            valueTodoText={todoText}
          />
        ) : null}
        <div className="todos-addTask">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e)}
            placeholder="New todo"
          />
          <motion.button
            onClick={handleSubmit}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Add task
          </motion.button>
        </div>
        <ul className="todos-list">
          {todos
            .filter((todo) => todo.project === activeProjectName)
            .map(({ text, id, active }) => (
              <motion.li key={id} variants={liTodosVariants} whileHover="hover">
                <div>
                  <motion.button
                    onClick={() => activeTodo(id)}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    {active ? (
                      <Hovertip text="Check Todo">
                        <IoSquareOutline />
                      </Hovertip>
                    ) : (
                      <Hovertip text="Uncheck Todo">
                        <IoCheckbox />
                      </Hovertip>
                    )}
                  </motion.button>
                  {active ? (
                    <span>{text}</span>
                  ) : (
                    <span
                      style={{
                        textDecorationLine: "line-through",
                        opacity: "0.5",
                      }}
                    >
                      {text}
                    </span>
                  )}
                </div>
                <div>
                  <motion.button
                    onClick={funsForEditTask}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Hovertip text="Edit Todo">
                      <IoPencil id={id} />
                    </Hovertip>
                  </motion.button>
                  <motion.button
                    onClick={() => removeTodo(id)}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Hovertip text="Delete Todo">
                      <IoTrash />
                    </Hovertip>
                  </motion.button>
                </div>
              </motion.li>
            ))}
        </ul>
      </div>
    </div>
  );
}
