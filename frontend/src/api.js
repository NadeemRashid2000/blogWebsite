
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


// Delete blog
// ✅ Delete a blog by slug
export const deleteBlog = async (slug) => {
  try {
    console.log(`🗑 Deleting blog: ${slug}`);

    const response = await fetch(`${API_BASE_URL}/blogs/slug/${slug}`, {
      method: "DELETE",
    });

    if (!response.ok)
      throw new Error(`❌ Failed to delete blog: ${response.statusText}`);

    console.log(`✅ Blog deleted successfully: ${slug}`);
    return true; // ✅ Return true if deletion was successful
  } catch (error) {
    console.error(`❌ Error deleting blog "${slug}":`, error);
    return false; // ❌ Return false if deletion failed
  }
};
