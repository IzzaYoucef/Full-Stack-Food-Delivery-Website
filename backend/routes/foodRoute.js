import express from "express" 
import {addFood, listFood, removeItem} from "../controllers/foodConroller.js"
import fs from 'fs'
import multer from "multer";

const foodRouter = express.Router() ;    

// storage engine 
const storage = multer.diskStorage({
    destination:"uploads", 
    filename:(req , file , cb)=>{
        return cb(null , `${Date.now()}${file.originalname}`)
    }
})  

const upload = multer({storage:storage}); 


foodRouter.post("/add" , upload.single("image") ,addFood); 
foodRouter.get("/list" , listFood )
foodRouter.post("/remove" , removeItem);
export default foodRouter

