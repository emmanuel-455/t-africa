import React from 'react'
import { Link } from 'react-router-dom'
import DPVector from "../assets/vector.svg"

function FormFooter() {
  return (
    <div className='mt-[70px] flex justify-center text-[14px] text-[#9CA3AF] pb-[21px]'>
      <Link className='py-2 px-[12px] '>Privacy & Terms</Link>
      <Link className='py-2 px-[12px] '>Contact us</Link>
      <Link className='py-2 px-[12px] flex gap-2 justify-center items-center'>Change region <img src={DPVector} alt="" /></Link>
    </div>
  )
}

export default FormFooter
