import React, { useContext, useState } from "react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  Textarea,
  Box,
  Stack,
  HStack,
} from "@chakra-ui/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TasksContext } from "../contexts/TodoContext";
function TodoForm() {
  const { setTodos, todos } = useContext(TasksContext);
  const [toggle, setToggle] = useState(false);
  const [task, setTask] = useState({ title: "", description: "", dueDate: "" });
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [initialTask, setInitialTask] = useState({
    title: "",
    description: "",
    dueDate: "",
  });
  const closeForm = () => {
    setTask({ title: "", description: "", dueDate: "" });
    setToggle(false);
    setIsFormDirty(false);
  };

  const handleCloseForm = () => {
    isFormDirty
      ? window.confirm("Unsaved changes ! Click `OK` to discard")
        ? closeForm()
        : null
      : closeForm();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setTask((prev) => ({ ...prev, [name]: value }));
    const trimmedValue = value.trim();
    const isDirty =
      trimmedValue !== initialTask[name] ||
      (initialTask[name] !== "" && trimmedValue === "");

    setIsFormDirty(isDirty);
  };
  const notify = () => toast.error("You need to fill the title at least!");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.title.trim()) {
      notify();
    } else {
      const updatedTodos = [...todos, task];
      setTodos(updatedTodos);
      setTask(initialTask);
      closeForm();
    }
  };

  return (
    <Box p={4}>
      {!toggle ? (
        <Button
          leftIcon={<AddIcon />}
          colorScheme="teal"
          onClick={() => setToggle(true)}
        >
          Add Item
        </Button>
      ) : (
        <Box as="form" onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Title</FormLabel>
              <Input
                name="title"
                value={task.title}
                onChange={handleInputChange}
                placeholder="Task title"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                name="description"
                value={task.description}
                onChange={handleInputChange}
                placeholder="Enter description"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Due Date</FormLabel>
              <Input
                name="dueDate"
                type="datetime-local"
                value={task.dueDate}
                onChange={handleInputChange}
              />
            </FormControl>
            <HStack justifyContent="space-between">
              <Button colorScheme="teal" type="submit">
                Add
              </Button>
              <Button colorScheme="red" onClick={handleCloseForm}>
                Cancel
              </Button>
              <button onClick={notify}>Notify !</button>
            </HStack>
          </Stack>
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition:Bounce
          />
        </Box>
      )}
    </Box>
  );
}

export default TodoForm;
