import express from "express" ; 
import authMiddleWare from "../middleware/authMiddleware.js";
import { placeOrder, verifyPaiment } from "../controllers/orderController.js";

const orderRouter = express.Router() ; 

orderRouter.post("/place"  , authMiddleWare , placeOrder) ; 
orderRouter.post("/verify" , verifyPaiment);   

export default orderRouter ; 