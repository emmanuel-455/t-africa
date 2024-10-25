import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../utils/api';  // Import the fetchProducts API function
import { Link } from 'react-router-dom';  // Import Link for navigation

const NewArrival = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to shuffle an array
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const newProducts = await fetchProducts(1);  // Fetch the first page of products
        const shuffledProducts = shuffleArray(newProducts);  // Shuffle the fetched products
        setProducts(shuffledProducts);
        setLoading(false);
      } catch (err) {
        setError('Failed to load new arrivals.');
        setLoading(false);
      }
    };

    fetchNewArrivals();
  }, []);

  if (loading) {
    return null;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="px-2 lg:pl-[100px] mb-[2rem]">
      <h2 className="text-lg pl-3 rounded-sm py-1 font-bold bg-[#E6F9F0] text-black mb-2">New Arrivals</h2>
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
              <p className="text-xs text-gray-500">{product.stock} items left</p> {/* Adjust the stock data */}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NewArrival;
