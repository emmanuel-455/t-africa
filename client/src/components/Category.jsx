import React from 'react'
import { Link } from 'react-router-dom'
import QM from "../assets/questionIcon.svg"

function Category() {
  return (
    <div className='flex text-sm'>
      <div className='flex'>
        <div>
          <Link>
            Featured
          </Link>
        </div>
        <div>
          <Link>
            Fashion
          </Link>
        </div>
        <div>
          <Link>
            Health and Beauty
          </Link>
        </div>
        <div>
          <Link>
            Electronics
          </Link>
        </div>
        <div>
          <Link>
            Grocery
          </Link>
        </div>
        <div>
          <Link>
            Livestock
          </Link>
        </div>
      </div>
      <div>
        <button>
          <Link>
            <img src={QM} alt="" srcset="" />
            <p>Help</p>
          </Link>
        </button>
        <button>Sell on T-Africa</button>
      </div>
    </div>
  )
}

export default Category
