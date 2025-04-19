import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../api.js"; // Adjust the path if needed.  You may not have this file.
import axios from "axios";
import BlogCard from "../components/BlogCard.jsx"; // Assuming you have this component
import { UserContext } from "../UserContext.jsx"; // Import UserContext

const CategoryBlogs = () => {
  const { categoryName } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext); // Use the UserContext to get user info

  useEffect(() => {
    const fetchBlogsByCategory = async () => {
      if (!categoryName) {
        setLoading(false);
        setError("Category name is undefined.");
        return;
      }
      try {
        console.log("Fetching blogs for category:", categoryName);
        const response = await axios.get(
          `${API_BASE_URL}/blogs/category/${categoryName}`
        );
        if (response.status >= 200 && response.status < 300) {
          setBlogs(response.data);
        } else {
          setError(
            `Failed to fetch blogs: ${response.status} - ${response.statusText}`
          );
        }
      } catch (error) {
        setError(`Error fetching blogs: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    if (categoryName) {
      fetchBlogsByCategory();
    }
  }, [categoryName]);

  const handleDeleteBlog = async (slug) => {
    try {
      if (!user) {
        alert("You must be logged in to delete a blog.");
        return;
      }
      // Delete from the backend
      await axios.delete(`${API_BASE_URL}/blogs/slug/${slug}`, {
        headers: {
          Authorization: `Bearer ${user.token}`, // Use the user's token from context
        },
      });
      console.log(`Blog with slug ${slug} deleted from backend`);

      // Update the frontend state
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.slug !== slug));
      // console.log(`Blog with slug ${slug} deleted from frontend state`);
      console.log(`Blog with slug ${slug} deleted and frontend is updated`);
    } catch (error) {
      console.error("Error deleting blog:", error);
      setError("Failed to delete blog."); // set the error message.
    }
  };

  if (loading) {
    return <div>Loading blogs for {categoryName}...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!blogs || blogs.length === 0) {
    return <div>No blogs found for the category: {categoryName}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-violet-700 mb-6 text-center">
        Blogs in {categoryName}
      </h1>
      <div className="space-y-6">
        {blogs.map((blog) => (
          <BlogCard
            key={blog._id}
            blog={blog}
            onDelete={user?.role === "admin" ? handleDeleteBlog : undefined} // Pass handleDeleteBlog only if admin
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryBlogs;
