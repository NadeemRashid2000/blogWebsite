import express from "express";
import {
  getAllBlogs,
  createBlog,
  getSingleBlog,
  deleteBlog,
} from "../controllers/blogController.js";
import { uploadFile, downloadFile } from "../controllers/fileController.js";
import {
  authMiddleware,
  adminMiddleware,
  checkBlacklist,
} from "../middlewares/auth.js";
import { redisClient } from "../config/redis.js";

const router = express.Router();

// 🔹 Get All Blogs (with Redis caching)
router.get(
  "/",
  async (req, res, next) => {
    try {
      const cachedBlogs = await redisClient.get("blogs");
      if (cachedBlogs) {
        return res.json(JSON.parse(cachedBlogs)); // ✅ Return cached data
      }
      next(); // Proceed if no cache
    } catch (error) {
      console.error("❌ Redis Error:", error);
      next(); // Continue with DB fetch if Redis fails
    }
  },
  getAllBlogs
);

// 🔹 Create Blog (Admin Only ✅)
router.post("/", authMiddleware, checkBlacklist, adminMiddleware, createBlog);

// 🔹 Get Single Blog (Authentication Required ✅)
router.get("/:id", authMiddleware, checkBlacklist, getSingleBlog);
// router.get("/:id", getSingleBlog);

// 🔹 Delete Blog (Admin Only ✅)
router.delete(
  "/:id",
  authMiddleware,
  checkBlacklist,
  adminMiddleware,
  deleteBlog
);

// 🔹 File Upload Routes (GridFS)
router.post("/upload", authMiddleware, checkBlacklist, uploadFile); // ✅ Upload PDF (Auth Required)
router.get("/file/:filename", downloadFile); // ✅ Download PDF

export default router;
