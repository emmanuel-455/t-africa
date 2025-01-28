import { useState, useEffect } from 'react';
import { fetchProducts } from '../utils/api'; // Ensure this function is correctly implemented
import CateIcon from "../assets/hugeicons.svg";
import { Link } from 'react-router-dom';
import Help from "../assets/questionIcon.svg";

function Category() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [categories, setCategories] = useState([]); // State to store fetched categories
  const [error, setError] = useState(null); // Error state

  // Fetch categories when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const products = await fetchProducts(1); // Fetch products from API (page 1)
        if (products && Array.isArray(products)) {
          const fetchedCategories = products.map((product) => product.category);
          setCategories([...new Set(fetchedCategories)]); // Set unique categories
        } else {
          throw new Error("Invalid data received from API");
        }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch categories');
      }
    };

    fetchCategories();
  }, []);

  const handleToggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev); // Toggle the dropdown state
  };

  const handleCategoryClick = () => {
    setIsDropdownOpen(false); // Close the dropdown when a category is clicked
  };

  if (error) {
    return <p className="text-red-500">{error}</p>; // Display error if fetching fails
  }

  return (
    <div className="flex flex-nowrap flex-row items-center justify-between px-2 md:px-4 py-3 rounded-lg bg-white shadow-md">
      {/* All Categories Dropdown */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
        <div className="relative">
          <button
            id="dropdownHoverButton"
            onClick={handleToggleDropdown}
            className="font-medium rounded-lg text-xs md:text-sm py-2.5 flex items-center"
          >
            <img src={CateIcon} alt="categories icon" className="mr-2" />
            All Categories
            <svg
              className="w-3 h-3 ml-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
              aria-hidden="true"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1l4 4 4-4"
              />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div
              id="dropdownHover"
              className="absolute z-10 bg-white w-[300px] divide-y divide-gray-100 rounded-lg shadow mt-2"
            >
              <ul className="py-2 text-sm text-gray-700">
                {categories.length > 0 ? (
                  categories.map((category, index) => (
                    <li key={index}>
                      <Link
                        to={`/search?query=${category}`}
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={handleCategoryClick}
                      >
                        {category}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-gray-500">No categories available</li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* All Categories List */}
        <div className="flex hidden lg:block flex-wrap gap-4">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={`/search?query=${category}`}
              className="text-sm bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg"
            >
              {category}
            </Link>
          ))}
        </div>
      </div>

      {/* Help & Sell Button */}
      <div className="flex items-center gap-1  lg:mt-0">
        <div className="font-medium py-2 px-1 md:px-3 rounded-lg flex items-center bg-gray-100">
          <img src={Help} alt="help icon" className="mr-1" />
          <p className="text-xs md:text-sm">Help</p>
        </div>
        <Link
          to="/sell"
          className="bg-brandGreen py-2 px-2 md:px-4 rounded-lg font-medium text-white md:text-sm text-xs"
        >
          Sell on T-Africa
        </Link>
      </div>
    </div>
  );
}

export default Category;
