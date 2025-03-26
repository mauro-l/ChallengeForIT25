import React from "react";
import { Todo } from "./ToDo.jsx";
import CardSkeleton from "../utils/CardSkeleton.jsx";

function TaskCard({ todos, loading }) {
  const classCompleted = "text-white/50 line-through bg-white/10";

  if (loading) {
    return <CardSkeleton />;
  }

  return (
    <ul>
      {todos.map((todo) => (
        <li
          key={todo.id}
          className={`p-2 m-2 ms-0 border border-transparent rounded-md backdrop-blur-sm ${
            todo.completed ? classCompleted : ""
          }`}
        >
          <Todo task={todo} />
        </li>
      ))}
    </ul>
  );
}

export default TaskCard;
