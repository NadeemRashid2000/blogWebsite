import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login"; // Import Login
import CreateBlog from "./pages/CreateBlog";
import BlogDetailsPage from "./pages/BlogDetails";
import CategoryBlogs from "./pages/CategoryBlogs";
import AdminRoute from "./components/AdminRoute";
import { UserProvider } from "./UserContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./pages/About";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin/login" element={<Login />} />{" "}
              {/* Changed Route */}
              <Route
                path="/create"
                element={
                  <AdminRoute>
                    <CreateBlog />
                  </AdminRoute>
                }
              />
              <Route path="/blogs/slug/:slug" element={<BlogDetailsPage />} />
              <Route
                path="/category/:categoryName"
                element={<CategoryBlogs />}
              />
              <Route path="/about" element={<About />} />
              <Route path="*" element={() => <div>Not Found</div>} />{" "}
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </UserProvider>
  );
};

export default App;
