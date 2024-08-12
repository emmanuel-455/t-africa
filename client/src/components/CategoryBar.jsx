import React from 'react'
import { Link } from 'react-router-dom'
import ActionMenu from './ActionMenu'

function CategoryBar() {
  return (
    <div className='flex justify-between items-center text-sm'>
      <div className='flex text-[#878787]'>
        <div>
          <Link className="px-[14px] py-[10px]">
            Featured
          </Link>
        </div>
        <div>
          <Link className="px-[14px] py-[10px]">
            Fashion
          </Link>
        </div>
        <div>
          <Link className="px-[14px] py-[10px]">
            Health and Beauty
          </Link>
        </div>
        <div>
          <Link className="px-[14px] py-[10px]">
            Electronics
          </Link>
        </div>
        <div>
          <Link className="px-[14px] py-[10px]">
            Grocery
          </Link>
        </div>
        <div>
          <Link className="px-[14px] py-[10px]">
            Livestock
          </Link>
        </div>
      </div>
      <ActionMenu />
    </div>
  )
}

export default CategoryBar
