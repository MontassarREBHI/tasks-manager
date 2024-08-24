import { createContext, useState, useEffect } from "react";
const URL = "http://localhost:3000/api/tasks";

export const TasksContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(URL);
      if (!response.ok) {
        throw new Error("failed to fecth tasks");
      }
      const tasks = await response.json();
      setTodos(tasks.data);
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateTask = async (updatedTask) => {
    try {
      const response = await fetch(URL, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });
      if (!response.ok) {
        throw new Error("failed to update task");
      }
      await fetchTasks();
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await fetch(URL, {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ _id: id }),
      });
      if (!response.ok) {
        throw new Error(`Failed to delete task`);
      }
      await fetchTasks();
    } catch (error) {
      console.error(error.message);
    }
  };

  const addTask = async (newTask) => {
    try {
      const response = await fetch(URL, {
        method: "POST",
        body: JSON.stringify(newTask),
        headers: { "content-type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("failed to add a new task");
      }
      await fetchTasks();
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);
  return (
    <TasksContext.Provider
      value={{ todos, updateTask, deleteTask, isLoading, setTodos, addTask }}
    >
      {children}
    </TasksContext.Provider>
  );
};
