import React from 'react'
import logo from "../assets/T-LOGO.svg"
import { Link } from 'react-router-dom'

function Logo() {
  return (
    <div >
      <Link to="/" className='flex pt-[27px] pb-[41px] items-center justify-center'>
      <img src={logo} alt="Logo" />
      </Link>
    </div>
  )
}

export default Logo
