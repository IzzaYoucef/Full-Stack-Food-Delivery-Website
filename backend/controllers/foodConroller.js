import foodModel from "../models/foodModels.js" 
import multer from "multer"  
import fs from "fs"

const addFood = async (req , res)=>{
    try{
        if (!req.file) {
            return res.json({success:false , message:"Please choose an image"});
        }
        // disk upload -> file name ; memory upload (Vercel) -> the image itself as a data URL
        const image_fileName = req.file.filename
            ?? `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}` ;

        const food = new foodModel({
            name:req.body.name,
            description:req.body.description,
            price:req.body.price,
            image:image_fileName ,
            category:req.body.category
        }) ;
        await food.save(); 
        res.json({success:true , message:"Food added to the Data Base"}) ; 
    }catch(error){
        console.log(error) ; 
        res.json({success:false , message:"Did not add the food , error cached !"});
    }
} 
const listFood = async(req , res)=>{
    try{
        const foods = await foodModel.find({}) ;  
        res.json({success:true , data:foods}) ; 
    }catch(error) {
        res.json({success:false , data:"Somthing wrong"}) ; 
        console.log(error.message)
    }
} 

const removeItem = async (req , res)=> {

    try {
        const food = await foodModel.findById(req.body.id) ; 
        // images stored as data URLs (Vercel) have no file to delete
        if (food && !food.image.startsWith("data:")) fs.unlink(`uploads/${food.image}` , ()=>{}) ;
        await foodModel.findByIdAndDelete(req.body.id) ; 
        res.json({success:true , message:"food has been deleted"})
    }catch(error){
        res.json({success:false , message:"error , something wrong"})
        console.log(error.message); 
    }
}
export {addFood , listFood , removeItem}