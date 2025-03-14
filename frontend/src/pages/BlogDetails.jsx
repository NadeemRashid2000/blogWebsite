// // ! Searching by using id🤷‍♂️
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { evaluate } from "@mdx-js/mdx";
// import { MDXProvider } from "@mdx-js/react";
// import * as runtime from "react/jsx-runtime";
// import axios from "axios";
// import rehypeHighlight from "rehype-highlight";
// import remarkGfm from "remark-gfm";

// const components = {
//   h1: (props) => <h1 className="text-3xl font-bold text-blue-600" {...props} />,
//   pre: (props) => (
//     <pre className="bg-gray-900 text-white p-4 rounded-md" {...props} />
//   ),
//   code: (props) => <code className="text-green-400 font-mono" {...props} />,
// };

// const BlogDetails = () => {
//   const { slug } = useParams();
//   const [blog, setBlog] = useState(null);
//   const [error, setError] = useState(null);
//   const [CompiledMDX, setCompiledMDX] = useState(null);

//   console.log("🆔 Blog Slug from URL:", slug);

//   useEffect(() => {
//     let isMounted = true; // ✅ Prevent multiple API calls

//     const loadBlogData = async () => {
//       try {
//         console.log("🔍 Fetching blog data for:", slug);

//         const response = await axios.get(
//           `http://localhost:5000/api/blogs/slug/${slug}`
//         );
//         if (!isMounted) return; // ✅ Prevent setting state after unmounting

//         setBlog(response.data);

//         if (response.data.content) {
//           console.log("📜 Raw MDX Content:", response.data.content);

//           const compiled = await evaluate(response.data.content.trim(), {
//             ...runtime,
//             outputFormat: "function",
//             rehypePlugins: [rehypeHighlight],
//             remarkPlugins: [remarkGfm],
//             providerImportSource: "@mdx-js/react",
//           });

//           console.log("✅ Compiled MDX Content:", compiled);

//           if (typeof compiled.default === "function") {
//             setCompiledMDX(() => compiled.default);
//           } else {
//             throw new Error("❌ Compiled MDX is not a valid React component.");
//           }
//         }
//       } catch (err) {
//         console.error("❌ Error fetching blog data:", err);
//         setError("Failed to load blog post.");
//       }
//     };

//     loadBlogData();

//     return () => {
//       isMounted = false; // ✅ Cleanup function to prevent extra API calls
//     };
//   }, [slug]);

//   if (error) return <p className="text-red-500">{error}</p>;
//   if (!blog) return <p className="text-gray-500">Loading...</p>;

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
//       <p className="text-gray-600 mb-6">
//         Published on: {new Date(blog.published).toLocaleDateString()}
//       </p>

//       <div className="prose max-w-none">
//         {CompiledMDX ? (
//           <MDXProvider components={components}>
//             <CompiledMDX />
//           </MDXProvider>
//         ) : (
//           <p className="text-gray-500">Rendering blog content...</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BlogDetails;




import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { evaluate } from "@mdx-js/mdx";
import { MDXProvider } from "@mdx-js/react";
import * as runtime from "react/jsx-runtime";
import axios from "axios";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

const components = {
  h1: (props) => <h1 className="text-3xl font-bold text-blue-600" {...props} />,
  pre: (props) => (
    <pre className="bg-gray-900 text-white p-4 rounded-md" {...props} />
  ),
  code: (props) => <code className="text-green-400 font-mono" {...props} />,
};

const BlogDetails = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);
  const [CompiledMDX, setCompiledMDX] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log("🆔 Blog Slug from URL:", slug);

  useEffect(() => {
    let isMounted = true;

    const loadBlogData = async () => {
      setLoading(true);
      try {
        console.log("🔍 Fetching blog data for:", slug);

        const response = await axios.get(
          `http://localhost:5000/api/blogs/slug/${slug}`
        );
        if (!isMounted) return;

        if (!response.data || !response.data.content) {
          throw new Error("❌ Blog content is missing.");
        }

        const { title, description, content, published } = response.data;

        console.log("📜 Raw MDX Content:", content);

        setBlog({ title, description, published });

        const compiled = await evaluate(content.trim(), {
          ...runtime,
          outputFormat: "function",
          rehypePlugins: [rehypeHighlight],
          remarkPlugins: [remarkGfm],
          providerImportSource: "@mdx-js/react",
        });

        console.log("✅ Compiled MDX Content:", compiled);

        if (typeof compiled.default === "function") {
          setCompiledMDX(() => compiled.default);
        } else {
          throw new Error("❌ Compiled MDX is not a valid React component.");
        }
      } catch (err) {
        console.error("❌ Error fetching blog data:", err);
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

  // ✅ Fix: Ensure blog is not null before accessing properties
  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!blog) return <p className="text-gray-500">No blog found.</p>; // ✅ Prevents `null` error

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-600 mb-6">
        Published on:{" "}
        {blog.published
          ? new Date(blog.published).toLocaleDateString()
          : "Unknown"}
      </p>

      <div className="prose max-w-none">
        {CompiledMDX ? (
          <MDXProvider components={components}>
            <CompiledMDX />
          </MDXProvider>
        ) : (
          <p className="text-gray-500">Rendering blog content...</p>
        )}
      </div>
    </div>
  );
};

export default BlogDetails;
