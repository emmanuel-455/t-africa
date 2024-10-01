import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../utils/api'; // Import your fetchProducts function
import CateIcon from "../assets/hugeicons.svg";
import { Link } from 'react-router-dom';
import Help from "../assets/questionIcon.svg";

function Category() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [categories, setCategories] = useState([]); // State to store fetched categories
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch categories when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const products = await fetchProducts(1); // Fetch products from API (page 1)
        const fetchedCategories = products.map(product => product.category); // Assuming category is part of product
        setCategories([...new Set(fetchedCategories)]); // Set unique categories
        setLoading(false); // Loading is done
      } catch (err) {
        setError('Failed to fetch categories');
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='flex lg:flex hidden lg:block justify-between px-[100px] pb-[16px] bg-white'>
      {/* Dropdown Button */}
      <div className='relative'>
        <button
          id="dropdownHoverButton"
          onMouseEnter={() => setIsDropdownOpen(true)} 
          onMouseLeave={() => setIsDropdownOpen(false)}
          className="font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center"
        >
          <img src={CateIcon} alt="categories icon" className="mr-2" />
          All Categories
          <svg className="w-2.5 h-2.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div 
            id="dropdownHover" 
            className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <ul className="py-2 text-sm text-gray-700">
              {categories.map((category, index) => (
                <li key={index}>
                  <Link to={`/search?query=${category}`} className="block px-4 py-2 hover:bg-gray-100">
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Help & Sell Button */}
      <div className='flex gap-[10px]'>
        <div className='font-medium py-[6px] px-[10px] rounded-[10px] flex bg-[#EFF0F2]'>
          <img src={Help} alt="help icon" />
          <p className='text-sm ml-[8px]'>Help</p>
        </div>
        <Link className='bg-brandGreen py-[6px] px-[10px] rounded-[10px] font-medium text-white text-sm'>
          Sell on T-Africa
        </Link>
      </div>
    </div>
  );
}

export default Category;
