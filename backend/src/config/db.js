//! Number 1: Make db connection
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.name}`);

    console.log("Mongo URI in use:", process.env.MONGO_URI);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;

//TODO: Blog.js
