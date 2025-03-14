import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoadingBlogs, setIsLoadingBlogs] = useState(true);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [errorBlogs, setErrorBlogs] = useState(null);
  const [errorCategories, setErrorCategories] = useState(null);

  // ✅ Fetch latest blogs from API
  useEffect(() => {
    setIsLoadingBlogs(true);
    setErrorBlogs(null);

    fetch("http://localhost:5000/api/blogs")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch blogs");
        }
        return res.json();
      })
      .then((data) => {
        setBlogs(data);
        setIsLoadingBlogs(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching blogs:", err);
        setErrorBlogs("Failed to load blogs. Please try again later.");
        setIsLoadingBlogs(false);
      });
  }, []);

  // ✅ Fetch categories dynamically from API
  useEffect(() => {
    setIsLoadingCategories(true);
    setErrorCategories(null);

    fetch("http://localhost:5000/api/blogs/categories")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }
        return res.json();
      })
      .then((data) => {
        setCategories(data);
        setIsLoadingCategories(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching categories:", err);
        setErrorCategories(
          "Failed to load categories. Please try again later."
        );
        setIsLoadingCategories(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ✅ Hero Section */}
      <section className="w-full flex flex-col items-center justify-center text-center py-12 bg-gradient-to-r from-blue-500 to-purple-400 text-white">
        <h1 className="text-5xl font-bold mb-3">Welcome To My Blog App</h1>
        <p className="text-lg mb-4 max-w-2xl mx-auto leading-loose">
          Read blogs about Data Structures, Operating Systems, Databases, and
          Tech.
        </p>
        <Link to="/create">
          <button className="mt-4 bg-white text-red-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-200 hover:scale-105 transition-transform duration-200">
            Create a Blog
          </button>
        </Link>
      </section>

      {/* ✅ Layout: Show Categories on Left, Blogs on Right */}
      <div className="max-w-6xl mx-auto p-6 flex flex-col md:flex-row gap-8">
        {/* Left Side - Categories */}
        <div className="md:w-1/3 bg-white shadow-md p-4 rounded-lg">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Categories</h2>

          {isLoadingCategories ? (
            <p className="text-gray-500">Loading categories...</p>
          ) : errorCategories ? (
            <p className="text-red-500">{errorCategories}</p>
          ) : categories.length > 0 ? (
            <ul className="text-left">
              {categories.map((category) => (
                <li key={category} className="mb-2">
                  <Link
                    to={`/category/${category}`}
                    className="text-blue-500 hover:underline"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No categories available.</p>
          )}
        </div>

        {/* Right Side - Latest Blogs */}
        {/* Right Side - Latest Blogs */}
        <div className="md:w-2/3 bg-white shadow-md p-4 rounded-lg">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">
            Latest Blogs
          </h2>

          {isLoadingBlogs ? (
            <p className="text-gray-500">Loading blogs...</p>
          ) : errorBlogs ? (
            <p className="text-red-500">{errorBlogs}</p>
          ) : blogs.length > 0 ? (
            <ul className="text-right">
              {blogs.slice(0, 5).map(
                (
                  blog // ✅ Limits the latest blogs to 5
                ) => (
                  <li key={blog._id} className="mb-2">
                    <Link
                      to={`/blog/${blog.slug}`}
                      className="text-blue-500 hover:underline"
                    >
                      {blog.title}
                    </Link>
                  </li>
                )
              )}
            </ul>
          ) : (
            <p className="text-gray-500">No blogs available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;












// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// const Home = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [categories, setCategories] = useState([]);

//   // ✅ Fetch latest blogs from API
//   useEffect(() => {
//     fetch("http://localhost:5000/api/blogs")
//       .then((res) => res.json())
//       .then((data) => setBlogs(data))
//       .catch((err) => console.error("Error fetching blogs:", err));
//   }, []);

//   // ✅ Fetch categories dynamically from API
//   useEffect(() => {
//     fetch("http://localhost:5000/api/blogs/categories")
//       .then((res) => res.json())
//       .then((data) => setCategories(data))
//       .catch((err) => console.error("Error fetching categories:", err));
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* ✅ Hero Section */}
//       <section className="w-full flex flex-col items-center justify-center text-center py-12 bg-gradient-to-r from-blue-500 to-purple-400 text-white">
//         <h1 className="text-5xl font-bold mb-3">Welcome To My Blog App</h1>
//         <p className="text-lg mb-4 max-w-2xl mx-auto leading-loose">
//           Read blogs about Data Structures, Operating Systems, Databases, and Tech.
//         </p>
//         <Link to="/create">
//           <button className="mt-4 bg-white text-red-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-200 hover:scale-105 transition-transform duration-200">
//             Create a Blog
//           </button>
//         </Link>
//       </section>

//       {/* ✅ Layout: Show Categories on Left, Blogs on Right */}
//       <div className="max-w-6xl mx-auto p-6 flex flex-col md:flex-row gap-8">
//         {/* Left Side - Categories */}
//         <div className="md:w-1/3 bg-white shadow-md p-4 rounded-lg">
//           <h2 className="text-2xl font-bold text-blue-600 mb-4">Categories</h2>
//           <ul className="text-left">
//             {categories.length > 0 ? (
//               categories.map((category) => (
//                 <li key={category} className="mb-2">
//                   <Link to={`/category/${category}`} className="text-blue-500 hover:underline">
//                     {category}
//                   </Link>
//                 </li>
//               ))
//             ) : (
//               <p className="text-gray-500">No categories available.</p>
//             )}
//           </ul>
//         </div>

//         {/* Right Side - Latest Blogs */}
//         <div className="md:w-2/3 bg-white shadow-md p-4 rounded-lg">
//           <h2 className="text-2xl font-bold text-blue-600 mb-4">Latest Blogs</h2>
//           <ul className="text-right">
//             {blogs.length > 0 ? (
//               blogs.map((blog) => (
//                 <li key={blog._id} className="mb-2">
//                   <Link to={`/blog/${blog.slug}`} className="text-blue-500 hover:underline">
//                     {blog.title}
//                   </Link>
//                 </li>
//               ))
//             ) : (
//               <p className="text-gray-500">No blogs available.</p>
//             )}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;
