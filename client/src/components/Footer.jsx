import React from 'react';
import logo from '../assets/T-LOGO.svg';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='flex md:flex-row mt-[80px] flex-col md:pb-[80px] pb-[50px] lg:pb-[79px] lg:px-[160px] px-[39px] justify-between md:px-[100px] items-start'>
      <div className='flex flex-col gap-6 md:mb-0 mb-[110px]'>
        <div className=''>
          <img src={logo} alt="Logo" />
        </div>
        <div className=''>
          <p className='text-[16px]'>© 2024 T-Africa</p>
        </div>
        <div className='flex gap-[26px]'>
          <div>
            <Link className='text-[16px]'>Privacy Policy</Link>
          </div>
          <div>
            <Link className='text-[16px]'>Terms & Conditions</Link>
          </div>
        </div>
      </div>
      <div className='flex'>
        <div className='w-[156px]'>
          <h6 className='text-[16px] mb-[12px] font-[700]'>Company</h6>
          <div className='text-[14px] gap-[12px] flex flex-col'>
            <Link>About</Link>
            <Link>Careers</Link>
            <Link>Contact</Link>
          </div>
        </div>
        <div className='w-[110px]'>
          <h6 className='text-[16px] mb-[12px] font-[700]'>Stay in touch</h6>
          <div className='text-[14px] gap-[12px] flex flex-col'>
            <Link className='underline'>Instagram</Link>
            <Link className='underline'>Twitter</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
