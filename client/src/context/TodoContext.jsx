import { createContext, useEffect, useMemo, useState } from "react";
import baseUrl from "../services/config.js";

const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [tasksFetch, setTasksFetch] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    getAll();
  }, []);

  const getAll = async () => {
    try {
      setLoading(true);
      const res = await fetch(baseUrl);
      const data = await res.json();
      setTasksFetch(data.payload);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredTask = useMemo(() => {
    switch (filter) {
      case "completed":
        return tasksFetch.filter((t) => t.completed);
      case "pending":
        return tasksFetch.filter((t) => !t.completed);

      default:
        return tasksFetch;
    }
  }, [tasksFetch, filter]);

  const getOne = async (id) => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${baseUrl}/${id}`);

      if (!res.ok) {
        const errorText = await res.text();
        console.log(errorText);
        throw new Error(`HTTP error! status: ${res.status} - ${errorText}`);
      }

      const data = await res.json();

      if (data.status === "success") {
        return { success: true, payload: data };
      } else {
        throw new Error(data.message || "Failed to get task");
      }
    } catch (err) {
      setError(err.message || "An error occurred");
      return { success: false, message: err.message || "An error occurred" };
    } finally {
      setLoading(false);
    }
  };

  const toggleComplete = async ({ id, completed }) => {
    try {
      setLoading(true);
      setError(null);

      const data = {
        completed: completed,
      };

      const res = await fetch(`${baseUrl}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.log(errorText);
        throw new Error(`HTTP error! status: ${res.status} - ${errorText}`);
      }

      const result = await res.json();

      if (result.status === "success") {
        getAll();
        return { success: true, message: "Task completed successfully" };
      } else {
        throw new Error(result.message || "Failed to update task");
      }
    } catch (err) {
      setError(err.message || "An error occurred");
      return { success: false, message: err.message || "An error occurred" };
    } finally {
      setLoading(false);
    }
  };

  const removeTask = async (id) => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${baseUrl}/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);

      const result = await res.json();

      if (result.status === "success") {
        getAll();
        return { success: true, message: "Task deleted successfully" };
      } else {
        throw new Error(result.message || "Failed to delete task");
      }
    } catch (err) {
      setError(err.message || "An error occurred");
      return { success: false, message: err.message || "An error occurred" };
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (data) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(baseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`HTTP error! status: ${res.status} - ${errorText}`);
      }
      const result = await res.json();
      if (result.status === "success") {
        getAll();
        return { success: true, message: "Task created successfully" };
      } else {
        throw new Error(result.message || "Failed to create task");
      }
    } catch (err) {
      setError(err);
      return { success: false, message: err.message || "An error occurred" };
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (id, data) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${baseUrl}/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`HTTP error! status: ${res.status} - ${errorText}`);
      }
      const result = await res.json();
      if (result.status === "success") {
        getAll();
        return { success: true, message: "Task update successfully" };
      } else {
        throw new Error(result.message || "Failed to update task");
      }
    } catch (err) {
      setError(err);
      return { success: false, message: err.message || "An error occurred" };
    } finally {
      setLoading(false);
    }
  };

  return (
    <TodoContext.Provider
      value={{
        tasksFetch,
        filteredTask,
        loading,
        error,
        setFilter,
        toggleComplete,
        removeTask,
        addTask,
        getOne,
        updateTask,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export { TodoContext };
