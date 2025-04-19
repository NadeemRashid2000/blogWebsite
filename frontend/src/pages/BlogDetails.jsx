import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { evaluate } from "@mdx-js/mdx";
import { MDXProvider } from "@mdx-js/react";
import * as runtime from "react/jsx-runtime";
import axios from "axios";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { API_BASE_URL } from "../api.js";
import { useUser } from "../UserContext.jsx";

// Custom Styling for MDX Components
const components = {
  h1: (props) => (
    <h1 className="text-3xl font-bold text-blue-700 mb-4" {...props} />
  ),
  h2: (props) => (
    <h2 className="text-2xl font-semibold text-gray-700 mt-6 mb-3" {...props} />
  ),
  p: (props) => (
    <p className="text-lg text-gray-800 leading-relaxed mb-4" {...props} />
  ),
  pre: (props) => (
    <pre
      className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto"
      {...props}
    />
  ),
  code: (props) => <code className="text-green-400 font-mono" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="border-l-4 border-blue-400 pl-4 italic text-gray-600"
      {...props}
    />
  ),
  ul: (props) => (
    <ul className="list-disc list-inside text-gray-700 space-y-2" {...props} />
  ),
  a: (props) => <a className="text-blue-500 hover:underline" {...props} />,
};

const BlogDetails = ({ onBlogDeleted }) => {
  // Receive onBlogDeleted prop
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);
  const [CompiledMDX, setCompiledMDX] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const loadBlogData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/blogs/slug/${slug}`);
        if (!isMounted) return;

        const { title, description, category, published, content } =
          response.data;

        const formattedBlog = {
          title: title || "No Title Found",
          description: description || "No description available",
          category: category || "Uncategorized",
          published: published || null,
        };

        setBlog(formattedBlog);

        const compiled = await evaluate(content, {
          ...runtime,
          outputFormat: "function-body",
          rehypePlugins: [rehypeHighlight],
          remarkPlugins: [remarkGfm],
          providerImportSource: "@mdx-js/react",
        });

        if (typeof compiled.default === "function") {
          setCompiledMDX(() => compiled.default);
        } else {
          throw new Error("Compiled MDX is not a valid React component.");
        }
      } catch (err) {
        setError("Failed to load blog post.");
      } finally {
        setLoading(false);
      }
    };

    loadBlogData();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  const formatDate = (dateString) => {
    if (!dateString || isNaN(Date.parse(dateString))) return "Unknown";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirmed) return;

    try {
      await axios.delete(`${API_BASE_URL}/blogs/slug/${slug}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      alert("Blog deleted successfully!");
      onBlogDeleted(); // Call the callback function
      navigate("/");
    } catch (error) {
      // console.error(" Error deleting blog:", error);
      if (error.response && error.response.status === 403) {
        setError("Forbidden: You don't have permission to delete this blog.");
      } else {
        setError("Failed to delete blog. Check the console for details.");
      }
    }
  };

  if (loading) {
    return <p className="text-gray-500 text-center mt-6">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center mt-6">{error}</p>;
  }

  if (!blog) {
    return <p className="text-gray-500 text-center mt-6">No blog found.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-12 bg-gray-100">
      <div className="max-w-2xl mx-auto bg-white p-10 rounded-lg shadow-lg">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3 text-center">
          {blog.title}
        </h1>
        <p className="text-gray-500 text-sm text-center">
          <strong>Published on:</strong> {formatDate(blog.published)}
        </p>
        <p className="text-sm text-blue-600 text-center mt-1">
          <strong>Category:</strong> {blog.category}
        </p>
        <p className="text-lg text-gray-700 mt-2 text-center">
          <strong>Description:</strong> {blog.description}
        </p>

        {user?.role === "admin" && (
          <div className="flex justify-center">
            {/* <button
              onClick={handleDelete}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Delete Blog
            </button> */}
          </div>
        )}
        <div className="prose lg:prose-lg mt-8 text-gray-900 leading-relaxed">
          {CompiledMDX ? (
            <MDXProvider components={components}>
              <CompiledMDX />
            </MDXProvider>
          ) : (
            <p className="text-gray-400 italic text-center">
              Loading content...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
