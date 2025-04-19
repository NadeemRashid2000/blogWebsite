import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../UserContext"; // Import the custom hook

const Header = () => {
  const { user, logout } = useUser(); // Use the custom hook to get user and logout
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call the logout function from the context
    navigate("/"); // Redirect to homepage after logout
  };

  return (
    <header className="bg-purple-500 text-white py-4">
      {/* <div className="container mx-auto flex justify-between items-center"> */}
      <div className="w-full px-4 flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold">
          My Blog
        </Link>
        <nav className="flex items-center">
          <Link to="/about" className="mr-4">
            About
          </Link>
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
