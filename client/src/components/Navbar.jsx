import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../assets/T-LOGO.svg";
import Profile from "../assets/PP.png";
import CartIcon from "../assets/cartIcon.svg";
import Search from "../assets/SearchNav.svg";
import CartDropdown from './Cart'; // Import CartDropdown
import Menu from "../assets/MenuIcon.svg";
import MessageDropdown from './MessageDropdown'; // Import the MessageDropdown component
import SearchOverlay from './SearchOverlay'; // Import the SearchOverlay component

function Navbar() {
  const user = true;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu
  const [isSearchOpen, setIsSearchOpen] = useState(false); // State to track the search overlay

  const navigate = useNavigate(); // Navigation hook to handle route changes

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prevState => !prevState);
  };

  // Open the search overlay
  const openSearchOverlay = () => {
    setIsSearchOpen(true);
  };

  // Close the search overlay
  const closeSearchOverlay = () => {
    setIsSearchOpen(false);
  };

  return (
    <div className='bg-white'>
      {user ? (
        <div className='flex justify-between items-center px-[16px] lg:px-[100px] md:py-[20px] py-[14px]'>
          <div className='flex gap-2 lg:gap-[24px] flex-row items-center'>
            <Link className='w-[110px]' to="./">
              <img src={Logo} alt="Logo" />
            </Link>

            {/* Desktop Menu */}
            <div className='hidden lg:flex font-medium flex-row items-center'>
              <Link className='lg:mr-[12px]' to="/about">About</Link>
              <Link to="/contact">Contact</Link>
            </div>

            {/* Search Icon (clickable, opens overlay) */}
            <div className='flex items-center gap-1 lg:gap-2.5'>
              <button onClick={openSearchOverlay} className="bg-[#EFF0F2] flex items-center text-sm gap-1 text-[#919191] w-[120px] pl-[17px] py-[9px] rounded-full">
                 Search
              </button>
            </div>
          </div>

          {/* User Actions (Cart, Profile, etc.) */}
          <div className='flex lg:flex justify-center gap-4 lg:gap-[20px] items-center'>
            <Link className='hidden lg:flex gap-[8px] font-bold items-center' to="/profile">
              <img src={Profile} alt="Profile" className='w-[24px]' />
              <p>Chidalu</p> {/* Static name for now */}
            </Link>

            <MessageDropdown />

            <CartDropdown />

            <img className="block lg:hidden cursor-pointer" src={Menu} alt="Menu" onClick={toggleMobileMenu} />
          </div>
        </div>
      ) : (
          // For logged-out users
          <div className='px-[100px] py-[14px]'>
          <div className='flex justify-between items-center'>
            <Link to="/">
              <img src={Logo} alt="T-Africa Logo" />
            </Link>

            <div className='flex items-center gap-3 font-medium justify-between'>
              <ul className='flex gap-[12px] text-sm'>
                {/* Add your categories here */}
              </ul>
              <div className='flex gap-[12px] text-sm'>
                <div className='flex font-medium gap-[12px] flex-row items-center'>
                  <Link to="/about" onClick={closeCart}>About</Link>
                  <Link to="/contact" onClick={closeCart}>Contact</Link>
                </div>
                <button className='rounded-[10px] px-[10px] py-[6px] bg-[#EFF0F2] border border-[#E0E5EB]'>
                  Sign Up
                </button>
                <button className='rounded-[10px] bg-green-500 text-white px-[10px] py-[6px]'>
                  Log In
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className='lg:hidden px-4 py-4 bg-gray-100'>
          <Link to="/about" onClick={toggleMobileMenu} className='block py-2'>About</Link>
          <Link to="/contact" onClick={toggleMobileMenu} className='block py-2'>Contact</Link>
          <Link to="/profile" onClick={toggleMobileMenu} className='block py-2'>Profile</Link>
        </div>
      )}

      {/* Search Overlay */}
      {isSearchOpen && <SearchOverlay closeOverlay={closeSearchOverlay} />}
    </div>
  );
}

export default Navbar;
