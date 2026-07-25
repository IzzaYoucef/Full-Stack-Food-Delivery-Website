import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
const Navbar = () => {
  return (
    <div className='nav-bar'>
        <div className="images">
            <img src={assets.logo} className='logo' alt="" />
            <img src={assets.bissou} className='admin' alt="" />
        </div>
        <hr />
    </div>
  )
}

export default Navbar