import express from "express";
const app = express();
import cors from "cors";
import { connectDB } from "./config.js";
import { tasksRouter } from "./Routes/tasks.js";

app.use(cors());
app.use(express.json());
connectDB();

const port = 3000;

app.use("/api/tasks", tasksRouter);

app.get("/test", (req, res) => {
  res.status(200).json({ message: "Test route working!" });
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
