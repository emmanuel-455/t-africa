import React from 'react'
import { Link } from 'react-router-dom'

const GetStarted = () => {
  return (
    <div className='md:px-[38px] px-[13px] lg:px-[100px] mb-[143px]'>
      <div className='bg-brandGreen rounded-[10px] pt-[86px] pb-[106px] text-center flex flex-col'>
        <div className='flex m-auto flex-col items-center justify-center w-[306px] lg:w-[570px] gap-[20px]'>
        <h1 className='text-[24px] lg:text-[48px] font-bold text-white'>Ready to get started?</h1>
        <p className='text-[16px] text-white'>Explore millions of products from trusted suppliers by signing up today!</p>
        <Link to="/signup" className='bg-[#EFF0F2] text-[16px] font-bold px-4 py-[10px] rounded-[10px]'>Sign up</Link>
        </div>
      </div>
    </div>
  )
}

export default GetStarted
