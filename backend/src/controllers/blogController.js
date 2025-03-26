import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";
import Blog from "../models/Blog.js";

// ✅ Get __dirname in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Define correct MDX folder path
const mdxFolderPath = path.resolve(__dirname, "../../mdx-content");


console.log("✅ MDX Folder Path:", mdxFolderPath);

/** ✅ Create a new blog */

export const createBlog = async (req, res) => {
  try {
    const { title, slug, description, content, category } = req.body;

    if (!title || !slug || !description || !content) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const formattedSlug = slug
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

    // ✅ Format MDX content
    const mdxContent = `---
title: "${title}"
description: "${description}"
category: "${categoryToSave}"
slug: "${formattedSlug}"
---

${content}`;

    // ✅ Ensure mdx-content folder exists
    await fs.mkdir(mdxFolderPath, { recursive: true });

    // ✅ Save MDX file in mdx-content
    const mdxFilePath = path.join(mdxFolderPath, `${formattedSlug}.mdx`);
    await fs.writeFile(mdxFilePath, mdxContent, "utf-8");
    console.log(`✅ MDX file created at: ${mdxFilePath}`);

    // ✅ Save to MongoDB
    const newBlog = await Blog.create({
      title,
      slug: formattedSlug,
      description,
      category: categoryToSave,
      content: mdxContent,
    });

    res
      .status(201)
      .json({ message: "Blog created successfully", blog: newBlog });
  } catch (error) {
    console.error("❌ Error creating blog:", error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};


/** ✅ Fetch all blogs */
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    console.error("❌ Error fetching blogs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    console.log(`📖 Fetching blog with slug: ${slug}`);

    const mdxFilePath = path.join(mdxFolderPath, `${slug}.mdx`);
    console.log("📂 Looking for MDX file at:", mdxFilePath);

    let mdxContent = "";
    let metadata = {};

    try {
      // ✅ Read the MDX file and extract metadata
      const fileContent = await fs.readFile(mdxFilePath, "utf-8");
      const { content, data } = matter(fileContent);

      mdxContent = fileContent; // ✅ Send full MDX content including frontmatter
      metadata = data;

      console.log(`✅ MDX file found for ${slug}`);
    } catch (fileError) {
      console.warn(`⚠ MDX file not found, using content from DB.`);
      const blog = await Blog.findOne({ slug });
      if (!blog) return res.status(404).json({ message: "Blog not found" });

      mdxContent = blog.content; // ✅ Use DB content as fallback
      const { data } = matter(blog.content || "");
      metadata = data;
    }

    res.json({
      title: metadata.title || "Untitled",
      description: metadata.description || "No description available",
      category: metadata.category || "Others",
      published: metadata.published || new Date(),
      author: metadata.author || "Unknown",
      content: mdxContent, // ✅ Send full MDX content
    });
  } catch (error) {
    console.error("❌ Error fetching blog:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};



/** ✅ Fetch blogs by category */
export const getBlogsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    console.log(`📂 Fetching blogs in category: ${category}`);

    let filter =
      category === "Others"
        ? { $or: [{ category: { $exists: false } }, { category: "Others" }] }
        : { category };

    const blogs = await Blog.find(filter);

    if (!blogs.length) {
      return res
        .status(404)
        .json({ message: "No blogs found in this category" });
    }

    // ✅ Read the actual MDX files instead of MongoDB content
    const formattedBlogs = await Promise.all(
      blogs.map(async (blog) => {
        const mdxFilePath = path.join(mdxFolderPath, `${blog.slug}.mdx`);
        console.log(`📄 Looking for MDX file at: ${mdxFilePath}`);

        try {
          const fileContent = await fs.readFile(mdxFilePath, "utf-8"); // ✅ Read the MDX file
          console.log(`📜 Raw MDX Content for ${blog.slug}:`, fileContent);

          const { data: metadata } = matter(fileContent); // ✅ Extract frontmatter
          console.log(`🔍 Extracted Metadata for ${blog.slug}:`, metadata);

          return {
            _id: blog._id,
            title: metadata.title || blog.title, // ✅ Use title from MDX
            slug: blog.slug,
            category: metadata.category || blog.category, // ✅ Use category from MDX
            description: metadata.description || "No description available", // ✅ Fix description
          };
        } catch (fileError) {
          console.warn(
            `⚠ MDX file not found for ${blog.slug}, using DB content.`
          );
          return {
            _id: blog._id,
            title: blog.title,
            slug: blog.slug,
            category: blog.category,
            description: "No description available",
          };
        }
      })
    );

    res.json(formattedBlogs);
  } catch (error) {
    console.error("❌ Error fetching blogs by category:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


/** ✅ Fetch all unique categories */
export const getCategories = async (req, res) => {
  try {
    let categories = await Blog.distinct("category");

    if (!categories.includes("Others")) {
      categories.push("Others");
    }
    res.json(categories);
  } catch (error) {
    console.error("❌ Error fetching categories:", error);
    res.status(500).json({ message: "Server error" });
  }
};




// Delete Blog
/** ✅ Delete a blog */
export const deleteBlog = async (req, res) => {
  try {
    const { slug } = req.params;
    console.log(`🗑 Deleting blog with slug: ${slug}`);

    const blog = await Blog.findOneAndDelete({ slug });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // ✅ Delete the corresponding MDX file
    const mdxFilePath = path.join(mdxFolderPath, `${slug}.mdx`);
    try {
      await fs.unlink(mdxFilePath);
      console.log(`✅ MDX file deleted: ${mdxFilePath}`);
    } catch (err) {
      console.warn(`⚠ MDX file not found for ${slug}, skipping deletion.`);
    }

    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting blog:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
