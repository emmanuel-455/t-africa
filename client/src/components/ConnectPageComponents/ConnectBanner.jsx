import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Left from "../../assets/left.png";
import Right from "../../assets/right.png";
import SearchIcon from "../../assets/connectSearch.svg"; // Import search icon as an image

function ConnectBanner() {
  const [searchQuery, setSearchQuery] = useState(''); // State to manage search input
  const navigate = useNavigate(); // React Router's hook for navigation

  // Handle input change
  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Handle search submit (on Enter key press or button click)
  const handleSearchSubmit = (event) => {
    if (event.key === 'Enter' || event.type === 'click') {
      // Navigate to search results page with searchQuery as a URL parameter
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className='flex flex-col md:flex-row h-screen'>
      
      {/* Left Section */}
      <div
        className='w-full md:w-1/2 h-[60%] md:h-screen bg-cover bg-center'
        style={{ backgroundImage: `url(${Left})` }}
      >
        <div className='w-full md:w-[513px] gap-[24px] pt-[25%] px-4 md:px-16 flex flex-col'>
          <h1 className='text-[32px] md:text-[57px] font-[500] leading-[36px] md:leading-[58px] text-white'>
            Connect with reliable Nigerian exporters
          </h1>
          <p className='text-sm md:text-lg leading-[20px] md:leading-[24px] text-white mb-4'>
            Search and connect with top Nigerian exporters and manufacturers. Explore a wide range of high-quality products.
          </p>
          <div className="relative gap-2 w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              onKeyDown={handleSearchSubmit}
              placeholder="Search"
              className="w-full py-2 md:py-3 pl-10 font-500 pr-4 rounded-[8px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <img
              src={SearchIcon}
              alt="Search Icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400 cursor-pointer"
              onClick={handleSearchSubmit}
            />
          </div>
        </div>
      </div>

      {/* Right Section (Only visible on larger screens) */}
      <div
        className='hidden md:block w-full md:w-1/2 h-full bg-cover bg-center'
        style={{ backgroundImage: `url(${Right})` }}
      />
    </div>
  );
}

export default ConnectBanner;
