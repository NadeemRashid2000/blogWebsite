import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    category: { type: String, default: "Others" },
    content: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // 🔗 This enables population of user data
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);
