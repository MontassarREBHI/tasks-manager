import { connect } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    await connect(process.env.MONGODB_URI);
    console.log("Database connected successfully!");
  } catch (err) {
    console.error("Connection to dabase failed", err);
  }
};
