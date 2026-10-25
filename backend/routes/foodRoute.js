import express from "express" 
import {addFood, listFood, removeItem} from "../controllers/foodConroller.js"
import fs from 'fs'
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const foodRouter = express.Router() ;    

// storage engine
// Locally: images are saved in backend/uploads.
// On Vercel the disk is read-only, so the image is kept in memory and saved in the database instead.
const uploadsDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "uploads");
const storage = process.env.VERCEL
    ? multer.memoryStorage()
    : multer.diskStorage({
        destination: uploadsDir,
        filename:(req , file , cb)=>{
            return cb(null , `${Date.now()}${file.originalname}`)
        }
    })

const upload = multer({storage:storage}); 


foodRouter.post("/add" , upload.single("image") ,addFood); 
foodRouter.get("/list" , listFood )
foodRouter.post("/remove" , removeItem);
export default foodRouter

