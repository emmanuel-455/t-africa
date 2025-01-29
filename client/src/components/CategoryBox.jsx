  import { useState, useEffect } from 'react';
  import { Link } from 'react-router-dom';

  // Assuming fetchProducts is an API call function to get the products
  import { fetchProducts } from '../utils/api'; 

  const CategoryBox = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null); // Error state

    // Fetch categories when the component mounts
    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const products = await fetchProducts(1); // Fetch products from API (page 1)
          const fetchedCategories = products.map(product => product.category); // Assuming category is part of product
          setCategories([...new Set(fetchedCategories)]); // Set unique categories
        } catch (err) {
          setError('Failed to fetch categories', err);
        }
      };

      fetchCategories();
    }, []);

    if (error) return <p>{error}</p>;


    return (
      <div className="grid grid-cols-4 mb-10 sm:grid-cols-3 md:grid-cols-4 gap-1 p-2">
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <Link to={`/search?query=${category}`}
              key={index} 
              className="cursor-pointer rounded-lg flex flex-col items-center transition-all" 
              
            >
              <img 
                src={`https://images.unsplash.com/photo-1624823183493-ed5832f48f18?q=80&w=2429&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`} // Assuming category images are stored with the same name as the category
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/150"; // Fallback placeholder image
                }}
                alt={category}
                className="w-[90%] rounded-xl object-cover mb-2"
              />
              <p className="text-center text-sm font-medium md:text-[17px]">{category}</p>
            </Link>
          ))
        ) : (
            null
        )}
      </div>
    );
  }

  export default CategoryBox;
