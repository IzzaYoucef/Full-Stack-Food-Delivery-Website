import userModel from "../models/userModel.js"; 
import jwt from "jsonwebtoken";

const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findOne({ _id: req.body.userId });
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {};

        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }

        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Added item to cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const removeFromCard = async (req , res) => {
    try {
        let userData = await userModel.findOne({_id:req.body.userId}) ; 
        let cartData = userData.cartData ;  
        if(cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1 ;  
        }
     await userModel.findByIdAndUpdate(req.body.id , {cartData}) ;
     res.json({success:false , message:"Removed item"}) ;
    } catch (error) {
        res.json({success:false , message:error.message}) ;
    }
}

const getListData = async (req , res) => {
    try{
        const userData = await userModel.findOne({_id:req.body.userId}) ;   
        const cartData = await userData.cartData ; 
        res.json({message:true , cartData});
    }catch(error){
        res.json({success:false , message:error.message}) ;
    }
} 

export {addToCart , removeFromCard , getListData}