import React from 'react'
import Logo from "../assets/T-LOGO.svg"
import { Link } from 'react-router-dom';


function ConnectNavbar() {
  const categories = [
    { name: 'Categories', path: '/' },
    { name: 'Top Sellers', path: '/fashion' },
    { name: 'About', path: '/health-beauty' },
    { name: 'Contact', path: '/electronics' },
  ];

  return (
    <div className='px-[100px] py-[20px]'>
      <div className='flex justify-between items-center'>
        <Link to="/">
          <img src={Logo} alt="T-Africa Logo" />
        </Link>
        
        <div className='flex items-center gap-3  font-medium justify-between'>
        <ul className='flex gap-[12px] text-sm'>
          {categories.map((category, index) => (
            <li key={index}>
              <Link to={category.path}>{category.name}</Link>
            </li>
          ))}
          </ul>
          <div className='flex gap-[12px] text-sm'>
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
  )
}

export default ConnectNavbar
