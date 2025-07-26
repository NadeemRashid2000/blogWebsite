export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// console.log(" API_BASE_URL in use:", API_BASE_URL);  //  Debug log

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
    // console.log("📤 Sending blog data:", blogData);

    const response = await fetch(`${API_BASE_URL}/blogs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blogData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(" Backend response:", errorText);
      throw new Error("Failed to create blog");
    }

    const created = await response.json();
    // console.log(" Blog created:", created);
    return created;
  } catch (err) {
    console.error("Error creating blog:", err);
    throw err;
    return null;
  }
};

// Updated: deleteBlog with auth token
export const deleteBlog = async (slug, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs/slug/${slug}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Failed to delete blog");
    return true;
  } catch (err) {
    console.error("Error deleting blog:", err);
    return false;
  }
};

// Fetch Blogs by Category
export const fetchBlogByCategory = async (category) => {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs/category/${category}`);
    if (!response.ok) throw new Error("Failed to fetch blogs by Cateogry");
    return await response.json();
  } catch (err) {
    console.error("Error fetching blogs by category: ", err);
    return [];
  }
};

//Fetch all blog categories
export const fetchBlogByCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs/categories`);
    if (!response.ok) throw new Error("Failed to fetch categories");
    return await response.json();
  } catch (err) {
    console.error("Error fetching categories: ", err);
    return [];
  }
};

// Login
export const loginUser = async (username, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    let errorMessage = `Login failed: ${response.status}`;
    try {
      const errorData = await response.json();
      errorMessage += ` - ${errorData.message || "No details provided"}`;
    } catch (err) {
      console.error("Error parsing login error response:", err);
    }
    throw new Error(errorMessage);
  }

  return await response.json();
};

// Create Blog with auth
export const createBlogWithAuth = async (blogData, token) => {
  try {
    // console.log("Sending Blog data with auth: ", blogData);

    const response = await fetch(`${API_BASE_URL}/blogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(blogData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Backend response: ", errorText);
      throw new Error("Failed to create Blog");
    }

    const created = await response.json();
    // console.log("Blog created: ", created);
    return created;
  } catch (err) {
    console.error("Error in createBlogWithAuth", err);
    return null;
  }
};
