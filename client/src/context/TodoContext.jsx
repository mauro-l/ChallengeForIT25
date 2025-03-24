import { createContext, useContext, useEffect, useState } from "react";
import baseUrl from "../services/config.js";

const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [tasksFetch, setTasksFetch] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setLoading(true);
        const res = await fetch(baseUrl);
        const data = await res.json();
        console.log(data.payload);
        setTasksFetch(data.payload);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, []);

  const toggleComplete = ({ id, completed }) => {
    setTasksFetch((prevTask) =>
      prevTask.map((task) => (task.id === id ? { ...task, completed } : task))
    );
  };

  const removeTask = ({ id }) => {
    setTasksFetch((prevTask) => prevTask.filter((task) => task.id !== id));
  };

  const addTask = ({ title }) => {
    setTasksFetch(title);
  };

  return (
    <TodoContext.Provider
      value={{
        tasksFetch,
        loading,
        error,
        toggleComplete,
        removeTask,
        addTask,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useTodo() {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error("useTodo debe ser usado dentro de un TodoProvider");
  }
  return context;
}
