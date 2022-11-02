import React, { useEffect, useState } from "react";
import Todolist from "./Todolist";

const Todoinput = () => {
  const [userinput, setUserinput] = useState("");
  const [todoarr, settodoarr] = useState([]);

  // this is to run to fetch the notes from the localstorage when the page is refreshed
  useEffect(() => {
    if (localStorage.getItem("todos") !== null) {
      settodoarr(JSON.parse(localStorage.getItem("todos")));
    }
  }, []);

  // this function updates the userinput state when user enter a new todo
  const handelOnchange = (e) => {
    setUserinput(e.target.value);
  };

  //this function creates a new todo and stores it in localstorage
  const handelOnsubmit = (e) => {
    e.preventDefault();

    let newTodo = {
      id: Math.floor(Math.random() * 1000),
      todo: userinput,
      className: "todo-items",
    };

    settodoarr([...todoarr, newTodo]);
    let current = todoarr;
    current = todoarr.concat(newTodo);
    localStorage.setItem("todos", JSON.stringify(current));
    setUserinput("");
  };

  const deleteTodo = (noteid) => {
    settodoarr((current) =>
      current.filter((obj) => {
        return obj.id !== noteid;
      })
    );
    let current = todoarr;
    current = current.filter((obj) => {
      return obj.id !== noteid;
    });
    localStorage.setItem("todos", JSON.stringify(current));
  };

  const changeClass = (task) => {
    const newState = todoarr.map((obj) => {
      if (obj.todo === task) {
        return {
          ...obj,
          className:
            obj.className === "todo-items"
              ? "todo-items complete"
              : "todo-items",
        };
      }
      return obj;
    });
    settodoarr(newState);
    localStorage.setItem("todos", JSON.stringify(newState));
  };

  return (
    <>
      <form className="todo-form" onSubmit={handelOnsubmit}>
        <input
          type="text"
          value={userinput}
          onChange={handelOnchange}
          className="todo-input"
          placeholder="Add a todo"
          required
          autoFocus
        />
        <button className="add-btn">Add Todo</button>
        </form>
        <div className="todo-list">
          {todoarr.length!==0?todoarr.map((todo) => {
            return (
              <Todolist
                key={todo.id}
                todo={todo}
                deleteTodo={deleteTodo}
                changeClass={changeClass}
                todoarr={todoarr}
              />
            );
          }):<h1>No tasks today</h1>}
          <div class="scrollbar" id="style-1">
      <div class="force-overflow"></div>
    </div>
        </div>
        <div className="footer">
          <p>Click on task when completed</p>
        </div>
        </>
  );
};

export default Todoinput;
