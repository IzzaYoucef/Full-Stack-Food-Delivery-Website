import React, { useContext } from "react";  
import { StoreContext } from "../../context/StoreContext"; 
import './FoodDisplay.css' ; 
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({category}) => {

    const {food_list} = useContext(StoreContext) ; 
    return (
        <div className="food-display">
            <h2>Top dishes near from you</h2> 
            <div className="food-context">
                {food_list.map((food , index) => {
                    if(category === "all" || category === food.category){
                        return <FoodItem key={index} id={food._id} name={food.name} image={food.image} price={food.price} description={food.description} />
                    }
                })}
            </div>
        </div>
    )
} 
export default FoodDisplay ; 