import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Heading,
  List,
  ListItem,
  IconButton,
  Text,
  Stack,
  HStack,
  VStack,
  Badge,
  Checkbox,
  Input,
  Button,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { TasksContext } from "../contexts/TodoContext";
import { complex } from "framer-motion";

function TodoList() {
  const { todos, setTodos, deleteTask, updateTask } = useContext(TasksContext);
  const [isEditing, setIsEditing] = useState(null);
  const [editTask, setEditTask] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  const handleDelete = async (id) => {
    await deleteTask(id);
  };

  const handleSaveClick = async () => {
    await updateTask(editTask);
    setIsEditing(null);
  };

  const toggleCompletion = async (task) => {
    await updateTask({ ...task, completed: !task.completed });
  };

  const handleEditClick = (index) => {
    setIsEditing(index);
    setEditTask(todos[index]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditTask({ ...editTask, [name]: value });
  };

  return (
    <Box p={4} borderRadius="lg" boxShadow="lg" bg="gray.50">
      <Heading as="h3" size="lg" mb={4} color="teal.600">
        Todo List
      </Heading>
      {todos.length === 0 ? (
        <Text fontSize="xl" color="gray.500">
          No tasks yet. Start adding some!
        </Text>
      ) : (
        <List spacing={3}>
          {todos.map((todo, index) => (
            <ListItem
              key={todo._id}
              p={3}
              borderRadius="md"
              boxShadow="md"
              bg={todo.completed ? "green.50" : "white"}
              transition="background-color 0.2s ease"
            >
              {isEditing === index ? (
                <VStack spacing={2} align="flex-start">
                  <Input
                    name="title"
                    value={editTask.title}
                    onChange={handleInputChange}
                    placeholder="Task Title"
                  />
                  <Input
                    name="description"
                    value={editTask.description}
                    onChange={handleInputChange}
                    placeholder="Task Description"
                  />
                  <Input
                    type="datetime-local"
                    name="dueDate"
                    value={editTask.dueDate}
                    onChange={handleInputChange}
                  />
                  <Button
                    colorScheme="teal"
                    size="sm"
                    onClick={() => handleSaveClick()}
                  >
                    Save
                  </Button>
                </VStack>
              ) : (
                <HStack justifyContent="space-between">
                  <VStack alignItems="flex-start" spacing={1}>
                    <Checkbox
                      isChecked={todo.completed}
                      onChange={() => toggleCompletion(todo)}
                      colorScheme="teal"
                    >
                      <Text
                        as={todo.completed ? "del" : "span"}
                        fontSize="lg"
                        fontWeight="medium"
                      >
                        {todo.title}
                      </Text>
                    </Checkbox>
                    <Text color="gray.600" fontSize="sm">
                      {todo.description}
                    </Text>
                    {todo.dueDate && (
                      <Badge colorScheme="purple" mt={1}>
                        Due: {new Date(todo.dueDate).toLocaleString()}
                      </Badge>
                    )}
                  </VStack>
                  <Stack direction="row" spacing={2}>
                    <IconButton
                      icon={<EditIcon />}
                      colorScheme="blue"
                      variant="outline"
                      aria-label="Edit Task"
                      size="sm"
                      onClick={() => handleEditClick(index)}
                    />
                    <IconButton
                      icon={<DeleteIcon />}
                      colorScheme="red"
                      variant="outline"
                      aria-label="Delete Task"
                      size="sm"
                      onClick={() => handleDelete(todo._id)}
                    />
                  </Stack>
                </HStack>
              )}
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}

export default TodoList;
