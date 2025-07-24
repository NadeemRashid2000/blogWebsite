import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";
import { loginUser } from "../api"; //  Only import loginUser now

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(username, password); //  Using central function
      if (data.token) {
        login(data.token);         // Store in context
        navigate("/");             // Redirect after login
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert(error.message);       // Show full message from api.js
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-md sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-purple-400 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-2xl font-semibold text-gray-700 text-center">
            Admin Login
          </h1>
          <form onSubmit={handleSubmit} className="mt-6">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Username:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mt-6">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                type="submit"
              >
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

