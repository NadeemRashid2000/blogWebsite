//! Number 4: Setup the server
//TODO: server.js

// server.js

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import blogRoutes from "./src/routes/blogRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Register routes
app.use("/api/blogs", blogRoutes);

// Check MongoDB URI
if (!process.env.MONGO_URI) {
  console.error("MONGO_URI is not defined in environment variables.");
  process.exit(1);
}

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI)
  .then((conn) => console.log(`MongoDB connected: ${conn.connection.name}`))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () =>
  console.log(`Server is running on http://0.0.0.0:${PORT}`)
);

