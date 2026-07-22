import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/frontend_assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [items, setItems] = useState({});

    const addToCard = (productId) => {
        if (!items[productId]) {
            setItems((prev) => ({ ...prev, [productId]: 1 }));
        } else {
            setItems((prev) => ({ ...prev, [productId]: prev[productId] + 1 }));
        }
    }

    const removeFromCard = (productId) => {
        setItems((prev) => ({ ...prev, [productId]: prev[productId] - 1 }));
    } 

    useEffect(()=>{
        console.log(items) ; 
    } , [items])

    const contextValue = {
        food_list,
        items,
        addToCard,
        removeFromCard
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;