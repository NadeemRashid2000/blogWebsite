import React, { useState } from "react";
import { createBlog } from "../api";

const CreateBlog = () => {
  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    category: "",
    content: "",
  });

  const categories = ["Operating System", "DSA", "Web Development", "Tech"];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Format slug safely
    const formattedSlug = form.slug
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    // Build frontmatter
    const frontmatter =
      `---\n` +
      `title: ${form.title}\n` +
      `slug: ${formattedSlug}\n` +
      `description: ${form.description}\n` +
      `category: ${form.category || "Others"}\n` +
      `---\n\n`;

    // Final markdown content to send
    const markdownContent = frontmatter + form.content;

    try {
      await createBlog({ content: markdownContent });
      alert(" Blog created successfully!");
      setForm({
        title: "",
        slug: "",
        description: "",
        category: "",
        content: "",
      });
    } catch (error) {
      console.error("❌ Error creating blog:", error);
      alert("Failed to create blog. Check the console for details.");
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
          className="w-full p-2 border"
          onChange={handleChange}
          value={form.title}
          required
        />
        <input
          type="text"
          name="slug"
          placeholder="Slug (URL-friendly name)"
          className="w-full p-2 border"
          onChange={handleChange}
          value={form.slug}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Short description"
          className="w-full p-2 border"
          onChange={handleChange}
          value={form.description}
          required
        />
        <select
          name="category"
          className="w-full p-2 border"
          onChange={handleChange}
          value={form.category}
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
          className="w-full p-2 border"
          rows="8"
          onChange={handleChange}
          value={form.content}
          required
        ></textarea>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Create Blog
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
