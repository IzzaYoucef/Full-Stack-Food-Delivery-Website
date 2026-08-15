import { createContext, useState , useEffect } from "react";
// import { food_list } from "../assets/frontend_assets/assets";
import axios from 'axios'
export const StoreContext = createContext(null); 

const StoreContextProvider = (props) => {

    const [items, setItems] = useState({}); 
    const [totalPrice , setTotalPrice] = useState(0) ;
    const [token , setToken] = useState("");     
    const [food_list , setFood_List] = useState([]) ; 
    const url = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000" ; 

    const addToCard = async (productId) => {
        if (!items[productId]) {
            setItems((prev) => ({ ...prev, [productId]: 1 }));
        } else {
            setItems((prev) => ({ ...prev, [productId]: prev[productId] + 1 }));
        } 

        if(token) {
            await axios.post(`${url}/api/cart/add`, {itemId:productId} , {headers:{token}}) ; 
        }
    }

    const removeFromCard = async (productId) => {
        setItems((prev) => ({ ...prev, [productId]: prev[productId] - 1 })); 
        if(token){
           const response =  await axios.post(url+"/api/cart/remove" , {itemId:productId} , {headers:{token}}); 
            console.log(response);
        }
    }  

    const loadData = async (token) => {
        const response = await axios.post(url + "/api/cart/list", {}, {headers: {token}});
        if (response.data.success) {
            setItems(response.data.cartData || {});
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
        const axiosResponse = await axios.get(`${url}/api/food/list`) ; 

        if(axiosResponse.data.success) {
            console.log(axiosResponse.data) ; 
            setFood_List(axiosResponse.data.data); 
        }else {
            console.log("Axios faild") ; 
        }

    }
    useEffect(()=>{
        setTotalPrice(getTotalPrice()) ; 
    }, [items])
    useEffect(()=>{
        console.log(items) ; 
    } , [items]) ; 

    useEffect(()=> { 
       async function getFromDataBase() {
            await fetchFoodList();
            if(localStorage.getItem("token")) {
                setToken(localStorage.getItem("token")) ; 
                await loadData(localStorage.getItem("token"));
            } 
       }  
       getFromDataBase();
    }, [])

    const contextValue = {
        food_list,
        items,
        addToCard,
        removeFromCard,
        totalPrice , 
        setTotalPrice , 
        token , 
        setToken ,
        url
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;