import React from "react";
import { deleteBlog } from "../api"; // ✅ Import delete function
import { Link } from "react-router-dom"; // ✅ Import Link for navigation

const BlogCard = ({ blog, onDelete }) => {
  // ✅ Debugging Log
  console.log("📜 Blog data in BlogCard:", blog);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${blog.title}"?`
    );
    if (!confirmed) return;

    const success = await deleteBlog(blog.slug);
    if (success) {
      alert("✅ Blog deleted successfully!");
      onDelete(blog.slug); // ✅ Remove blog from UI after deleting
    } else {
      alert("❌ Failed to delete blog.");
    }
  };

  return (
    <div className="border p-4 rounded-lg shadow-lg bg-white flex justify-between items-center gap-4">
      {/* Left: Blog Title & Description */}
      <div className="flex-1">
        <h2 className="text-xl font-bold text-blue-600">
          <Link to={`/blog/${blog.slug}`} className="hover:underline">
            {blog.title}
          </Link>
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          {blog.description || "No description available"}
        </p>
      </div>

      {/* Right: Delete Button */}
      <button
        onClick={handleDelete}
        className="px-4 py-2 border border-red-500 rounded text-red-500 hover:bg-red-500 hover:text-white transition font-semibold"
      >
        Delete
      </button>
    </div>
  );
};

export default BlogCard;
