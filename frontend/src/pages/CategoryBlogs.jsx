// import { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";

// const CategoryBlogs = () => {
//   const { category } = useParams();
//   const [blogs, setBlogs] = useState([]);

//   useEffect(() => {
//     fetch(`http://localhost:5000/api/blogs/category/${category}`) // ✅ Ensure this matches backend
//       .then((res) => res.json())
//       .then((data) => {
//         if (Array.isArray(data)) {
//           setBlogs(data);
//         } else if (data.blogs) {
//           setBlogs(data.blogs); // ✅ Handle response if wrapped in an object
//         } else {
//           setBlogs([]); // ✅ Fallback for empty responses
//         }
//       })
//       .catch((err) => console.error("Error fetching blogs:", err));
//   }, [category]);

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <h1 className="text-4xl font-bold text-blue-700">{category} Blogs</h1>
//       {blogs.length === 0 ? (
//         <p className="text-gray-500">No blogs found in this category.</p>
//       ) : (
//         blogs.map((blog) => (
//           <div key={blog.slug} className="my-4">
//             <h2 className="text-2xl font-semibold text-blue-500">
//               <Link to={`/blog/${blog.slug}`} className="hover:underline">
//                 {blog.title}
//               </Link>
//             </h2>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default CategoryBlogs;


import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const CategoryBlogs = () => {
  const { category } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetch(`http://localhost:5000/api/blogs/category/${category}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch blogs: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("✅ Fetched blogs data:", data);
        if (Array.isArray(data)) {
          setBlogs(data);
        } else {
          setBlogs([]);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching blogs:", err);
        setError("Failed to load blogs. Please try again later.");
        setIsLoading(false);
      });
  }, [category]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-blue-700">{category} Blogs</h1>

      {isLoading && <p className="text-gray-500">Loading blogs...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!isLoading && blogs.length === 0 && !error && (
        <p className="text-gray-500">No blogs found in this category.</p>
      )}

      {blogs.length > 0 && (
        <div className="space-y-4">
          {blogs.map((blog) => (
            <div key={blog._id} className="my-4">
              <h2 className="text-2xl font-semibold text-blue-500">
                <Link to={`/blog/${blog.slug}`} className="hover:underline">
                  {blog.title}
                </Link>
              </h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryBlogs;
