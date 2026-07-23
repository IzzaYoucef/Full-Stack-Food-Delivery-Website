import { createContext, useState , useEffect } from "react";
import { food_list } from "../assets/frontend_assets/assets";

export const StoreContext = createContext(null); 

const StoreContextProvider = (props) => {

    const [items, setItems] = useState({}); 
    const [totalPrice , setTotalPrice] = useState(0) ;

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
    const getTotalPrice = () => {
        let totalPrice = 0 ; 
        for(const key in items) {
            const item = food_list.find((food)=>food._id===key) ; 
            if(item && items[key] > 0) {
                totalPrice += items[key]*item.price ;  
            }
        }
        return totalPrice ; 
    } 

    useEffect(()=>{
        setTotalPrice(getTotalPrice) ; 
    }, [items])
    useEffect(()=>{
        console.log(items) ; 
    } , [items])

    const contextValue = {
        food_list,
        items,
        addToCard,
        removeFromCard,
        totalPrice , 
        setTotalPrice
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;