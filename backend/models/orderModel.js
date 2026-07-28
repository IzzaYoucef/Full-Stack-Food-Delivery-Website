import mongoose from "mongoose"; 

const orderSchema = mongoose.Schema({
    userId : {type:String , required:true} , 
    items: {type:Array , required:true} ,
    price:{type:Number , required:true}, 
    address:{type:Object , required:true} ,
    payment:{type:Boolean , default:false} , 
    status:{type:String , default:"Order processing"}, 
    date:{type:Date , default:Date.now()} 
}); 

const orderModel = mongoose.model.order || mongoose.model("order" , orderSchema); 

export default orderModel;
