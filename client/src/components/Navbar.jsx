import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi'; // Import search icon from react-icons
import Logo from "../assets/T-LOGO.svg";
import Profile from "../assets/PP.png";
import CartDropdown from './Cart';
import Menu from "../assets/MenuIcon.svg";
import MessageDropdown from './MessageDropdown';
import SearchOverlay from './SearchOverlay';

import { isUserLoggedInAtom } from '../redux/Store';
import { useAtom } from 'jotai';

function Navbar() {
  const [isUserLoggedIn] = useAtom(isUserLoggedInAtom);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  // Monitor window width to determine if the device is mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prevState => !prevState);
  };

  const openSearchOverlay = () => {
    setIsSearchOpen(true);
  };

  const closeSearchOverlay = () => {
    setIsSearchOpen(false);
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?query=${searchTerm}`);
      setSearchTerm(''); // Clear the input after search
    }
  };

  return (
    <div className='bg-white overflow-x-hidden'>
      <div className='flex justify-between items-center px-[16px] lg:px-[100px] md:py-[20px] py-[14px]'>

        {/* Left Side - Logo, About, Contact */}
        <div className='flex items-center gap-2 lg:gap-8'>
          <Link to="/">
            <img src={Logo} alt="Logo" className="w-[100px] lg:w-[110px]" />
          </Link>
          
          <div className='hidden lg:flex font-medium gap-4'>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>

          {/* Search Icon for Mobile / Input for Desktop */}
          <div className='flex items-center'>
            {isMobile ? (
              <button
                onClick={openSearchOverlay} // Open overlay for mobile
                className="p-2 rounded-full text-gray-500"
              >
                <FiSearch size={20} /> {/* Search icon */}
              </button>
            ) : (
              <div className='flex items-center'>
                <input
                  type="text"
                  placeholder="Search"
                  className="border border-gray-300 rounded-full px-4 py-[6px] w-[300px] focus:outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSearch();
                  }}
                />
                <button
                  onClick={handleSearch}
                  className="bg-brandGreen flex items-center text-sm gap-1 text-[#fff] font-bold px-[10px] py-[10px] rounded-full ml-2"
                  aria-label="Search"
                >
                  <FiSearch size={16} /> {/* Small search icon for desktop */}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Profile, Sign Up, etc. */}
        <div className='flex items-center gap-2'>
          {isUserLoggedIn ? (
            <>
              <Link to="/profile" className='hidden lg:flex gap-[8px] font-bold items-center'>
                <img src={Profile} alt="Profile" className='w-[24px]' />
                <p>Chidalu</p>
              </Link>
              <MessageDropdown />
              <CartDropdown />
            </>
          ) : (
            <Link to="./signin">
              <button className='rounded-full bg-brandGreen text-white font-semibold text-nowrap px-4 py-[8px] text-sm lg:text-base'>
                Sign in
              </button>
            </Link>
          )}

          <img className="block lg:hidden cursor-pointer" src={Menu} alt="Menu" onClick={toggleMobileMenu} />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className='lg:hidden px-4 py-4 bg-gray-100'>
          <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className='block py-2'>About</Link>
          <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className='block py-2'>Contact</Link>
          <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className='block py-2'>Profile</Link>
        </div>
      )}

      {/* Search Overlay for Mobile */}
      {isSearchOpen && <SearchOverlay closeOverlay={closeSearchOverlay} />}
    </div>
  );
}

export default Navbar;
