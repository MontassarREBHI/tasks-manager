import { Router } from "express";
import {
  addTask,
  getAllTasks,
  deleteTaskByID,
  updateTaskById,
} from "../Controllers/todoController.js";
export const tasksRouter = Router();

tasksRouter.post("/", addTask);
tasksRouter.get("/", getAllTasks);
tasksRouter.delete("/", deleteTaskByID);
tasksRouter.patch("/", updateTaskById);
