import express from "express"; 
import cors from "cors" 
import { connectDb } from "./config/db.js"; 
import foodRouter from "./routes/foodRoute.js";
// create an instance of the app
const app = express(); 
const PORT = 4000 ;  

// middleware 
app.use(express.json()) ; 
app.use(cors()) ;  

// Data Base Connection 
connectDb();


// food Routes  
app.use("/api/food" ,foodRouter)
// run rhe server
app.get("/" , (req , res)=> {
    res.send("API works")
})
app.listen( PORT, ()=> {
    console.log(`Server is running on http://localhost:${PORT}`) ;
})