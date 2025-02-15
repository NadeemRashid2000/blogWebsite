import React from "react";
import { Link } from "react-router-dom";
import "../styles/BlogCard.css"; // Importing CSS file

const BlogCard = ({ blog }) => {
  return (
    <div className="blog-card">
      <h2 className="blog-title">{blog.title}</h2>
      <p className="blog-category">{blog.category}</p>
      <Link to={`/blogs/${blog._id}`} className="read-more">
        Read More
      </Link>
    </div>
  );
};

export default BlogCard;
