import axios from 'axios';
import React, { useContext, useEffect } from 'react' 
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';
import './Verify.css';

const Verify = () => {
const [searchParams] = useSearchParams();
const navigate = useNavigate();
const success = searchParams.get("success");
const orderId = searchParams.get("orderId");

const { url } = useContext(StoreContext);

const verify = async () => {
// Verify.jsx
const response = await axios.post(url + "/api/order/verify", { orderId, success });    
    if (success === "true") {
        navigate("/myOrders");
    } else {
        navigate("/");
    }
};

useEffect(()=>{
    verify();
}, [])
  return (
    <div className='verify'>
        <div className="spiner">

        </div>
    </div>
  )
}

export default Verify