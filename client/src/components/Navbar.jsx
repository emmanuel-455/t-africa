import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiUser, FiInbox, FiBookmark, FiLogOut, FiChevronDown, FiShoppingBag } from 'react-icons/fi';
import Logo from "../assets/T-LOGO.svg";
import Profile from "../assets/PP.png";
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
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const openSearchOverlay = () => setIsSearchOpen(true);
  const closeSearchOverlay = () => setIsSearchOpen(false);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?query=${searchTerm}`);
      setSearchTerm('');
    }
  };

  const toggleProfileDropdown = () => setIsProfileDropdownOpen((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem('userToken'); // Clear user token
    setIsUserLoggedIn(false); // Update Jotai state
    navigate('/signin'); // Redirect to sign-in page
  };

  return (
    <div className="bg-white z-0">
      <div className="flex w-full justify-between items-center lg:px-[130px] py-[10px] mb-2">
        {/* Left Side - Logo */}
        <div className="flex w-[100%] items-center pl-4 md:pl-0 gap-2 lg:gap-6">
          <Link to="/">
            <img src={Logo} alt="Logo" className="w-[120px] " />
          </Link>

          {/* Search Icon for Mobile / Input for Desktop */}
          <div className="flex items-center">
            {isMobile ? (
              <button onClick={openSearchOverlay} className="p-2 rounded-full text-gray-500">
                <FiSearch size={20} />
              </button>
            ) : (
              <div className="flex w-[100%] items-center">
                <input
                  type="text"
                  placeholder="Search products, brands and categories"
                  className="border md:w-[250px] lg:w-[300px] border-gray-400 rounded-lg px-4 py-[6px] focus:outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSearch();
                  }}
                />
                <button
                  onClick={handleSearch}
                  className="bg-brandGreen flex items-center text-sm gap-1 text-[#fff] font-normal px-[15px] py-[10px] rounded-lg ml-2"
                  aria-label="Search"
                >
                  Search
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Profile, Sign Up, etc. */}
        <div className="flex items-center justify-center gap-4 pr-5 relative">
          {isUserLoggedIn ? (
            <>
              {/* Profile Dropdown */}
              <div className="relative flex">
                <button onClick={toggleProfileDropdown} className=" lg:flex justify-center gap-2 font-bold items-center">
                  <img src={Profile} alt="Profile" className="lg:w-[35px] md:w-[35px] w-[55px]" />
                  <p className='lg:block font-normal hidden'>Chidalu</p>
                  <FiChevronDown className="lg:block hidden" size={20} />
                </button>
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 top-9 mt-2 w-48 bg-white border border-gray-200 rounded shadow-md z-50">
                    <Link to="/profile?tab=account" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                      <FiUser className="mr-2" /> My Account
                    </Link>
                    <Link to="/profile?tab=orders" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                      <FiShoppingBag className="mr-2" /> Orders
                    </Link>
                    <Link to="/profile?tab=inbox" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                      <FiInbox className="mr-2" /> Inbox
                    </Link>
                    <Link to="/profile?tab=savedItems" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                      <FiBookmark className="mr-2" /> Saved Items
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      <FiLogOut className="mr-2" /> Logout
                    </button>
                  </div>
                )}
              </div>
              <MessageDropdown />
              <CartDropdown />
            </>
          ) : (
            <>
              <Link to="/signin">
                <button className="rounded-full bg-brandGreen text-white font-semibold text-nowrap px-4 py-[8px] text-xs lg:text-base">
                  Sign in
                </button>
              </Link>
            </>
          )}

          {/* Mobile Menu Icon */}
          {isUserLoggedIn && (
            <img
              className="block hidden cursor-pointer"
              src={Menu}
              alt="Menu"
              onClick={toggleMobileMenu}
            />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden px-4 py-4 bg-gray-100">
          <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="block py-2">
            Profile
          </Link>
        </div>
      )}

      {/* Search Overlay for Mobile */}
      {isSearchOpen && <SearchOverlay closeOverlay={closeSearchOverlay} />}
    </div>
  );
}

export default Navbar;
