const API_BASE_URL = "http://localhost:5000/api"; 

//  Fetch all blogs
export const fetchBlogs = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs`);
    if (!response.ok) throw new Error("Failed to fetch blogs");
    return await response.json();
  } catch (err) {
    console.error("Error fetching blogs:", err);
    return [];
  }
};

//  Fetch blog by slug
export const fetchBlogBySlug = async (slug) => {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs/slug/${slug}`);
    if (!response.ok) throw new Error("Failed to fetch blog");
    return await response.json();
  } catch (err) {
    console.error("Error fetching blog:", err);
    return null;
  }
};

//  Create a blog (no frontmatter required)
export const createBlog = async (blogData) => {
  try {
    console.log("📤 Sending blog data:", blogData);

    const response = await fetch(`${API_BASE_URL}/blogs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blogData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Backend response:", errorText);
      throw new Error("Failed to create blog");
    }

    const created = await response.json();
    console.log(" Blog created:", created);
    return created;
  } catch (err) {
    console.error("Error creating blog:", err);
    return null;
  }
};

//  Delete blog by slug
export const deleteBlog = async (slug) => {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs/slug/${slug}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Failed to delete blog");
    return true;
  } catch (err) {
    console.error("Error deleting blog:", err);
    return false;
  }
};
