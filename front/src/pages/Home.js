import React, { useEffect, useState } from "react";
import { getAllBlogs } from "../api/blogApi";
import BlogCard from "../components/BlogCard";
import "../styles/Home.css"; // Import the new CSS file

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getAllBlogs().then((res) => setBlogs(res.data));
  }, []);

  return (
    <div className="home-container">
      <h1 className="home-title">Latest Blogs</h1>
      <div className="blog-grid">
        {blogs.map((blog, index) => (
          <BlogCard key={blog._id || index} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default Home;
