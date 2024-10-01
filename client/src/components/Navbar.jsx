import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../assets/T-LOGO.svg";
import Profile from "../assets/PP.png";
import CartIcon from "../assets/cartIcon.svg";
import Search from "../assets/SearchNav.svg";
import Cart from "./Cart";
import Menu from "../assets/MenuIcon.svg";
import MessageDropdown from './MessageDropdown'; // Import the MessageDropdown component

function Navbar() {
  const user = true;
  const [isCartOpen, setIsCartOpen] = useState(false); // State to track cart visibility
  const [searchTerm, setSearchTerm] = useState(''); // State to track search input
  const navigate = useNavigate(); // Navigation hook to handle route changes

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const toggleCart = () => {
    setIsCartOpen(prevState => !prevState);
  };

  // Handle search input changes
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle search action (same logic as in the banner)
  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?query=${searchTerm}`); // Redirect to search page with the query
      closeCart(); // Close cart if it's open
    }
  };

  // Handle search on Enter key press
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className='bg-white'>
      {user ? (
        <div className='flex justify-between items-center px-[16px] lg:px-[100px] md:py-[20px] py-[14px]'>
          <div className='flex gap-[24px] flex-row items-center'>
            <Link className='w-[110px]' to="./">
              <img src={Logo} alt="Logo" />
            </Link>
            
            <div className='flex hidden lg:block font-medium flex-row items-center'>
              <Link className='mr-[12px]' to="/about" onClick={closeCart}>About</Link>
              <Link to="/contact" onClick={closeCart}>Contact</Link>
            </div>

            {/* Search Input */}
            <div className='flex lg:flex hidden lg:block items-center gap-2.5'>
              <input
                type='text'
                placeholder='Search'
                className='w-[300px] px-4 py-[6px] bg-[#F6F7FA] outline-none rounded-[10px] text-[14px] border-none'
                value={searchTerm}
                onChange={handleInputChange} // Update state on change
                onKeyDown={handleKeyDown} // Trigger search on Enter
              />
              <button className='bg-[#06C569] p-[8px] rounded-[10px]' onClick={handleSearch}>
                <img src={Search} alt="Search" />
              </button>
            </div>
          </div>

          <img className="block lg:hidden" src={Menu} alt="" />

          <div className='flex hidden lg:flex justify-center gap-[20px] items-center'>
            <Link className='flex gap-[8px] font-bold items-center' to="/profile" onClick={closeCart}>
              <img src={Profile} alt="Profile" className='w-[24px]' />
              <p>Chidalu</p> {/* Static name for now */}
            </Link>

            {/* Message Dropdown */}
            <MessageDropdown />

            {/* Cart Dropdown */}
            <div className='relative'>
              <div
                className='flex font-medium text-[14px] bg-[#F3F4F6] py-[6px] px-[10px] rounded-[13px] gap-[8px] cursor-pointer'
                onClick={toggleCart}
              >
                <img src={CartIcon} alt="Cart" />
                Cart
              </div>
              {isCartOpen && (
                <div className="absolute right-0 top-full">
                  <Cart isCartOpen={isCartOpen} closeCart={closeCart} />
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
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
    </div>
  );
}

export default Navbar;
