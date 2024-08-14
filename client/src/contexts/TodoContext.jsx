import { createContext, useState, useEffect } from "react";

export const TasksContext = createContext();
export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  return (
    <TasksContext.Provider value={{ todos, setTodos }}>
      {children}
    </TasksContext.Provider>
  );
};
