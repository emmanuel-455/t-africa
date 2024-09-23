import React from 'react'
import TestimonialComments from './TestimonialComments'

function Testimonial() {
  return (
    <div className='w-full px-[100px] mb-[150px] pt-[81px]'>
      <div className='flex flex-col mb-12 w-full mx-auto items-center justify-center'>
        {/* Title and Description */}
        <div className='flex flex-col gap-[16px] justify-center items-center text-center'>
          <h1 className='font-[700] text-[48px]'>
            What our customers say
          </h1>
          <p className='text-lg text-black opacity-70 leading-relaxed max-w-[100%]'>
            Explore a curated selection of top-selling Nigerian products across various categories.
          </p>
        </div>
      </div>
      <TestimonialComments />
    </div>
  )
}

export default Testimonial
