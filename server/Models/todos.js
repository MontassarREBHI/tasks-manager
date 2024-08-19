import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema({
  title: { type: String, required: [true, "Task title is required"] },
  description: String,
  dueDate: Date,
  completed: { type: Boolean, default: false },
});

export const Task = mongoose.model("task", todoSchema);
