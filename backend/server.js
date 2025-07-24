import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import blogRoutes from "./src/routes/blogRoutes.js";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authroute.js";

// Load environment variables from .env
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON and enable CORS
app.use(express.json());
app.use(cors());

// Mount routes
app.use("/api/blogs", blogRoutes);
app.use("/api/auth", authRoutes); // Register auth route

// Catch-all error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// console.log("Mongo URI in use:", process.env.MONGO_URI);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  // console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
