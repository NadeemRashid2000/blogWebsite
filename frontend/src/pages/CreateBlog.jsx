import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext.jsx";
import { API_BASE_URL } from "../api.js";
import axios from "axios";

const CreateBlog = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Others");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const categories = ["Others", "OS", "DSA", "Web Development", "Tech"];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formattedSlug = slug
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    const markdownContent = `---
title: ${title}
slug: ${formattedSlug}
description: ${description}
category: ${category || "Others"}
---

${content}`;

    // console.log(" Form data before submit:", {
    //   title,
    //   slug,
    //   description,
    //   category,
    //   content,
    // });
    // console.log(" Formatted slug:", formattedSlug);
    // console.log(" Final MDX content to send:\n", markdownContent);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/blogs`,
        {
          title,
          slug: formattedSlug,
          description,
          category,
          content: markdownContent,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        alert("Blog created successfully!");
        navigate("/");
        setTitle("");
        setSlug("");
        setDescription("");
        setCategory("Tech");
        setContent("");
      } else {
        const errorData = response.data || { message: "Unknown server error" };
        throw new Error(
          `Server error: ${response.status} - ${JSON.stringify(errorData)}`
        );
      }
    } catch (error) {
      // console.error("Error creating blog:", error);
      setError(`Failed to create blog: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Create a New Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
        />
        <input
          type="text"
          name="slug"
          placeholder="Slug (URL-friendly name)"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setSlug(e.target.value)}
          value={slug}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Short description"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          required
        />
        <select
          name="category"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          required
        >
          <option value="" disabled>
            Select a category
          </option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <textarea
          name="content"
          placeholder="Write your blog content here (in Markdown/MDX)"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="8"
          onChange={(e) => setContent(e.target.value)}
          value={content}
          required
        ></textarea>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Blog"}
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
