import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets' 
import { Navigate, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Sidebar = () => { 
    const navigate = useNavigate() ;   
    const [active , setActive] = useState("") ; 
  return (
    <div className='sidebar'>
        <div className="sidebar-options">
            <div className="sidebar-option" id = {active === "add" ? "active" : ""} onClick={()=>{navigate('/add') ; setActive("add")}}>
                <img src={assets.add_icon} alt="" />
                <p>Add items</p> 
            </div>
            <div className="sidebar-option" id={active === "items" ? "active" : ""} onClick={()=>{navigate('/items') ; setActive("items")}}>
                <img src={assets.order_icon} alt="" />
                <p>List items</p> 
            </div>
            <div className="sidebar-option" id={active === "orders" ? "active" : ""} onClick={()=>{navigate('/orders'); setActive("orders")}}>
                <img src={assets.order_icon} alt="" />
                <p>Orders</p> 
            </div>
        </div>
    </div>
  )
}

export default Sidebar