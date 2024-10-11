import React from 'react'
import TopSellerProduct from './TopSellerProduct'

function TopSeller() {
  return (
    <div className='w-full lg:px-[150px] mb-[59px]'>
      <div className='flex flex-col w-[340px] md:w-[674px] lg:w-full mx-auto items-center justify-center'>
        <span className='mb-4 md:mb-[18px] text-base font-medium md:text-lg px-3 py-2.5 bg-[#E6F9F0] text-brandGreen rounded'>
          Top Selling Products
        </span>
        
        {/* Title and Description */}
        <div className='flex flex-col gap-[16px] justify-center items-center text-center'>
          <h1 className='font-[700] text-[24px] lg:text-[48px]'>
            Discover Nigeria’s Best Exports
          </h1>
          <p className='text-base text-black opacity-70 leading-relaxed max-w-[100%]'>
            Explore a curated selection of top-selling Nigerian products across various categories.
          </p>
        </div>
      </div>
        <TopSellerProduct />
    </div>
  )
}

export default TopSeller
