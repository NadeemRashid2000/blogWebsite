import express from "express";
import {
  getAllBlogs,
  getBlogBySlug,
  createBlog,
  getBlogsByCategory,
  getCategories,
  deleteBlog,
} from "../controllers/blogController.js";
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getAllBlogs);
router.get("/slug/:slug", getBlogBySlug);
router.get("/category/:category", getBlogsByCategory);
router.get("/categories", getCategories);

// Protected routes (admin only)
router.post("/", verifyToken, isAdmin, createBlog); 
router.delete("/slug/:slug", verifyToken, isAdmin, deleteBlog); 

export default router;
