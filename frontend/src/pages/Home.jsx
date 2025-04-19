import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import { API_BASE_URL } from "../api.js";
import { UserContext } from "../UserContext.jsx";
import axios from "axios";

const Home = () => {
  const { user } = useContext(UserContext);
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoadingBlogs, setIsLoadingBlogs] = useState(true);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [errorBlogs, setErrorBlogs] = useState(null);
  const [errorCategories, setErrorCategories] = useState(null);
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    setIsLoadingBlogs(true);
    setErrorBlogs(null);
    // console.log("📡 Fetching blogs from:", `${API_BASE_URL}/blogs`);
    try {
      const response = await axios.get(`${API_BASE_URL}/blogs`); // Use axios
      setBlogs(response.data);
    } catch (err) {
      // console.error(" Error fetching blogs:", err);
      setErrorBlogs("Failed to load blogs. Please try again later.");
    } finally {
      setIsLoadingBlogs(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

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
        console.error(" Error fetching categories:", err);
        setErrorCategories(
          "Failed to load categories. Please try again later."
        );
        setIsLoadingCategories(false);
      });
  }, []);

  const handleDeleteBlog = async (slug) => {
    try {
      // Delete from the backend
      await axios.delete(`${API_BASE_URL}/blogs/slug/${slug}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      // console.log(`Blog with slug ${slug} deleted from backend`);

      // Update the frontend state
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.slug !== slug));
      // console.log(`Blog with slug ${slug} deleted from frontend state`);
    } catch (error) {
      console.error("Error deleting blog:", error);
      setErrorBlogs("Failed to delete blog.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="w-full flex flex-col items-center justify-center text-center py-12 bg-gradient-to-r from-blue-500 to-purple-400 text-white">
        <h1 className="text-5xl font-bold mb-3">Welcome To My Blog App</h1>
        <p className="text-lg mb-4 max-w-2xl mx-auto leading-loose">
          Read blogs about Data Structures, Operating Systems, Databases, and
          Tech.
        </p>
        {user && user.role === "admin" && (
          <Link to="/create">
            <button className="mt-4 bg-white text-red-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-200 hover:scale-105 transition-transform duration-200">
              Create a Blog
            </button>
          </Link>
        )}
      </section>

      <div className="max-w-6xl mx-auto p-6 flex flex-col md:flex-row gap-8 items-start">
        <div className="md:w-1/3 bg-white shadow-md p-4 rounded-lg ">
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
                  onDelete={handleDeleteBlog} // Pass handleDeleteBlog
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
