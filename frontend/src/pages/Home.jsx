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

  // Fetch blogs
  const fetchBlogs = async () => {
    setIsLoadingBlogs(true);
    setErrorBlogs(null);
    try {
      const { data } = await axios.get(`${API_BASE_URL}/blogs`);
      setBlogs(data);
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setErrorBlogs("Failed to load blogs. Please try again later.");
    } finally {
      setIsLoadingBlogs(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Fetch categories
  useEffect(() => {
    setIsLoadingCategories(true);
    setErrorCategories(null);

    fetch(`${API_BASE_URL}/blogs/categories`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch categories");
        return res.json();
      })
      .then((data) => setCategories(data))
      .catch((err) => {
        console.error("Error fetching categories:", err);
        setErrorCategories("Failed to load categories. Please try again later.");
      })
      .finally(() => setIsLoadingCategories(false));
  }, []);

  // Delete blog
  const handleDeleteBlog = async (slug) => {
    if (!user?.token) {
      setErrorBlogs("You must be logged in to delete a blog.");
      return;
    }
    try {
      await axios.delete(`${API_BASE_URL}/blogs/slug/${slug}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setBlogs((prev) => prev.filter((b) => b.slug !== slug));
    } catch (err) {
      console.error("Error deleting blog:", err);
      setErrorBlogs("Failed to delete blog.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">

      {/*  Hero Section  */}
      <section className="bg-zinc-900 p-4">
        <div className="grid mx-auto lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-5xl xl:text-6xl">
              Master Development Skills with Expert Articles
            </h1>
            <p className="mb-6 text-gray-300 text-lg max-w-2xl">
              Dive into expert-written articles that break down complex topics in development.
              Learn real-world skills quickly and effectively with in-depth guides.
            </p>
          </div>
          <div className="lg:col-span-5 mt-8 lg:mt-0">
            <img
              className="w-full h-full rounded-2xl"
              src="/hero.png"
              alt="hero"
            />
          </div>
        </div>
      </section>

      {/* Main Content Section  */}
      <section className="bg-neutral-600 p-4 sm:p-8 flex-1">
        <div className="max-w-screen-xl mx-7 flex flex-col lg:flex-row gap-8">

          {/* Categories Sidebar */}
          <aside className="w-full lg:w-48 lg:shrink-0 lg:pr-6 lg:border-r lg:border-black mb-8 lg:mb-0">
            <h2 className="mb-3 text-3xl font-semibold text-gray-100">
              Categories
            </h2>
            {isLoadingCategories ? (
              <p className="text-gray-300">Loading…</p>
            ) : errorCategories ? (
              <p className="text-red-400">{errorCategories}</p>
            ) : categories.length ? (
              <ul className="space-y-1">
                {categories.map((cat) => (
                  <li key={cat}>
                    <Link
                      to={`/category/${cat}`}
                      className="block py-1 text-black font-medium hover:underline"
                    >
                      {cat}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-300">No categories.</p>
            )}
          </aside>

          {/* Latest Blogs */}
          <main className="flex-1">
            <h2 className="mb-6 text-3xl font-semibold text-white">
              Latest Blogs
            </h2>

            {isLoadingBlogs ? (
              <p className="text-gray-300">Loading…</p>
            ) : errorBlogs ? (
              <p className="text-red-400">{errorBlogs}</p>
            ) : blogs.length ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                {blogs.slice(0, 6).map((blog) => (
                  <BlogCard
                    key={blog._id}
                    blog={blog}
                    onDelete={handleDeleteBlog}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-300">No blogs available.</p>
            )}
          </main>

        </div>
      </section>
    </div>
  );
};

export default Home;

