import React from "react"; 
import { assets, menu_list } from "../../assets/frontend_assets/assets";
import './ExploreMenu.css'
const ExploreMenu = ({category , setCategory}) => {
    return (
        <div className="Explore-menu">
             <div className="title">
                <h2>Explore our menu</h2>
             </div>
             <p className="description">
                Choose from a diverse menu featuring a delectable array of dishes.Our mission is to satisfy your cravings and elevate your during experience, one delicious meal at a time.
             </p> 

             <div className="items-of-menu">
                {menu_list.map((item , index) => {
                    return (
                        <div className="item" onClick={() => {setCategory(prev => prev === item.menu_name ? "all" : item.menu_name)}} key={index}>
                            <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} alt="menu imqge" /> 
                            <br />
                            <p>{item.menu_name}</p>
                        </div>
                    )
                })}
             </div> 
             <hr />
        </div>
    )
} 

export default ExploreMenu ; 