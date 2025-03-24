import React from "react";
import { Todo } from "./ToDo.jsx";

function TaskCard({ todos, onRemoveTodo, onToggleComplete }) {
  const classCompleted = "text-white/50 line-through bg-white/10";
  return (
    <ul>
      {todos.map((todo) => (
        <li
          key={todo.id}
          className={`p-2 m-2 ms-0 border border-transparent rounded-md backdrop-blur-sm ${
            todo.completed ? classCompleted : ""
          }`}
        >
          <Todo
            key={todo.id}
            id={todo.id}
            title={todo.title}
            description={todo.description}
            completed={todo.completed}
            onToggleComplete={onToggleComplete}
            onRemoveTodo={onRemoveTodo}
          />
        </li>
      ))}
    </ul>
  );
}

export default TaskCard;
