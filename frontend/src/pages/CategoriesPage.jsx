import React from "react";

const categories = ["Others", "OS", "DSA", "Web development", "Tech"];

const CategoriesPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-6 text-violet-700 text-center">
        Browse Categories
      </h2>
      <ul className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 justify-items-center">
        {categories.map((category) => (
          <li
            key={category}
            className="bg-violet-100 text-violet-700 px-6 py-3 rounded-full font-medium hover:bg-violet-200 cursor-pointer"
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesPage;
