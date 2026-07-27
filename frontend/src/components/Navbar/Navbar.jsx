import React, { useContext, useState } from 'react'
import './Navbar.css' 
import { assets } from '../../assets/frontend_assets/assets' 
import {Link, useNavigate} from 'react-router-dom' 
import { StoreContext } from '../../context/StoreContext'
const Navbar = ({setShowState}) => { 

  const [menu , setmenu] = useState('') 
  const {totalPrice , token , setToken} = useContext(StoreContext) ; 
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("token") ; 
    setToken("");  
    navigate('/')
  }
  return (
    <div className='navbar'>
         <div className="logo">
            <Link to='/'><img src={assets.logo} alt="Logo" /></Link>
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
              <Link to='/Cart'><img src={assets.basket_icon} alt="basket icon" /></Link>
              <div className={totalPrice === 0 ? "" :"dot"}></div>
            </div>
            {!token ? 
             <button className='sign-in' onClick={()=>setShowState(true)}>sign in</button>
             : <div className="nav-user-profile">
                  <img src={assets.profile_icon} className='profile-icon' alt="profile icon" /> 
                  <div className="nav-option-details">
                    <ul>
                      <li><img src={assets.bag_icon} alt="" />Orders</li> 
                      <hr />
                      <li onClick={logOut} ><img src={assets.logout_icon} alt=""  />Logout</li>  
                    </ul>
                  </div>
              </div>

            }
         </div>
    </div>
  )
}

export default Navbar