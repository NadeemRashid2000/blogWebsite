import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext.jsx";

const BlogCard = ({ blog, onDelete }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="max-w-sm rounded-2xl overflow-hidden bg-stone-300 shadow-lg border border-gray-200 flex flex-col h-95">
      {/* Blog Image */}
      <div
        className="h-1/2 bg-cover bg-center"
        style={{
          backgroundImage: `url('/blog-card-bg.png')`,
        }}
      ></div>

      {/* Card Content */}
      <div className="p-4 h-1/2 overflow-hidden flex flex-col justify-between">
        {/* Title and Description */}
        <div className="flex-grow">
          <Link to={`/blogs/slug/${blog.slug}`}>
            <h5 className="mb-2 text-xl font-bold text-gray-900 hover:text-blue-600 transition truncate">
              {blog.title}
            </h5>
          </Link>

          <p className="mb-3 text-gray-700 line-clamp-2">
            {blog.description || "No description available"}
          </p>
        </div>

        {/* Footer: Date + Buttons */}
        <div className="flex flex-col">
          <p className="text-sm font-semibold mb-2">
            Published on:{" "}
            {new Date(blog.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <div className="mt-2 flex items-center gap-2">
            <Link
              to={`/blogs/slug/${blog.slug}`}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition"
            >
              Read more
              <svg
                className="w-4 h-4 ml-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </Link>

            {user?.role === "admin" && (
              <button
                onClick={() => onDelete(blog.slug)}
                className="px-4 py-2 border border-red-500 text-red-600 rounded-md hover:bg-red-500 hover:text-white transition font-medium"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;