import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { evaluate } from "@mdx-js/mdx";
import { MDXProvider } from "@mdx-js/react";
import * as runtime from "react/jsx-runtime";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import { useUser } from "../UserContext.jsx";
import { deleteBlog } from "../api.js";
import { API_BASE_URL } from "../api.js";
import axios from "axios";

export default function BlogDetails({ onBlogDeleted }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();

  const [blog, setBlog] = useState(null);
  const [CompiledMDX, setCompiledMDX] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${API_BASE_URL}/blogs/slug/${slug}`);
        if (!isMounted) return;

        setBlog(data); // blog from DB

        // Compile MDX body
        const compiled = await evaluate(data.content, {
          ...runtime,
          jsx: runtime.jsx,
          jsxs: runtime.jsxs,
          jsxImportSource: "react",
          providerImportSource: "@mdx-js/react",
          outputFormat: "function-body",
          rehypePlugins: [rehypeRaw, rehypeHighlight],
          remarkPlugins: [remarkGfm],
          allowDangerousHtml: true,

        });

        if (isMounted) {
          setCompiledMDX(() => compiled.default);
        }
      } catch (err) {
        console.error("🔥 MDX Evaluation Error:", err.message);
        setError("Failed to render blog content.");
      } finally {
        if (isMounted) setLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  const handleDelete = async () => {
    if (!window.confirm("Delete this blog?")) return;
    const success = await deleteBlog(slug, user.token);
    if (success) {
      alert("Blog deleted.");
      onBlogDeleted?.();
      navigate("/");
    } else {
      setError("Delete failed.");
    }
  };

  if (loading) return <p className="mt-6 text-center text-gray-500">Loading…</p>;
  if (error) return <p className="mt-6 text-center text-red-500">{error}</p>;
  if (!blog) return <p className="mt-6 text-center text-gray-500">No blog found.</p>;

  return (
    <div className="max-w-6xl mx-auto p-4 border-4 m-2">
      <article className="prose prose-zinc prose-xl prose-img:rounded-xl prose-headings:underline prose-a:text-blue-600 max-w-none">
        {/* Title & metadata */}
        <h1 className="">{blog.title}</h1>
        <p>
          <span className="font-bold text-black text-2xl">Description:</span>{" "}
          {blog.description}
        </p>

        {/* Category */}
        <p>
          <span className="font-bold text-black text-2xl ">Category:</span>{" "}
          {blog.category}
        </p>
        <MDXProvider>
          {CompiledMDX ? <CompiledMDX /> : <p>Rendering content…</p>}
        </MDXProvider>
      </article>

      {/* Delete button for admin or owner */}
      {user && (user.role === "admin" || user._id === blog.user) && (
        <div className="mt-6 text-right">
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete Blog
          </button>
        </div>
      )}
    </div>
  );
}
