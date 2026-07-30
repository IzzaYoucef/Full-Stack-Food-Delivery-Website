import React, { useState, useEffect } from "react";
import './Orders.css'
import axios from 'axios'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'

const Orders = ({ url }) => {

    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const axiosResponse = await axios.get(url + "/api/order/orders");
            if (axiosResponse.data.success) {
                setOrders(axiosResponse.data.data);
            } else {
                console.log("Error:", axiosResponse.data);
            }
        } catch (err) {
            console.error(err);
        }
    }

    const handleEvent = async (event, orderId) => {
        try {
            const axiosResponse = await axios.post(url + "/api/order/status", {
                orderId: orderId,
                status: event.target.value
            });
            if (axiosResponse.data.success) {
                toast.success(axiosResponse.data.message);
                await fetchOrders(); // refresh so the dropdown reflects the new status
            } else {
                toast.error(axiosResponse.data.message);
            }
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong updating the order status");
        }
    }

    useEffect(() => {
        fetchOrders();
    }, [])

    return (
        <div className="display-orders">
            <h2>Orders</h2>
            {orders.map((order, index) => (
                <div key={order._id ?? index} className="order-item">
                    <img src={assets.parcel_icon} alt="parcel icon" />
                    <p className="items">
                        {order.items.map((item, i) => (
                            i === order.items.length - 1
                                ? `${item.name.trim()} x ${item.quantity}`
                                : `${item.name.trim()} x ${item.quantity}, `
                        ))}
                    </p>
                    <p className="order-address">
                        {order.address.firstName} {order.address.lastName} {order.address.adress} {order.address.zipCode} {order.address.city} {order.address.country}
                    </p>
                    <p className="order-phone">{order.address.phone}</p>
                    <p className="order-items">Items: {order.items.length}</p>
                    <p className="order-price">price: {order.price} €</p>
                    <select name="status" value={order.status} onChange={(e) => handleEvent(e, order._id)}>
                        <option value="Order processing">Order processing</option>
                        <option value="Out for delivery">Out for delivery</option>
                        <option value="Delivered">Delivered</option>
                    </select>
                </div>
            ))}
            <p className="total-orders">Number Of Items Ordered: {orders.length}</p>
        </div>
    )
}
export default Orders