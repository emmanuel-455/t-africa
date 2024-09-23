import React from 'react'
import VerifiedSellerCard from './VerifiedSellerCard'

function VerifiedSeller() {
  return (
    <div  className='w-full px-[100px] mb-[159px]'>
      <div className='flex flex-col w-full mx-auto items-center justify-center'>
      <span className='text-emerald mb-[18px] text-lg px-3.5 py-2.5 bg-[#E6F9F0] text-brandGreen rounded'>
        Verified Suppliers
        </span>
        
        {/* Title and Description */}
        <div className='flex flex-col gap-[16px] justify-center items-center text-center'>
          <h1 className='font-[700] text-[48px]'>
            Trusted Nigerian Suppliers
          </h1>
          <p className='text-lg text-black opacity-70 leading-relaxed max-w-[70%]'>
            Pre-vetted businesses ready to fulfill your orders
          </p>
        </div>
      </div>
      <VerifiedSellerCard />
    </div>
  )
}

export default VerifiedSeller
