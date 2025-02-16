import axios from "axios";

const API_URL = "http://localhost:5000/api/blogs";

export const getAllBlogs = async () => {
  return axios.get(API_URL);
};

export const getSingleBlog = async (id, token) => {
  return axios.get(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createBlog = async (blogData, token) => {
  return axios.post(API_URL, blogData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
