import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlogCard from "../components/BlogCard"; // ✅ Import BlogCard
import { API_BASE_URL } from "../api.js";

const CategoryBlogs = () => {
  const { category } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetch(`${API_BASE_URL}/blogs/category/${category}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch blogs: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("✅ Fetched blogs data:", data);
        if (Array.isArray(data)) {
          setBlogs(data);
        } else {
          setBlogs([]);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching blogs:", err);
        setError("Failed to load blogs. Please try again later.");
        setIsLoading(false);
      });
  }, [category]);

  // ✅ Function to remove a deleted blog from UI
  const handleDeleteFromUI = (deletedSlug) => {
    setBlogs((prevBlogs) =>
      prevBlogs.filter((blog) => blog.slug !== deletedSlug)
    );
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-blue-700 mb-8">{category} Blogs</h1>

      {isLoading && <p className="text-gray-500">Loading blogs...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!isLoading && blogs.length === 0 && !error && (
        <p className="text-gray-500">No blogs found in this category.</p>
      )}

      {blogs.length > 0 && (
        <div className="space-y-4">
          {blogs.map((blog) => (
            <BlogCard
              key={blog._id}
              blog={blog}
              onDelete={handleDeleteFromUI}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryBlogs;

