import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function SupplierProductMenu() {
  const [activeLink, setActiveLink] = useState('Products'); // Default active link is 'Products'

  // Function to handle link clicks
  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
  };

  return (
    <div className='text-sm flex flex-row items-center bg-white w-[44.2%] mt-[16px] mb-[24px] m-auto rounded-[62px] p-[6px] justify-center font-medium gap-[10px]'>
      {/* Links with dynamic background based on the active link */}
      <Link
        to="/products"
        className={`px-4 py-2 rounded-[35px] ${activeLink === 'Products' ? 'bg-brandGreen text-white' : 'bg-transparent'}`}
        onClick={() => handleLinkClick('Products')}
      >
        Products
      </Link>

      <Link
        to="/all-suppliers"
        className={`px-4 py-2 rounded-[35px] ${activeLink === 'All Suppliers' ? 'bg-brandGreen text-white' : 'bg-transparent'}`}
        onClick={() => handleLinkClick('All Suppliers')}
      >
        All Suppliers
      </Link>

      <Link
        to="/verified-manufacturers"
        className={`px-4 py-2 rounded-[35px] ${activeLink === 'Verified Manufacturers' ? 'bg-brandGreen text-white' : 'bg-transparent'}`}
        onClick={() => handleLinkClick('Verified Manufacturers')}
      >
        Verified Manufacturers
      </Link>

      <Link
        to="/regional-suppliers"
        className={`px-4 py-2 rounded-[35px] ${activeLink === 'Regional Suppliers' ? 'bg-brandGreen text-white' : 'bg-transparent'}`}
        onClick={() => handleLinkClick('Regional Suppliers')}
      >
        Regional Suppliers
      </Link>
    </div>
  );
}

export default SupplierProductMenu;
