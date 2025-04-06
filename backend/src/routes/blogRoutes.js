//! Number 4: Define api endpoints

import express from "express";
import {
  getAllBlogs,
  getBlogBySlug,
  createBlog,
  getBlogsByCategory,
  getCategories,
  deleteBlog,
} from "../controllers/blogController.js";

const router = express.Router();

//  Define API routes
router.get("/", getAllBlogs);
router.get("/slug/:slug", getBlogBySlug);
router.post("/", createBlog);
router.get("/category/:category", getBlogsByCategory);
router.get("/categories", getCategories);
router.delete("/slug/:slug", deleteBlog);

export default router;

//TODO: middleware
