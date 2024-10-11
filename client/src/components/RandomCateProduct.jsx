import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../utils/api';  // Import the fetchProducts API function
import { Link } from 'react-router-dom';  // Import Link for navigation

const RandomCateProduct = () => {
  const [products, setProducts] = useState([]);
  const [randomCategory, setRandomCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRandomCategoryProducts = async () => {
      try {
        // Fetch all products (you can adjust the page limit if needed)
        const allProducts = await fetchProducts(1); 

        // Get unique categories from the fetched products
        const categories = [...new Set(allProducts.map(product => product.category))];
        
        // Select a random category
        const randomCat = categories[Math.floor(Math.random() * categories.length)];
        setRandomCategory(randomCat);

        // Filter products based on the randomly selected category
        const filteredProducts = allProducts.filter(product => product.category === randomCat);
        setProducts(filteredProducts);
        setLoading(false);
      } catch (err) {
        setError('Failed to load products.');
        setLoading(false);
      }
    };

    fetchRandomCategoryProducts();
  }, []);

  if (loading) {
    return null;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="px-2 mb-16">
      <h2 className="text-lg pl-3 rounded-sm py-1 font-bold bg-[#E6F9F0] text-black mb-2">
        {randomCategory ? `${randomCategory}` : 'Random Category Products'}
      </h2>
      {/* Horizontal scroll container for mobile */}
      <div className="flex space-x-4 overflow-x-auto">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}  // Create a dynamic link to ProductDetails
            className="w-[150px] bg-white flex flex-col flex-shrink-0 px-4 rounded-md"
          >
            {/* Product image */}
            <div className='flex items-center justify-center'>
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-[90px] object-cover rounded-md my-2"
              />
            </div>
            {/* Product details */}
            <h3 className="text-sm font-medium">{product.title}</h3>
            <div className='flex flex-col justify-between pb-1'>
              <p className="text-base text-black font-bold mt-1">₦{product.price}</p>
              {/* Display stock (items left) */}
              <p className="text-xs text-gray-500">{product.stock} items left</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RandomCateProduct;
