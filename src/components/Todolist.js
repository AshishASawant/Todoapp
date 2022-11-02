import React from "react";
import { MdCancel } from "react-icons/md";

const Todolist = (props) => {
  const { todo, deleteTodo, changeClass } = props;

  return (
    <div
      className={todo.className}
      onClick={() => {
        changeClass(todo.todo);
      }}
    >
      <p>{todo.todo}</p>
      <div className="logos">
        <MdCancel
          className="logo-delete"
          onClick={(e) => {
            deleteTodo(todo.id);
            if (!e)  e = window.event;
            e.cancelBubble = true;
            if (e.stopPropagation) e.stopPropagation();
          }}
        />
      </div>
    </div>
  );
};

export default Todolist;
