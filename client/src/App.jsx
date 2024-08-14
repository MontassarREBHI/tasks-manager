import { useState, useEffect } from "react";
import "./App.css";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { TodoProvider } from "./contexts/TodoContext";

function App() {
  return (
    <ChakraProvider>
      <CSSReset />
      <TodoProvider>
        <div className="App">
          <header>
            <h1>Tasks Manager</h1>
          </header>
          <main>
            <TodoForm />
            <TodoList />
          </main>
          <footer>
            <p>&copy; 2024 Montassar Rebhi</p>
          </footer>
        </div>
      </TodoProvider>
    </ChakraProvider>
  );
}

export default App;
