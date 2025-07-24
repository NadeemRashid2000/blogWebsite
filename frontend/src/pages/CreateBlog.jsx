import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext.jsx";
import { createBlogWithAuth } from "../api.js";
import MDEditor from "@uiw/react-md-editor";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

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

  const containsRawHTML = (text) => /<[^>]+>/.test(text);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!title.trim() || !slug.trim() || !description.trim()) {
      setError("Please fill all required fields.");
      setLoading(false);
      return;
    }

    // if (!content.trim()) {
    //   setError("Blog content cannot be empty.");
    //   setLoading(false);
    //   return;
    // }

    // if (containsRawHTML(content)) {
    //   setError("Please remove any raw HTML tags (like <div>) from the content.");
    //   setLoading(false);
    //   return;
    // }

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

${content.trim() || "*No content provided*"}`;

    // console.log("Final MDX content to send:\n", markdownContent);

    try {
      const result = await createBlogWithAuth(
        {
          title,
          slug: formattedSlug,
          description,
          category,
          content: markdownContent,
        },
        user?.token
      );

      if (result) {
        alert("Blog created successfully!");
        navigate("/");
        setTitle("");
        setSlug("");
        setDescription("");
        setCategory("Others");
        setContent("");
      } else {
        throw new Error("Blog creation returned null");
      }
    } catch (error) {
      console.error("Error creating blog:", error);
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

        <div data-color-mode="dark">
          <MDEditor
            height={400}
            value={content}
            onChange={(val) => setContent(val ?? "")}
            preview="edit"
          />
        </div>

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










