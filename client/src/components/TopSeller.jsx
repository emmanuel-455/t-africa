import React from 'react'
import TopSellerProduct from './TopSellerProduct'

function TopSeller() {
  return (
    <div className='w-full px-[150px] mb-[159px]'>
      <div className='flex flex-col w-full mx-auto items-center justify-center'>
        <span className='text-emerald mb-[18px] text-lg px-3.5 py-2.5 bg-[#E6F9F0] text-brandGreen rounded'>
          Top Selling Products
        </span>
        
        {/* Title and Description */}
        <div className='flex flex-col gap-[16px] justify-center items-center text-center'>
          <h1 className='font-[700] text-[48px]'>
            Discover Nigeria’s Best Exports
          </h1>
          <p className='text-lg leading-relaxed max-w-[70%]'>
            Explore a curated selection of top-selling Nigerian products across various categories.
          </p>
        </div>
      </div>
        <TopSellerProduct />
    </div>
  )
}

export default TopSeller
