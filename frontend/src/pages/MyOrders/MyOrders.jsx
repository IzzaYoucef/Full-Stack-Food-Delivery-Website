import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';
import { assets } from '../../assets/frontend_assets/assets';

const MyOrders = () => {

    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);

    const fetchOrders = async () => {
        const response = await axios.post(url + "/api/order/userOrders", {}, { headers: { token } });
        setData(response.data.data);
    }

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token])

    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className="my-orders-list">
                {data.map((order, index) => (
                    <div key={order._id ?? index} className='my-orders-order'>
                        <img src={assets.parcel_icon} alt="parcel icon" />
                        <p>
                            {order.items.map((item, i) => (
                                i === order.items.length - 1
                                    ? `${item.name.trim()} x ${item.quantity}`
                                    : `${item.name.trim()} x ${item.quantity}, `
                            ))}
                        </p>
                        <p>${order.price}.00</p>
                        <p>Items: {order.items.length}</p>
                        <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                        <button onClick={fetchOrders} className='track'>Track Order</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyOrders