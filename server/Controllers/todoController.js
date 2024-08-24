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

export const getAllTasks = async (req, res) => {
  try {
    const allTasks = await Task.find();
    res
      .status(200)
      .json({ data: allTasks, message: "List of all tasks retrieved" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTaskByID = async (req, res) => {
  const { _id } = req.body;
  try {
    const deletedTask = await Task.findByIdAndDelete(_id);
    res
      .status(200)
      .json({ data: deletedTask, message: "task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTaskById = async (req, res) => {
  const { _id, title, description, dueDate, completed } = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      _id,
      { title, description, dueDate, completed },
      { new: true }
    );
    res
      .status(200)
      .json({ data: updatedTask, message: "task updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
