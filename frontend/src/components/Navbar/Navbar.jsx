import React, { useState } from 'react'
import './Navbar.css' 
import { assets } from '../../assets/frontend_assets/assets' 
import {Link} from 'react-router-dom' 
const Navbar = ({setShowState}) => { 

  const [menu , setmenu] = useState('')
  return (
    <div className='navbar'>
         <div className="logo">
             <img src={assets.logo} alt="Logo" />
         </div> 

         <div className="navbar-menu">
            <ul className="links">
                <Link to='/' onClick={() => setmenu("home")} className={menu == 'home' ? 'active' : '' }>home</Link>
                <a href='#explore-menu' onClick={() => setmenu("menu")} className={menu == 'menu' ? 'active' : '' }>menu</a>
                <a href='#mobile-app' onClick={() => setmenu("mobile-app")} className={menu == 'mobile-app' ? 'active' : ''}>mobile-app</a>
                <a href='#contact-us' onClick={() => setmenu("contact-us")} className={menu == 'contact-us' ? 'active' : ''}>contact us</a>
            </ul>
         </div> 

         <div className="rigth-nav"> 
            <img src={assets.search_icon} alt="search icon" /> 
            <div className="navbar-search-icon">
              <img src={assets.basket_icon} alt="basket icon" />  
              <div className="dot"></div>
            </div>
            <button className='sign-in' onClick={()=>setShowState(true)}>sign in</button>
         </div>
    </div>
  )
}

export default Navbar