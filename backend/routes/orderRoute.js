import express from "express" ; 
import authMiddleWare from "../middleware/authMiddleware.js";
import { placeOrder, userOrders, verifyPaiment } from "../controllers/orderController.js";

const orderRouter = express.Router() ; 

orderRouter.post("/place"  , authMiddleWare , placeOrder) ; 
orderRouter.post("/verify" , verifyPaiment);    
orderRouter.post("/userOrders" , authMiddleWare , userOrders);

export default orderRouter ; 