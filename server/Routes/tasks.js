import { Router } from "express";
import { addTask } from "../Controllers/todoController.js";
export const tasksRouter = Router();

tasksRouter.post("/", addTask);
