


// import fs from "fs/promises";
// import path from "path";
// import { fileURLToPath } from "url";
// import matter from "gray-matter";
// import Blog from "../models/Blog.js";

// // ✅ Get __dirname in ES6 modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // ✅ Define correct MDX folder path
// const mdxFolderPath = path.join(__dirname, "../../mdx-content");

// console.log("✅ MDX Folder Path:", mdxFolderPath);

// /** ✅ Create a new blog */
// export const createBlog = async (req, res) => {
//   try {
//     const { title, slug, description, content, category } = req.body;

//     if (!title || !slug || !description || !content) {
//       return res
//         .status(400)
//         .json({ error: "All fields (including category) are required" });
//     }

//     const formattedSlug = slug
//       .trim()
//       .toLowerCase()
//       .replace(/[^a-z0-9-]/g, "-");
//     const categoryToSave =
//       category && category.trim() !== "" ? category : "Others";

//     const existingBlog = await Blog.findOne({ slug: formattedSlug });
//     if (existingBlog) {
//       return res
//         .status(400)
//         .json({ error: "A blog with this slug already exists!" });
//     }

//     // ✅ Format MDX content with metadata
//     const mdxContent = `---
// title: "${title}"
// description: "${description}"
// category: "${categoryToSave}"
// slug: "${formattedSlug}"
// ---

// ${content}`;

//     const newBlog = await Blog.create({
//       title,
//       slug: formattedSlug,
//       description,
//       category: categoryToSave,
//       content: mdxContent,
//     });

//     console.log(`✅ Blog created successfully: ${title} (${formattedSlug})`);

//     res.status(201).json({
//       message: "Blog created successfully",
//       blog: newBlog,
//     });
//   } catch (error) {
//     console.error("❌ Error creating blog:", error);
//     res.status(500).json({
//       error: "Internal server error",
//       details: error.message,
//     });
//   }
// };

// /** ✅ Fetch all blogs */
// export const getAllBlogs = async (req, res) => {
//   try {
//     const blogs = await Blog.find().sort({ createdAt: -1 });
//     res.json(blogs);
//   } catch (error) {
//     console.error("❌ Error fetching blogs:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// /** ✅ Fetch a blog by slug */
// export const getBlogBySlug = async (req, res) => {
//   try {
//     const { slug } = req.params;
//     console.log(`📖 Fetching blog with slug: ${slug}`);

//     const blog = await Blog.findOne({ slug });
//     if (!blog) {
//       return res.status(404).json({ message: "Blog not found" });
//     }

//     const filePath = path.join(mdxFolderPath, `${slug}.mdx`);
//     let mdxContent = "";
//     let metadata = {};

//     try {
//       const fileContent = await fs.readFile(filePath, "utf-8");
//       const { content, data } = matter(fileContent);
//       mdxContent = content;
//       metadata = data;
//       console.log(`✅ MDX file found for ${slug}`);
//     } catch (fileError) {
//       console.warn(`⚠ MDX file not found, using content from DB.`);
//       mdxContent = blog.content;
//     }

//     res.json({
//       title: metadata.title || blog.title,
//       description: metadata.description || blog.description,
//       published: metadata.published || blog.createdAt,
//       author: metadata.author || "Unknown",
//       content: mdxContent,
//     });
//   } catch (error) {
//     console.error("❌ Error fetching blog:", error);
//     res.status(500).json({ message: "Server Error", error: error.message });
//   }
// };

// /** ✅ Fetch blogs by category */
// export const getBlogsByCategory = async (req, res) => {
//   try {
//     const { category } = req.params;
//     console.log(`📂 Fetching blogs in category: ${category}`);

//     let filter =
//       category === "Others"
//         ? { $or: [{ category: { $exists: false } }, { category: "Others" }] }
//         : { category };

//     const blogs = await Blog.find(filter);

//     if (!blogs.length) {
//       return res
//         .status(404)
//         .json({ message: "No blogs found in this category" });
//     }

//     res.json(blogs);
//   } catch (error) {
//     console.error("❌ Error fetching blogs by category:", error);
//     res.status(500).json({ message: "Server Error", error: error.message });
//   }
// };

// /** ✅ Fetch all unique categories */
// export const getCategories = async (req, res) => {
//   try {
//     let categories = await Blog.distinct("category");

//     if (!categories.includes("Others")) {
//       categories.push("Others");
//     }
//     res.json(categories);
//   } catch (error) {
//     console.error("❌ Error fetching categories:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };


























import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";
import Blog from "../models/Blog.js";

// ✅ Get __dirname in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Define correct MDX folder path
const mdxFolderPath = path.join(__dirname, "../../mdx-content");

console.log("✅ MDX Folder Path:", mdxFolderPath);

/** ✅ Create a new blog */
export const createBlog = async (req, res) => {
  try {
    const { title, slug, description, content, category } = req.body;

    if (!title || !slug || !description || !content) {
      return res
        .status(400)
        .json({ error: "All fields (including category) are required" });
    }

    const formattedSlug = slug
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "-");
    const categoryToSave =
      category && category.trim() !== "" ? category : "Others";

    const existingBlog = await Blog.findOne({ slug: formattedSlug });
    if (existingBlog) {
      return res
        .status(400)
        .json({ error: "A blog with this slug already exists!" });
    }

    // ✅ Format MDX content with metadata
    const mdxContent = `---\ntitle: "${title}"\ndescription: "${description}"\ncategory: "${categoryToSave}"\nslug: "${formattedSlug}"\n---\n\n${content}`;

    const newBlog = await Blog.create({
      title,
      slug: formattedSlug,
      description,
      category: categoryToSave,
      content: mdxContent,
    });

    console.log(`✅ Blog created successfully: ${title} (${formattedSlug})`);

    res.status(201).json({
      message: "Blog created successfully",
      blog: newBlog,
    });
  } catch (error) {
    console.error("❌ Error creating blog:", error);
    res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
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

/** ✅ Fetch a blog by slug */
// export const getBlogBySlug = async (req, res) => {
//   try {
//     const { slug } = req.params;
//     console.log(`📖 Fetching blog with slug: ${slug}`);

//     const blog = await Blog.findOne({ slug });
//     if (!blog) {
//       return res.status(404).json({ message: "Blog not found" });
//     }

//     const filePath = path.join(mdxFolderPath, `${slug}.mdx`);
//     let mdxContent = "";
//     let metadata = {};

//     try {
//       const fileContent = await fs.readFile(filePath, "utf-8");
//       const { content, data } = matter(fileContent); // ✅ Extract metadata

//       mdxContent = content; // ✅ Only the actual content
//       metadata = data;

//       console.log(`✅ MDX file found for ${slug}`);
//     } catch (fileError) {
//       console.warn(`⚠ MDX file not found, using content from DB.`);
//       const { content, data } = matter(blog.content || ""); // ✅ Extract if stored in DB
//       mdxContent = content;
//       metadata = data;
//     }

//     res.json({
//       title: metadata.title || blog.title,
//       description: metadata.description || blog.description,
//       category: metadata.category || blog.category,
//       published: metadata.published || blog.createdAt,
//       author: metadata.author || "Unknown",
//       content: mdxContent, // ✅ Send only clean MDX content
//     });
//   } catch (error) {
//     console.error("❌ Error fetching blog:", error);
//     res.status(500).json({ message: "Server Error", error: error.message });
//   }
// };

export const getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    console.log(`📖 Fetching blog with slug: ${slug}`);

    const blog = await Blog.findOne({ slug });
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const filePath = path.join(mdxFolderPath, `${slug}.mdx`);
    let mdxContent = "";
    let metadata = {};

    try {
      // ✅ Read the MDX file and extract metadata
      const fileContent = await fs.readFile(filePath, "utf-8");
      const { content, data } = matter(fileContent);

      mdxContent = content;
      metadata = data;

      console.log(`✅ MDX file found for ${slug}`);
    } catch (fileError) {
      console.warn(`⚠ MDX file not found, using content from DB.`);
      const { content, data } = matter(blog.content || "");
      mdxContent = content;
      metadata = data;
    }

    res.json({
      title: metadata.title || blog.title,
      description: metadata.description || blog.description,
      category: metadata.category || blog.category,
      published: metadata.published || blog.createdAt,
      author: metadata.author || "Unknown",
      content: mdxContent, // ✅ Only send blog content (without frontmatter)
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

    res.json(blogs);
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
