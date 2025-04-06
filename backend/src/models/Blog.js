// ! Number 2: Setup the Blog Schema
// ! Define the blog structure like title, slug, description in mdb

import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: String,
    slug: { type: String, unique: true },
    description: String,
    category: String,
    content: String,
  },
  { timestamps: true }
);

export default mongoose.model("Blog", BlogSchema);

// TODO: blogController for blog creation , retrival
