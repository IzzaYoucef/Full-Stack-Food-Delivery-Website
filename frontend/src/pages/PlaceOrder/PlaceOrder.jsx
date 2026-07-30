import React, { useContext , useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
const PlaceOrder = () => {
  const { totalPrice , food_list , items ,  token  , url  } = useContext(StoreContext); 

  const [clientData , setClientData] = useState({
    firstName:"", 
    lastName:"" , 
    email:"", 
    adress:"" , 
    city:"" , 
    state:"" , 
    zipCode:"", 
    country:"" ,
    phone:""
  }) ;  

  const onchangeHanler = (e) => {
    let name = e.target.name; 
    let value = e.target.value ; 
    setClientData((prev)=>({...prev , [name]:value})) ;
  } 
 

  const placeOrder = async (event) => {
    event.preventDefault() ; 

    let orederList = [] ; 
    food_list.map((item)=> {
      if(items[item._id] > 0){ 
        let temp = item ; 
        temp["quantity"] = items[item._id] ; 
        orederList.push(item); 
      }
    }) ; 
    let orderData = {
      address:clientData,
      items:orederList , 
      price:totalPrice
    }

    const axiosRespose = await axios.post(url+"/api/order/place", orderData , {headers:{token}});
    if(axiosRespose.data.success) {
      const {session_url} = axiosRespose.data ;  
      console.log(axiosRespose.data);
      window.location.replace(session_url);
    }else{
      console.log(axiosRespose.data);
    }
  }
  useEffect(()=> {
    console.log(clientData);
  }, [clientData])

  return (
   <form >
     <div className="place-order">
      <div className="left-side">
        <p className="title">Delivery information</p>
        <div className="input-feilds">
          <div className="multi-feilds">
            <input type="text" name="firstName" onChange={(e)=>onchangeHanler(e)} required  placeholder="Firset name" />
            <input type="text" name="lastName" onChange={(e)=>onchangeHanler(e)}  required placeholder="Last name" />
          </div>
          <div>
            <input type="text" name="email" onChange={(e)=>onchangeHanler(e)} required placeholder="Email adress" />
          </div>
          <div>
            <input type="text" name="adress" onChange={(e)=>onchangeHanler(e)} required placeholder="Street" />
          </div>
          <div className="multi-feilds">
            <input type="text" name="city" onChange={(e)=>onchangeHanler(e)} required placeholder="City" />
            <input type="text" name="state" onChange={(e)=>onchangeHanler(e)} required placeholder="State" />
          </div>
          <div className="multi-feilds">
            <input type="text" name="zipCode" onChange={(e)=>onchangeHanler(e)} required placeholder="Zip code" />
            <input type="text" name="counrty" onChange={(e)=>onchangeHanler(e)} required placeholder="Country" />
          </div>
          <div>
            <input type="text" name="phone" onChange={(e)=>onchangeHanler(e)} placeholder="Phone" />
          </div>
        </div>
      </div>
      <div className="total-addition">
        <div className="left-side">
          <h2>Cart totals</h2>
          <div className="sub-total">
            <p className="sub-total">Subtotal</p>
            <p>{totalPrice} €</p>
          </div> 
          <div className="fees">
            <p className="fee">Deliver fees</p>
            <p>0 €</p>
          </div>
          <div className="total">
            <h2>Total</h2>
            <h2>{totalPrice}€</h2>
          </div>
          <button className="proceed-checkout" onClick={(e)=>placeOrder(e)}>Proceed to payment</button>
        </div>
      </div>
    </div>
   </form>
  );
};

export default PlaceOrder;
