// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { evaluate } from "@mdx-js/mdx";
// import { MDXProvider } from "@mdx-js/react";
// import * as runtime from "react/jsx-runtime";
// import axios from "axios";
// import rehypeHighlight from "rehype-highlight";
// import remarkGfm from "remark-gfm";
// import matter from "gray-matter";
// import { Buffer } from "buffer";

// // ✅ Fix Buffer issue in Vite
// window.Buffer = window.Buffer || Buffer;

// // ✅ Custom Styling for MDX Components
// const components = {
//   h1: (props) => (
//     <h1 className="text-4xl font-bold text-blue-600 mb-4" {...props} />
//   ),
//   h2: (props) => (
//     <h2 className="text-2xl font-semibold text-gray-700 mt-6 mb-3" {...props} />
//   ),
//   p: (props) => (
//     <p className="text-lg text-gray-800 leading-relaxed mb-4" {...props} />
//   ),
//   pre: (props) => (
//     <pre
//       className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto"
//       {...props}
//     />
//   ),
//   code: (props) => <code className="text-green-400 font-mono" {...props} />,
//   blockquote: (props) => (
//     <blockquote
//       className="border-l-4 border-blue-400 pl-4 italic text-gray-600"
//       {...props}
//     />
//   ),
//   ul: (props) => (
//     <ul className="list-disc list-inside text-gray-700 space-y-2" {...props} />
//   ),
//   a: (props) => <a className="text-blue-500 hover:underline" {...props} />,
// };

// const BlogDetails = () => {
//   const { slug } = useParams();
//   const [blog, setBlog] = useState(null);
//   const [error, setError] = useState(null);
//   const [CompiledMDX, setCompiledMDX] = useState(null);
//   const [loading, setLoading] = useState(true);

//   console.log("🆔 Blog Slug from URL:", slug);

//   useEffect(() => {
//     let isMounted = true;

//     const loadBlogData = async () => {
//       setLoading(true);
//       try {
//         console.log("🔍 Fetching blog data for:", slug);

//         const response = await axios.get(
//           `http://localhost:5000/api/blogs/slug/${slug}`
//         );
//         if (!isMounted) return;

//         console.log("📜 Raw API Response:", response.data);

//         if (!response.data || !response.data.content) {
//           throw new Error("❌ Blog content is missing.");
//         }

//         // ✅ Extract frontmatter using `gray-matter`
//         const { content, data: metadata } = matter(response.data.content);

//         console.log("📄 Extracted Metadata:", metadata);
//         console.log("📜 Clean MDX Content:", content);

//         setBlog({
//           title: metadata?.title || "No Title Found",
//           description: metadata?.description || "No description available",
//           category: metadata?.category || "Uncategorized",
//           published:
//             metadata?.published || response.data.published || "Unknown",
//         });

//         // ✅ Compile the cleaned MDX content (Lazy Evaluation)
//         setTimeout(async () => {
//           try {
//             const compiled = await evaluate(content.trim(), {
//               ...runtime,
//               outputFormat: "function",
//               rehypePlugins: [rehypeHighlight],
//               remarkPlugins: [remarkGfm],
//               providerImportSource: "@mdx-js/react",
//             });

//             console.log("✅ Compiled MDX Content:", compiled);

//             if (typeof compiled.default === "function") {
//               setCompiledMDX(() => compiled.default);
//             } else {
//               throw new Error(
//                 "❌ Compiled MDX is not a valid React component."
//               );
//             }
//           } catch (err) {
//             console.error("❌ Error compiling MDX:", err);
//             setError("Failed to render blog content.");
//           }
//         }, 200); // Small delay to prevent hydration errors
//       } catch (err) {
//         console.error("❌ Error fetching blog data:", err);
//         setError("Failed to load blog post.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadBlogData();

//     return () => {
//       isMounted = false;
//     };
//   }, [slug]);

//   // ✅ Prevents rendering errors
//   if (loading)
//     return <p className="text-gray-500 text-center mt-6">Loading...</p>;
//   if (error) return <p className="text-red-500 text-center mt-6">{error}</p>;
//   if (!blog)
//     return <p className="text-gray-500 text-center mt-6">No blog found.</p>;

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
//       <h1 className="text-4xl font-bold text-gray-900 mb-4">{blog.title}</h1>
//       <p className="text-gray-600 mb-2">
//         <strong>Published on:</strong>{" "}
//         {blog.published
//           ? new Date(blog.published).toLocaleDateString()
//           : "Unknown"}
//       </p>
//       <p className="text-gray-600 mb-6">
//         <strong>Description:</strong> {blog.description}
//       </p>

//       <div className="prose max-w-none text-gray-900">
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
import matter from "gray-matter";
import { Buffer } from "buffer";

// ✅ Fix Buffer issue in Vite
window.Buffer = window.Buffer || Buffer;

// ✅ Custom MDX Components with Better Styling
const components = {
  h1: (props) => (
    <h1 className="text-4xl font-bold text-blue-600 mb-4" {...props} />
  ),
  h2: (props) => (
    <h2 className="text-3xl font-semibold text-gray-700 mt-6 mb-3" {...props} />
  ),
  h3: (props) => (
    <h3 className="text-2xl font-medium text-gray-700 mt-4 mb-2" {...props} />
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

        console.log("📜 Raw API Response:", response.data);

        if (!response.data || !response.data.content) {
          throw new Error("❌ Blog content is missing.");
        }

        // ✅ Extract frontmatter using `gray-matter`
        const { content, data: metadata } = matter(response.data.content);

        console.log("📄 Extracted Metadata:", metadata);
        console.log("📜 Clean MDX Content:", content);

        setBlog({
          title: metadata?.title || "No Title Found",
          description: metadata?.description || "No description available",
          category: metadata?.category || "Uncategorized",
          published:
            metadata?.published || response.data.published || "Unknown",
        });

        // ✅ Compile the cleaned MDX content (Lazy Evaluation)
        setTimeout(async () => {
          try {
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
              throw new Error(
                "❌ Compiled MDX is not a valid React component."
              );
            }
          } catch (err) {
            console.error("❌ Error compiling MDX:", err);
            setError("Failed to render blog content.");
          }
        }, 200); // Small delay to prevent hydration errors
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

  // ✅ Prevents rendering errors
  if (loading)
    return <p className="text-gray-500 text-center mt-6">Loading...</p>;
  if (error) return <p className="text-red-500 text-center mt-6">{error}</p>;
  if (!blog)
    return <p className="text-gray-500 text-center mt-6">No blog found.</p>;

  return (
    <div
      className="max-w-2xl mx-auto px-6 sm:px-8 md:px-10 py-10 bg-white shadow-lg rounded-lg"
      style={{ fontFamily: "'Inter', sans-serif" }} // ✅ Google Font
    >
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{blog.title}</h1>
      <p className="text-gray-600 mb-2">
        <strong>Published on:</strong>{" "}
        {blog.published
          ? new Date(blog.published).toLocaleDateString()
          : "Unknown"}
      </p>
      <p className="text-gray-600 mb-6">
        <strong>Description:</strong> {blog.description}
      </p>

      {/* ✅ Better Content Styling */}
      <div className="prose prose-lg prose-blue max-w-none text-gray-900 leading-relaxed">
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
