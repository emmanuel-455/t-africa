import React from 'react';
import logo from '../assets/T-LOGO.svg';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='flex mt-[149px] mb-[128px] justify-between mx-[160px] items-start'>
      <div className=''>
        <div className='mb-[33px]'>
          <img src={logo} alt="Logo" />
        </div>
        <div className='mb-[33px]'>
          <p className='text-[16px]'>© 2024 T-Africa</p>
        </div>
        <div className='flex'>
          <div>
            <Link className='text-[16px] mr-[54px]'>Privacy Policy</Link>
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
        <div className='w-[156px]'>
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
