import express from 'express' 
import { addToCart, getListData, removeFromCard } from '../controllers/cartController.js';
import authMiddleWare from '../middleware/authMiddleware.js';

// create card router  

const cardRouter = express.Router() ; 


// create roures  

cardRouter.post("/add" , authMiddleWare , addToCart) ; 
cardRouter.post("/remove", authMiddleWare , removeFromCard); 
cardRouter.get("/list" , authMiddleWare , getListData) ; 

export default cardRouter ; 