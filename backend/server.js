import express from "express"; 
import cors from "cors" 
import { connectDb } from "./config/db.js"; 
import foodRouter from "./routes/foodRoute.js"; 
import userRouter from "./routes/userRoute.js"; 
import "dotenv/config"
import cardRouter from "./routes/cartRoute.js";

import orderRouter from "./routes/orderRoute.js";
// create an instance of the app
const app = express(); 
 

// middleware 
app.use(express.json()) ; 
app.use(cors()) ;  

// Data Base Connection 
connectDb();


// food Routes  
app.use("/api/food" ,foodRouter); 
app.use("/images" , express.static("uploads")); 

// User Routes
app.use("/api/user" , userRouter); 

// cart Routes
app.use("/api/cart" , cardRouter); 

// order Routes 
app.use("/api/order", orderRouter);

// run rhe server 
app.get("/" , (req , res)=> {
    res.send("API works")
})
app.listen( process.env.PORT, ()=> {
    console.log(`Server is running on http://localhost:${process.env.PORT}`) ;
})