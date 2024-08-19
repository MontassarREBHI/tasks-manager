import { Task } from "../Models/todos.js";

export const addTask = async (req, res) => {
  const { title, description, dueDate } = req.body;
  try {
    const newTask = new Task({
      title,
      description,
      dueDate,
      completed: false,
    });

    await newTask.save();

    res.status(201).json({ data: newTask, message: "Task added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
