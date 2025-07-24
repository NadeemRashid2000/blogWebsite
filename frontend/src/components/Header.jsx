import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";

const Header = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="  bg-zinc-700 ">

      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-2 p-3">

        {/* === Left Side: Logo and Title === */}
        <Link to="/" className="flex items-center space-x-3 ">

          {/* Blog title text next to the logo */}
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white hover:text-blue-700">
            My Blog
          </span>
        </Link>

        {/* Mobile Menu Toggle Button  */}
        <button
          onClick={() => setIsOpen(!isOpen)} // Toggle open/close state for mobile nav
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center rounded-lg md:hidden  focus:outline-none focus:ring-2  text-gray-400 focus:ring-gray-200"
        >
          <span className="sr-only">Open main menu</span>
          {/* Hamburger icon (3 horizontal lines) */}
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <div className={`${isOpen ? "block" : "hidden"} w-full md:block md:w-auto`}>
          <ul className="flex flex-col md:flex-row gap-6 mt-4 md:mt-0 text-xl">
            <li>
              <Link
                to="/about"
                className="block py-2 px-3 font-semibold text-white hover:text-blue-500"
              >
                About
              </Link>
            </li>

            {user?.role === "admin" && (
              <li>
                <Link
                  to="/create"
                  className="block py-2 px-3 font-semibold text-green-400 hover:text-green-300"
                >
                  Create Blog
                </Link>
              </li>
            )}

            {user && (
              <li>
                <button
                  onClick={handleLogout}
                  className="block py-2 px-3 font-semibold text-red-400 hover:text-red-300"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>

    </nav>
  );

};

export default Header;


