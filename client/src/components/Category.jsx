import React from 'react'
import CateIcon from "../assets/hugeicons.svg"
import { Link } from 'react-router-dom'
import Help from "../assets/questionIcon.svg"

function Category() {
  return (
    <div className='flex justify-between px-[100px] pb-[16px] bg-white'>
      <div className='flex font-bold justify-center items-center gap-[8px]'>
        <img src={CateIcon} alt="" />
        <p className='text-nowrap text-sm'>All Categories</p>
      </div>
      <div className='flex gap-[10px]'>
        <div className='font-medium py-[6px] px-[10px] rounded-[10px] flex bg-[#EFF0F2]'>
          <img src={Help} alt="" />
          <p className='text-sm ml-[8px]'>Help</p>
        </div>
        <Link className='bg-brandGreen py-[6px] px-[10px] rounded-[10px] font-medium text-white text-sm'>
          Sell on T-Africa
        </Link>
      </div>
    </div>
  )
}

export default Category
