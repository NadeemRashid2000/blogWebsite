import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BlogCard from "../components/BlogCard"; //  Import BlogCard
import { API_BASE_URL } from "../api.js";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoadingBlogs, setIsLoadingBlogs] = useState(true);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [errorBlogs, setErrorBlogs] = useState(null);
  const [errorCategories, setErrorCategories] = useState(null);

  //  Fetch latest blogs
  useEffect(() => {
    setIsLoadingBlogs(true);
    setErrorBlogs(null);

    fetch(`${API_BASE_URL}/blogs`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch blogs");
        return res.json();
      })
      .then((data) => {
        setBlogs(data);
        setIsLoadingBlogs(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching blogs:", err);
        setErrorBlogs("Failed to load blogs. Please try again later.");
        setIsLoadingBlogs(false);
      });
  }, []);

  //  Fetch categories
  useEffect(() => {
    setIsLoadingCategories(true);
    setErrorCategories(null);

    fetch(`${API_BASE_URL}/blogs/categories`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch categories");
        return res.json();
      })
      .then((data) => {
        setCategories(data);
        setIsLoadingCategories(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching categories:", err);
        setErrorCategories(
          "Failed to load categories. Please try again later."
        );
        setIsLoadingCategories(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/*  Hero Section */}
      <section className="w-full flex flex-col items-center justify-center text-center py-12 bg-gradient-to-r from-blue-500 to-purple-400 text-white">
        <h1 className="text-5xl font-bold mb-3">Welcome To My Blog App</h1>
        <p className="text-lg mb-4 max-w-2xl mx-auto leading-loose">
          Read blogs about Data Structures, Operating Systems, Databases, and
          Tech.
        </p>
        <Link to="/create">
          <button className="mt-4 bg-white text-red-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-200 hover:scale-105 transition-transform duration-200">
            Create a Blog
          </button>
        </Link>
      </section>

      {/*  Main Layout */}
      <div className="max-w-6xl mx-auto p-6 flex flex-col md:flex-row gap-8">
        {/*  Categories Sidebar */}
        <div className="md:w-1/3 bg-white shadow-md p-4 rounded-lg">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Categories</h2>

          {isLoadingCategories ? (
            <p className="text-gray-500">Loading categories...</p>
          ) : errorCategories ? (
            <p className="text-red-500">{errorCategories}</p>
          ) : categories.length > 0 ? (
            <ul className="text-left">
              {categories.map((category) => (
                <li key={category} className="mb-2">
                  <Link
                    to={`/category/${category}`}
                    className="text-blue-500 hover:underline"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No categories available.</p>
          )}
        </div>

        {/*  Blog List */}
        <div className="md:w-2/3 bg-white shadow-md p-4 rounded-lg">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">
            Latest Blogs
          </h2>

          {isLoadingBlogs ? (
            <p className="text-gray-500">Loading blogs...</p>
          ) : errorBlogs ? (
            <p className="text-red-500">{errorBlogs}</p>
          ) : blogs.length > 0 ? (
            <div className="space-y-4">
              {blogs.slice(0, 5).map((blog) => (
                <BlogCard
                  key={blog._id}
                  blog={blog}
                  onDelete={(slug) =>
                    setBlogs((prevBlogs) =>
                      prevBlogs.filter((b) => b.slug !== slug)
                    )
                  }
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No blogs available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;