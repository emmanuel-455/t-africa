import React from 'react'
import TestimonialComments from './TestimonialComments'

function Testimonial() {
  return (
    <div className='w-full px-[70px] mb-[159px] pt-[81px]'>
      <div className='flex flex-col w-full mx-auto items-center justify-center'>
        {/* Title and Description */}
        <div className='flex flex-col gap-[16px] justify-center items-center text-center'>
          <h1 className='font-[700] text-[48px]'>
            What our customers say
          </h1>
          <p className='text-lg leading-relaxed max-w-[100%]'>
            Explore a curated selection of top-selling Nigerian products across various categories.
          </p>
        </div>
      </div>
      <TestimonialComments />
    </div>
  )
}

export default Testimonial
