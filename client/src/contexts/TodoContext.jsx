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
      console.log(tasks);
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);
  return (
    <TasksContext.Provider value={{ todos, setTodos }}>
      {children}
    </TasksContext.Provider>
  );
};
