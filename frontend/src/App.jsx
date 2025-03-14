// import React from "react";
// import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import Home from "./pages/Home";
// import BlogDetails from "./pages/BlogDetails";
// import CreateBlog from "./pages/CreateBlog";
// import About from "./pages/About";
// import "highlight.js/styles/github.css"; // Or use another theme


// const App = () => {
//   return (  
//     <Router>
//       <div className="min-h-screen flex flex-col">
//         <Header />

//         <main className="flex-1 p-5">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/blog/:slug" element={<BlogDetails />} />
//             <Route path="/create" element={<CreateBlog />} />
//             <Route path="/about" element={<About />} />
//           </Routes>
//         </main>

//         <Footer />
//       </div>
//     </Router>
//   );
// };

// export default App;



import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import BlogDetails from "./pages/BlogDetails";
import CreateBlog from "./pages/CreateBlog";
import About from "./pages/About";
import CategoriesPage from "./pages/CategoriesPage";
import CategoryBlogs from "./pages/CategoryBlogs";
import "highlight.js/styles/github.css"; // Or use another theme

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 p-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog/:slug" element={<BlogDetails />} />
            <Route path="/create" element={<CreateBlog />} />
            <Route path="/about" element={<About />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/category/:category" element={<CategoryBlogs />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
