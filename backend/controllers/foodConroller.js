import foodModel from "../models/foodModels.js" 
import multer from "multer"  
import fs from "fs"

const addFood = async (req , res)=>{
    let image_fileName = `${req.file.filename}` ;  
    
    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        image:image_fileName , 
        category:req.body.category
    }) ;  

    try{
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
        res.json({seccess:true , data:foods}) ; 
    }catch(error) {
        res.json({success:false , data:"Somthing wrong"}) ; 
        console.log(error.message)
    }
} 

const removeItem = async (req , res)=> {

    try {
        const food = await foodModel.findById(req.body.id) ; 
        fs.unlink(`uploads/${food.image}` , ()=>{}) ;
        await foodModel.findByIdAndDelete(req.body.id) ; 
        res.json({success:true , message:"food has been deleted"})
    }catch(error){
        res.json({success:false , message:"error , something wrong"})
        console.log(error.message); 
    }
}
export {addFood , listFood , removeItem}