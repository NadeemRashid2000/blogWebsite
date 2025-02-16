import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/database.js";
import blogRoutes from "./routes/blogRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import fileRoutes from "./routes/fileRoutes.js"; // 🔹 New: File Routes
import { rateLimit } from "./middlewares/auth.js";

dotenv.config(); // Load environment variables

// ✅ Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(rateLimit); // ✅ Apply rate limiting globally AFTER defining app
app.use(express.json());
app.use(cors());

// ✅ Register API Routes
app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/files", fileRoutes); // 🔹 New: File upload/download routes

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
