import { createRequire } from "module";
const require = createRequire(import.meta.url);
const grayMatter = require("gray-matter");

import Blog from "../models/Blog.js";

/** Create a new blog */
export const createBlog = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ error: "MDX content is required" });
    }

    const { data: frontmatter, content: mdxContent } = grayMatter(content);
    const { title, slug, description, category } = frontmatter;

    if (!title || !slug || !description) {
      return res.status(400).json({ error: "Missing metadata in MDX content" });
    }

    const formattedSlug = slug
      .toString()
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "-");

    const categoryToSave = category?.trim() || "Others";

    const existingBlog = await Blog.findOne({ slug: formattedSlug });
    if (existingBlog) {
      return res
        .status(400)
        .json({ error: "A blog with this slug already exists!" });
    }

    const newBlog = await Blog.create({
      title,
      slug: formattedSlug,
      description,
      category: categoryToSave,
      content: mdxContent,
      user: req.user._id, //  Associate blog with user
    });

    res
      .status(201)
      .json({ message: "Blog created successfully", blog: newBlog });
  } catch (error) {
    console.error("Error creating blog:", error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};

/** Get all blogs */
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    const formatted = blogs.map((blog) => ({
      _id: blog._id,
      title: blog.title,
      slug: blog.slug,
      description: blog.description,
      category: blog.category,
      createdAt: blog.createdAt,
    }));
    res.json(formatted);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/** Get blog by slug */
export const getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const blog = await Blog.findOne({ slug });
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json({
      _id: blog._id,
      slug: blog.slug,
      title: blog.title,
      description: blog.description,
      content: blog.content,
      category: blog.category,
    });
  } catch (error) {
    console.error("Error fetching blog by slug:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

/** Get blogs by category */
export const getBlogsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const filter =
      category === "Others"
        ? { $or: [{ category: { $exists: false } }, { category: "Others" }] }
        : { category };
    const blogs = await Blog.find(filter).sort({ createdAt: -1 });
    const formatted = blogs.map((blog) => ({
      _id: blog._id,
      title: blog.title,
      slug: blog.slug,
      description: blog.description,
      category: blog.category,
      createdAt: blog.createdAt,
    }));
    if (!formatted.length) {
      return res
        .status(404)
        .json({ message: "No blogs found in this category" });
    }
    res.json(formatted);
  } catch (error) {
    console.error("Error fetching blogs by category:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    let categories = await Blog.distinct("category");

    // Check if there are any blogs without category or with "Others"
    const othersExist = await Blog.exists({
      $or: [{ category: { $exists: false } }, { category: "Others" }],
    });

    if (othersExist && !categories.includes("Others")) {
      categories.push("Others");
    }

    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/** Delete blog */
export const deleteBlog = async (req, res) => {
  try {
    const { slug } = req.params; // Change to slug
    const blog = await Blog.findOne({ slug }); // Find by slug

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Only allow admin deletion
    if (
      blog.user?.toString() !== req.user._id.toString() && // Use req.user._id
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this blog" });
    }

    await blog.deleteOne();
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
