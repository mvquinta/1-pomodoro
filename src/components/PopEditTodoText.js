import React, { useState } from "react";
import ReactDom from "react-dom";
import "./styles/ModalPop.css";
import { motion } from "framer-motion";

//Animation Variants

const editAddContainer = {
  initial: {
    scale: 0,
    opacity: 0,
    x: "-50%",
    y: "-50%",
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 0.4,
    },
  },
};

const buttonVariants = {
  hover: {
    scale: 1.1,
  },
  tap: {
    scale: 0.9,
  },
};

export default function PopEditTodoText({
  valueTodos,
  valueSetTodos,
  valueSetToggleEditTodo,
  valueId,
  valueTodoText,
}) {
  const [newTodoText, setNewTodoText] = useState(valueTodoText);

  function handleOkClick(id) {
    console.log(id);
    //based on the passed id, spread all todos that exist. To the one matching the id, add a new input to current state
    const updateTodos = [...valueTodos].map((todo) => {
      if (todo.id === id) {
        todo.text = newTodoText;
      }
      return todo;
    });
    //then, setTodos state for this new create array of objects "todos"
    valueSetTodos(updateTodos);
    //Toggle to false to close window
    valueSetToggleEditTodo(false);
  }

  //if press enter submit todo edition
  function handleKeyPress(event) {
    if (event.charCode === 13) {
      //could also be code === "Enter"
      handleOkClick(valueId);
    }
  }

  //Toggle to false to close window
  function handleCancelClick() {
    valueSetToggleEditTodo(false);
  }

  return ReactDom.createPortal(
    <>
      <div className="overlayStyles" />
      <motion.div
        className="container-EditAddTodo"
        variants={editAddContainer}
        initial="initial"
        animate="animate"
      >
        <div className="popupEdit-EditAddTodo">
          <h2>Edit Todo</h2>
          <div>
            <input
              autoFocus={true}
              type="text"
              value={newTodoText}
              onChange={(e) => setNewTodoText(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e)}
              className="popInput-EditAddTodo"
            />
          </div>
          <div className="popButtonsContainer-EditAddTodo">
            <motion.button
              className="popbuttons-EditAddTodo"
              onClick={handleCancelClick}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Cancel
            </motion.button>
            <motion.button
              className="popbuttons-EditAddTodo"
              onClick={() => handleOkClick(valueId)}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              OK
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>,
    document.getElementById("portal")
  );
}
