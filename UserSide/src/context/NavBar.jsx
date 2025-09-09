import React from 'react'
import './NavBar.css'
import {Link, NavLink, useNavigate} from "react-router-dom"
import Login from '../components/Login/Login'

function NavBar() {
  const navigate = useNavigate();
  return (
    <nav className='navBar'>
        <div className='flex items-center space-x-2'>
            <img src='/BlueStock.svg' alt="Logo" className='h-118 w-132'/>
            <h1 className="font-poppins font-bold text-[45px] 
            leading-[100%] tracking-[0%] text-gray-800">
            Bluestock   
            </h1>
        </div>
        <div className='options'>
            <section>Products</section>
            <section>Pricing</section>
            <section>COMMUNITY</section>
            <option value="">Media</option>
            <section>Support↗</section>
        </div>

        <div className='flex gap-10 ml-[46px]'>
            <button className='w-[52px] h-[23px] w-600 text-[#9A9A9A] mt-[5px]' onClick={()=> navigate('/Login')}>Sign In</button>
            <button className='w-[135px] h-[42px] bg-[#3F52FF] text-[#FFFF]' onClick={()=> navigate('/SignUp')} >Sign Up Now</button>
        </div>
        <img src="/Vector.svg" alt="" className='mr-[12px]' />
    </nav>
  )
}

export default NavBar