import Blog from "../models/Blog.js";
import { adminMiddleware } from "../middlewares/auth.js";

// 🔹 Get All Blogs
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching blogs", error: err.message });
  }
};

// 🔹 Get a Single Blog by ID
export const getSingleBlog = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Blog ID" });
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};




// 🔹 Create a Blog (Admins Only)
export const createBlog = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Access Denied. Admins only." });
    }

    const { title, category, content } = req.body;
    if (!title || !category || !content) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newBlog = new Blog({
      title,
      category,
      content,
      author: req.user._id,
    });

    await newBlog.save();
    res
      .status(201)
      .json({ message: "Blog created successfully", blog: newBlog });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating blog", error: err.message });
  }
};


// 🔹 Delete a Blog (Admins Only)
export const deleteBlog = async (req, res) => {
  try {
    // Check if the user is an admin
    if (!req.user?.isAdmin) {
      return res.status(403).json({ message: "Access Denied" });
    }

    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

