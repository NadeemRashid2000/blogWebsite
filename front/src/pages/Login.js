import React, { useState, useContext } from "react";
import { loginUser } from "../api/authApi";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({ email, password });

      if (res?.data?.token && res?.data?.role) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role); // Store role in localStorage
        setUser({ token: res.data.token, role: res.data.role }); // Save role in context

        navigate("/"); // Redirect to home
      } else {
        alert("Login failed! Invalid credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed! Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full p-2 border"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full p-2 border"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="bg-green-500 text-white p-2 w-full">Login</button>
      </form>
    </div>
  );
};

export default Login;
