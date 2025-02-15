// import mongoose from "mongoose";

// const BlogSchema = new mongoose.Schema({
//   title: { type: String, required: true, index: true },
//   category: { type: String, required: true, index: true },
//   content: { type: String, required: true },
//   pdfUrl: { type: String },
//   createdAt: { type: Date, default: Date.now, index: -1 },
// });

// export default mongoose.model("Blog", BlogSchema);


import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, index: true },
  category: { type: String, required: true, index: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // 🔹 Tracks blog owner
  pdfUrl: { type: String }, // 🔹 Stores uploaded file URL
  createdAt: { type: Date, default: Date.now, index: -1 },
});

export default mongoose.model("Blog", blogSchema);
