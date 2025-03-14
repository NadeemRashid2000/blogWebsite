//! Number 4: Define api endpoints

import express from "express";
import { 
  getAllBlogs, 
  getBlogBySlug, 
  createBlog, 
  getBlogsByCategory, 
  getCategories // ✅ Ensure this function is properly imported
} from "../controllers/blogController.js";
import Blog from "../models/Blog.js"; // ✅ Import Blog model

const router = express.Router();

// ✅ Define API routes
router.get("/", getAllBlogs);
router.get("/slug/:slug", getBlogBySlug);
router.post("/", createBlog);
router.get("/category/:category", getBlogsByCategory);
router.get("/categories", getCategories);  // ✅ Fetch unique categories

export default router;


//TODO: middleware 



