
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../pages/api";


const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetch(`${API_BASE_URL}/blogs/categories`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }
        return res.json();
      })
      .then((data) => {
        setCategories(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching categories:", err);
        setError("Failed to load categories. Please try again later.");
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">Blog Categories</h1>

      {isLoading && <p className="text-gray-500">Loading categories...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!isLoading && categories.length === 0 && !error && (
        <p className="text-gray-600">No categories found.</p>
      )}

      {categories.length > 0 && (
        <div className="space-y-3">
          {categories.map((category) => (
            <h2 key={category} className="text-2xl font-semibold text-blue-600">
              <Link to={`/category/${category}`} className="hover:underline">
                {category}
              </Link>
            </h2>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;



