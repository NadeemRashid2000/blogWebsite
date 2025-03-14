



// const API_BASE_URL = "http://localhost:5000/api"; // ✅ Backend URL

// // ✅ Fetch all blogs
// export const fetchBlogs = async () => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/blogs`);
//     if (!response.ok) throw new Error("Failed to fetch blogs");
//     return await response.json();
//   } catch (error) {
//     console.error("❌ Error fetching blogs:", error);
//     return [];
//   }
// };

// // ✅ Fetch a single blog by slug
// export const fetchBlogBySlug = async (slug) => {
//   try {
//     console.log(`🔍 Fetching blog for slug: ${slug}`);

//     // ✅ Fixed incorrect API endpoint
//     const response = await fetch(`${API_BASE_URL}/blogs/slug/${slug}`);

//     console.log("Response status:", response.status);
//     console.log("Response headers:", response.headers.get("content-type"));

//     const text = await response.text();
//     console.log("📜 Raw response text:", text);

//     // ✅ Ensure the response is JSON before parsing
//     if (
//       !response.ok ||
//       !response.headers.get("content-type")?.includes("application/json")
//     ) {
//       throw new Error(`❌ Invalid response format. Received: ${text}`);
//     }

//     const blogData = JSON.parse(text);
//     console.log(`✅ Successfully fetched blog: ${blogData.title}`);

//     // ✅ Fix Encoding Issues (Prevent HTML Interpretation in MDX)
//     blogData.content = blogData.content
//       .replace(/&/g, "&amp;")
//       .replace(/</g, "&lt;")
//       .replace(/>/g, "&gt;");

//     return blogData;
//   } catch (error) {
//     console.error(`❌ Error fetching blog "${slug}":`, error);
//     return null;
//   }
// };

// // ✅ Create a new blog (Ensures MDX content is properly sent)
// export const createBlog = async (blogData) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/blogs`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         ...blogData,
//         //! content: encodeURIComponent(blogData.content), // 🔹 Removed this
//         content: blogData.content, // ✅ Send as raw MDX
//       }),
//     });

//     if (!response.ok) throw new Error("❌ Failed to create blog");
//     return await response.json();
//   } catch (error) {
//     console.error("❌ Error creating blog:", error);
//     return null;
//   }
// };



const API_BASE_URL = "http://localhost:5000/api"; // ✅ Backend URL

// ✅ Fetch all blogs
export const fetchBlogs = async () => {
  try {
    console.log("🔄 Fetching all blogs...");
    const response = await fetch(`${API_BASE_URL}/blogs`);

    if (!response.ok)
      throw new Error(`Failed to fetch blogs: ${response.statusText}`);

    const blogs = await response.json();
    console.log(`✅ Successfully fetched ${blogs.length} blogs.`);
    return blogs;
  } catch (error) {
    console.error("❌ Error fetching blogs:", error);
    return [];
  }
};

// ✅ Fetch a single blog by slug
export const fetchBlogBySlug = async (slug) => {
  try {
    console.log(`🔍 Fetching blog for slug: ${slug}`);

    // ✅ Ensure correct API endpoint format
    const response = await fetch(`${API_BASE_URL}/blogs/slug/${slug}`);

    console.log("Response status:", response.status);
    console.log("Response headers:", response.headers.get("content-type"));

    const text = await response.text();
    console.log("📜 Raw response text:", text);

    // ✅ Ensure response is JSON before parsing
    if (
      !response.ok ||
      !response.headers.get("content-type")?.includes("application/json")
    ) {
      throw new Error(`❌ Invalid response format. Received: ${text}`);
    }

    const blogData = JSON.parse(text);
    console.log(`✅ Successfully fetched blog: ${blogData.title}`);

    return blogData;
  } catch (error) {
    console.error(`❌ Error fetching blog "${slug}":`, error);
    return null;
  }
};

// ✅ Create a new blog (Ensures MDX content is properly sent)
export const createBlog = async (blogData) => {
  try {
    console.log(`📝 Creating a new blog: ${blogData.title}`);

    const response = await fetch(`${API_BASE_URL}/blogs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blogData), // ✅ Send as raw JSON
    });

    if (!response.ok)
      throw new Error(`❌ Failed to create blog: ${response.statusText}`);

    const newBlog = await response.json();
    console.log(`✅ Blog created successfully: ${newBlog.title}`);
    return newBlog;
  } catch (error) {
    console.error("❌ Error creating blog:", error);
    return null;
  }
};
