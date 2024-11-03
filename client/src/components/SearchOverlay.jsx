import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '../assets/SearchNav.svg';
import CloseIcon from "../assets/closeIcon.svg";

const SearchOverlay = ({ closeOverlay }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const navigate = useNavigate();

  // Check if the device is mobile
  const isMobile = window.innerWidth < 768; // Adjust the breakpoint as needed

  useEffect(() => {
    // Retrieve search history from localStorage
    const history = localStorage.getItem('searchHistory');
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
  }, []);

  // Handle search action
  const handleSearch = () => {
    if (searchTerm.trim()) {
      // Save search to localStorage
      const updatedHistory = [...searchHistory, searchTerm];
      localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));

      // Redirect to search results page
      navigate(`/search?query=${searchTerm}`);
      closeOverlay(); // Close the overlay
    }
  };

  // Handle search on Enter key press
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Remove a specific search term from history
  const handleRemoveSearchTerm = (termToRemove) => {
    const updatedHistory = searchHistory.filter(term => term !== termToRemove);
    setSearchHistory(updatedHistory);
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory)); // Update localStorage
  };

  // Prevent the overlay from rendering on desktop
  if (!isMobile) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col items-center p-4">
      <div className="flex justify-between items-center w-full">
        <h2 className="text-xl font-bold">Search</h2>
        <button onClick={closeOverlay} className='font-extrabold text-xl'>
          <img src={CloseIcon} alt="Close" className="w-6 h-6" />
        </button>
      </div>

      {/* Search Input */}
      <div className="mt-6 w-full flex items-center gap-2">
        <input
          type="text"
          placeholder="Search"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown} // Search on Enter key press
        />
        <button className="px-4 py-2 bg-green-500 text-white rounded-md" onClick={handleSearch}>
          <img src={SearchIcon} alt="Search" className="w-4 h-4" />
        </button>
      </div>

      {/* Search History */}
      {searchHistory.length > 0 && (
        <div className="mt-4 w-full">
          <h3 className="font-bold">Recent Searches</h3>
          <ul className="mt-2">
            {searchHistory.map((term, index) => (
              <li key={index} className="flex justify-between items-center py-1">
                <button className="text-blue-500" onClick={() => {
                  setSearchTerm(term);
                  handleSearch();
                }}>
                  {term}
                </button>
                <button
                  className="text-red-500 ml-2"
                  onClick={() => handleRemoveSearchTerm(term)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchOverlay;
