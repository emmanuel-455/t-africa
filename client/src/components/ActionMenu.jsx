import React from 'react'
import QM from "../assets/questionIcon.svg"
import { Link } from 'react-router-dom'

function ActionMenu() {
  return (
    <div className='flex items-center gap-[10px] justify-center'>
    <button className=''>
      <Link className="px-[6px] gap-[8px] rounded-[13px] bg-[#F3F4F6] flex py-[10px]">
        <img src={QM} alt="" srcset="" />
        <p>Help</p>
      </Link>
    </button>
    <button className='px-[10px] text-[14px] gap-[8px] rounded-[13px] py-[10px] bg-[#06C569] text-white'>Sell on T-Africa</button>
  </div>
  )
}

export default ActionMenu
