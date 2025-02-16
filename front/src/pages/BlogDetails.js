import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BlogDetails = ({ user }) => {
  const { id } = useParams(); // ✅ Ensure id is correctly extracted
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  console.log("Fetching Blog ID:", blogId); // Debugging Step 🛠

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`/api/blogs/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error("❌ Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await axios.delete(`/api/blogs/${id}`, {
          headers: { Authorization: `Bearer ${user?.token}` }, // ✅ Include auth token if required
        });
        navigate("/"); // ✅ Redirect to home after deletion
      } catch (error) {
        console.error("❌ Error deleting blog:", error);
      }
    }
  };

  if (!blog) return <p>Loading...</p>;

  return (
    <div>
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
      {user?.isAdmin && (
        <button
          onClick={handleDelete}
          style={{
            backgroundColor: "red",
            color: "white",
            padding: "10px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Delete Blog
        </button>
      )}
    </div>
  );
};

export default BlogDetails;
