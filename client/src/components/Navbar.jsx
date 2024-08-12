import React from 'react';
import logo from "../assets/T-LOGO.svg";
import { Link } from 'react-router-dom';
import Search from "../assets/SearchNav.svg";
import Message from "../assets/messageIcon.svg"
import Cart from "../assets/cartIcon.svg"

function Navbar() {
  return (
    <div className='flex justify-between items-center py-[16px]'>
      <div className='flex gap-[24px] flex-row items-center'>
        <img src={logo} alt="" />
        <div>
          <button className='mr-[12px] px-[10px] py-[4px] bg-[#06C569] text-[14px] text-white rounded-[10px]'>
            <Link>
              Products
            </Link>
          </button>
          <Link className='text-[14px]'>
            Manufacturers
          </Link>
        </div>
        <div className='flex items-center gap-[10px]'>
          <input
            type='text'
            placeholder='Search'
            className='w-[300px] px-4 py-[6px] bg-[#F6F7FA] outline-none rounded-[10px] text-[14px] border-none'
          />
          <button className='bg-[#06C569] p-[8px] rounded-[10px]'>
            <img src={Search} alt="Search" />
          </button>
        </div>
      </div>

      <div className='flex justify-center gap-[20px] items-center'>
        <button className='text-white text-[14px] rounded-[13px] px-[10px] py-[6px] bg-[#06C569]'>
          Sign in
        </button>
        <div className='flex bg-[#F3F4F6] py-[6px] px-[10px] rounded-[13px] text-[14px] gap-[8px]'>
          <img src={Message} alt="" />
          <p>Messages</p>
        </div>
        <div className='flex text-[14px] bg-[#F3F4F6] py-[6px] px-[10px] rounded-[13px] gap-[8px]'>
          <img src={Cart} alt="" />
          Cart
        </div>
      </div>
    </div>
  );
}

export default Navbar;
