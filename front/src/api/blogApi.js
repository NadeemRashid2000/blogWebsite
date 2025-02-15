import axios from "axios";

const API_URL = "http://localhost:5000/api/blogs";

export const getAllBlogs = async () => {
  return axios.get(API_URL);
};

export const getSingleBlog = async (id) => {
  return axios.get(`${API_URL}/${id}`);
};

export const createBlog = async (blogData, token) => {
  return axios.post(API_URL, blogData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
