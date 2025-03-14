 
// ! Number 2: Setup the Blog Schema
// ! Define the blog structure like title, slug, description in mdb
import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: String,
  slug: String,
  category: String, // ✅ Add category field
  content: String,
  createdAt: { type: Date, default: Date.now },
});


// * Create a model named "Blog" using blogSchema
// * This will make a "blogs" collection in MongoDB

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;


// TODO: blogController for blog creation , retrival