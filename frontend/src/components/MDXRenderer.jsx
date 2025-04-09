import { useState, useEffect, useCallback } from "react";
import { MDXProvider } from "@mdx-js/react";
import * as runtime from "react/jsx-runtime";
import { evaluate } from "@mdx-js/mdx";
import rehypeHighlight from "rehype-highlight"; //  Enables syntax highlighting
import remarkGfm from "remark-gfm"; //  Enables tables, footnotes, task lists, etc.
import { API_BASE_URL } from "../api.js";

const components = {
  h1: (props) => (
    <h1 className="text-4xl font-bold text-blue-700 my-4" {...props} />
  ),
  h2: (props) => (
    <h2 className="text-3xl font-semibold text-blue-600 my-3" {...props} />
  ),
  pre: (props) => (
    <pre
      className="bg-gray-900 text-white p-4 rounded-md overflow-x-auto"
      {...props}
    />
  ),
  code: ({ className = "", ...props }) => (
    <code className={`text-green-400 font-mono ${className}`} {...props} />
  ),
};

const MDXRenderer = ({ slug }) => {
  const [MDXContent, setMDXContent] = useState(null);
  const [metadata, setMetadata] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMDX = useCallback(async () => {
    try {
      console.log("🔍 Fetching Blog:", slug);

      const response = await fetch(`${API_BASE_URL}/blogs/slug/${slug}`);

      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      console.log(" Fetched Blog Data:", data);

      setMetadata({
        title: data.title || "Untitled",
        description: data.description || "No description available",
        published: data.published
          ? new Date(data.published).toLocaleDateString()
          : "Unknown Date",
      });

      console.log("📜 Raw MDX Content:", data.content);

      const cleanedContent = data.content ? data.content.trim() : "";

      console.log("🚀 Final MDX Content Before Compilation:", cleanedContent);

      const compiled = await evaluate(cleanedContent, {
        ...runtime,
        outputFormat: "function",
        rehypePlugins: [rehypeHighlight],
        remarkPlugins: [remarkGfm],
        providerImportSource: "@mdx-js/react", // ✅ Fix for MDX imports
      });

      console.log(" Compiled MDX Content:", compiled);

      if (typeof compiled.default === "function") {
        setMDXContent(() => compiled.default);
      } else {
        throw new Error(" Compiled MDX is not a valid React component.");
      }
    } catch (err) {
      console.error(" Error fetching MDX:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchMDX();
  }, [fetchMDX]);

  if (loading) return <p className="text-gray-500">Loading blog post...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-black">{metadata.title}</h1>
      <p className="text-gray-500">
        Published on: <strong>{metadata.published}</strong>
      </p>
      <p className="text-gray-700">{metadata.description}</p>
      <hr className="my-4" />
      <MDXProvider components={components}>
        {MDXContent ? (
          <MDXContent />
        ) : (
          <p className="text-gray-500">No content available</p>
        )}
      </MDXProvider>
    </div>
  );
};

export default MDXRenderer;
