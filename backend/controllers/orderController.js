import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import Stripe from "stripe";
import { response } from "express";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5173";

    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            address: req.body.address,
            price: req.body.price
        });
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        // Construction de la ligne de commande pour Stripe
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "eur",
                product_data: {
                    name: item.name,
                },
                unit_amount: Math.round(item.price * 100),
            },
            quantity: item.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        });

        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}; 
 
const verifyPaiment = async (req, res) => {
    try {
        const { orderId, success } = req.body;
        if (success === "true") {
            res.json({ success: true, message: "Paiment accepted" });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Not paid" });
        }
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}; 

const userOrders = async (req , res) => {
    const userOrders = await orderModel.find({userId:req.body.userId}) ; 
    try {
        res.json({success:true , data:userOrders}) ;
    }catch(error) {
        res.json({success:false , data:error.message});
    }
}

export { placeOrder , verifyPaiment  , userOrders };