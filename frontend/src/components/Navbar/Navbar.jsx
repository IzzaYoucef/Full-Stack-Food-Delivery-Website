import React, { useState } from 'react'
import './Navbar.css' 
import { assets } from '../../assets/frontend_assets/assets'
const Navbar = () => { 

  const [menu , setmenu] = useState('')
  return (
    <div className='navbar'>
         <div className="logo">
             <img src={assets.logo} alt="Logo" />
         </div> 

         <div className="navbar-menu">
            <ul className="links">
                <li onClick={() => setmenu("home")} className={menu == 'home' ? 'active' : '' }>home</li>
                <li onClick={() => setmenu("menu")} className={menu == 'menu' ? 'active' : '' }>menu</li>
                <li onClick={() => setmenu("mobile-app")} className={menu == 'mobile-app' ? 'active' : ''}>mobile-app</li>
                <li onClick={() => setmenu("contact-us")} className={menu == 'contact-us' ? 'active' : ''}>contact us</li>
            </ul>
         </div> 

         <div className="rigth-nav"> 
            <img src={assets.search_icon} alt="search icon" /> 
            <div className="navbar-search-icon">
              <img src={assets.basket_icon} alt="basket icon" />  
              <div className="dot"></div>
            </div>
            <button className='sign-in'>sign in</button>
         </div>
    </div>
  )
}

export default Navbar