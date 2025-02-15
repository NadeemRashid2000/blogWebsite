import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/Navbar.css"; // Importing CSS file

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <nav className="navbar">
      <h1 className="logo">Blog App</h1>
      <div className="nav-links">
        <Link to="/" className="nav-link">
          Home
        </Link>

        {/* Only show "Create Blog" if user is an admin */}
        {user?.role === "admin" && (
          <Link to="/create" className="nav-link">
            Create Blog
          </Link>
        )}

        {user ? (
          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
