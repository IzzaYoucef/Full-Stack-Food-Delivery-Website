import { createContext, useState , useEffect } from "react";
// import { food_list } from "../assets/frontend_assets/assets";
import axios from 'axios'
export const StoreContext = createContext(null); 

const StoreContextProvider = (props) => {

    const [items, setItems] = useState({}); 
    const [totalPrice , setTotalPrice] = useState(0) ;
    const [token , setToken] = useState(localStorage.getItem("token") || "");     
    const [food_list , setFood_List] = useState([]) ; 
    const url = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000" ; 

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        setItems({});
    }

    const addToCard = async (productId) => {
        if (!items[productId]) {
            setItems((prev) => ({ ...prev, [productId]: 1 }));
        } else {
            setItems((prev) => ({ ...prev, [productId]: prev[productId] + 1 }));
        } 

        if(token) {
            try {
                await axios.post(`${url}/api/cart/add`, {itemId:productId} , {headers:{token}}) ;
            } catch (error) {
                console.log(error.message);
            }
        }
    }

    const removeFromCard = async (productId) => {
        setItems((prev) => ({ ...prev, [productId]: prev[productId] - 1 })); 
        if(token){
            try {
                await axios.post(url+"/api/cart/remove" , {itemId:productId} , {headers:{token}});
            } catch (error) {
                console.log(error.message);
            }
        }
    }  

    const loadData = async (token) => {
        try {
            const response = await axios.post(url + "/api/cart/list", {}, {headers: {token}});
            if (response.data.success) {
                setItems(response.data.cartData || {});
            } else {
                logout(); // invalid / expired token or deleted user
            }
        } catch (error) {
            console.log(error.message); // network problem: keep the session
        }
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

    const fetchFoodList = async () => {
        try {
            const axiosResponse = await axios.get(`${url}/api/food/list`) ;
            if(axiosResponse.data.success) {
                setFood_List(axiosResponse.data.data);
            }
        } catch (error) {
            console.log(error.message);
        }

    }
    useEffect(()=>{
        setTotalPrice(getTotalPrice()) ; 
    }, [items])
    useEffect(()=>{
        console.log(items) ; 
    } , [items]) ; 

    useEffect(()=> {
        fetchFoodList();
    }, [])

    // load the saved cart at startup and right after every login
    useEffect(()=> {
        if(token) loadData(token);
    }, [token])

    const contextValue = {
        food_list,
        items,
        addToCard,
        removeFromCard,
        totalPrice , 
        setTotalPrice , 
        token , 
        setToken ,
        logout ,
        url
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;