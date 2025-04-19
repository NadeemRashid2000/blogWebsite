import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateBlog from "./pages/CreateBlog";
import BlogDetails from "./pages/BlogDetails";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./pages/About";
import { UserProvider } from "./UserContext";
import CategoryBlogs from "./pages/CategoryBlogs";

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="bg-gray-100 min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/create" element={<CreateBlog />} />
              <Route path="/blogs/slug/:slug" element={<BlogDetails />} />
              <Route
                path="/category/:categoryName"
                element={<CategoryBlogs />}
              />
              <Route path="/about" element={<About />} />{" "}
            </Routes>
          </main>
          <Footer /> 
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
