import express from "express";
const app = express();
import cors from "cors";

app.use(cors());
app.use(express.json());

const port = 3000;

app.get("/", (req, res) => {
  res.send("hello from the backend");
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
