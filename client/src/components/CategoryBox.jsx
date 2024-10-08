import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Assuming fetchProducts is an API call function to get the products
import { fetchProducts } from '../utils/api'; 

const CategoryBox = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();

  // Fetch categories when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const products = await fetchProducts(1); // Fetch products from API (page 1)
        const fetchedCategories = products.map(product => product.category); // Assuming category is part of product
        setCategories([...new Set(fetchedCategories)]); // Set unique categories
      } catch (err) {
        setError('Failed to fetch categories');
      }
    };

    fetchCategories();
  }, []);

  if (error) return <p>{error}</p>;

  // Handle category click to navigate to search result
  const handleCategoryClick = (category) => {
    navigate(`/search?category=${category}`);
  };

  return (
    <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
      {categories.length > 0 ? (
        categories.map((category, index) => (
          <div 
            key={index} 
            className="cursor-pointer rounded-lg border p-4 flex flex-col items-center hover:bg-gray-100 transition-all" 
            onClick={() => handleCategoryClick(category)}
          >
            <img 
              src={`https://source.unsplash.com/random/150x150?${category}`} // Assuming category images are stored with the same name as the category
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/150"; // Fallback placeholder image
              }}
              alt={category}
              className="w-16 h-16 object-cover mb-2"
            />
            <p className="text-center font-semibold">{category}</p>
          </div>
        ))
      ) : (
        <p>Loading categories...</p>
      )}
    </div>
  );
}

export default CategoryBox;
