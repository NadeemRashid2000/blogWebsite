import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext.jsx";

const BlogCard = ({ blog, onDelete }) => {
  // Receive onDelete
  const { user } = useContext(UserContext);

  return (
    <div className="border p-4 rounded-lg shadow-lg bg-white flex justify-between items-center gap-4">
      <div className="flex-1">
        <h2 className="text-xl font-bold text-blue-600">
          <Link to={`/blogs/slug/${blog.slug}`} className="hover:underline">
            {blog.title}
          </Link>
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          {blog.description || "No description available"}
        </p>
        <p className="text-gray-400 text-xs mt-1">
          Published on:{" "}
          {new Date(blog.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
      {user && user.role === "admin" && (
        <button
          onClick={() => onDelete(blog.slug)} // Call onDelete
          className="px-4 py-2 border border-red-500 rounded text-red-500 hover:bg-red-500 hover:text-white transition font-semibold"
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default BlogCard;
