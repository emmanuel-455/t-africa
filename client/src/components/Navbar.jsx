// src/components/Navbar.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../assets/T-LOGO.svg";
import Profile from "../assets/PP.png";
import CartIcon from "../assets/cartIcon.svg";
import Search from "../assets/SearchNav.svg";
import CartDropdown from './Cart';
import Menu from "../assets/MenuIcon.svg";
import MessageDropdown from './MessageDropdown';
import SearchOverlay from './SearchOverlay';

import { isUserLoggedInAtom } from '../redux/Store';
import { useAtom } from 'jotai';

function Navbar() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useAtom(isUserLoggedInAtom);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prevState => !prevState);
  };

  const openSearchOverlay = () => {
    setIsSearchOpen(true);
  };

  const closeSearchOverlay = () => {
    setIsSearchOpen(false);
  };

  return (
    <div className='bg-white'>
      <div className='flex justify-between items-center px-[16px] lg:px-[100px] md:py-[20px] py-[14px]'>

        {/* Left Side - Logo, About, Contact */}
        <div className='flex items-center gap-4'>
          <Link to="/">
            <img src={Logo} alt="Logo" className="w-[80px] lg:w-[110px]" />
          </Link>

          <div className='hidden lg:flex font-medium gap-4'>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>

        {/* Right Side - Profile, Sign Up, etc. */}
        <div className='flex items-center gap-2'>
          {/* Search Button for Mobile and Desktop */}
          <button
            onClick={openSearchOverlay}
            className="bg-[#EFF0F2] flex items-center text-sm gap-1 text-[#919191] w-[100px] lg:w-[135px] px-[17px] py-[9px] rounded-full lg:mr-4"
            aria-label="Open search overlay"
          >
            <span className=' text-black lg:inline'>Search</span>
          </button>

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
            <>
              
              <Link to="./signin">
                <button className='rounded-[10px] bg-green-500 text-white text-nowrap px-[10px] py-[6px] text-sm lg:text-base'>
                  sign In
                </button>
              </Link>
            </>
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

      {/* Search Overlay */}
      {isSearchOpen && <SearchOverlay closeOverlay={closeSearchOverlay} />}
    </div>
  );
}

export default Navbar;
