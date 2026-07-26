import userModel from "../models/userModel.js"; 
import bcrypt from "bcrypt" 
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import validator from "validator" 

const createTocken = (id)=>{
    return jwt.sign({id} , process.env.JWT_SECRET )
}

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Email not valid" });
    }

    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "Email already exists in the system" });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Password length must be greater than 8" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const savedUser = await user.save(); 
    const token = createTocken(savedUser._id) ; 
    return res.json({ success: true, user: savedUser , token:token });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const loginUser = async (req , res) => {
    try {
        const {email , password} = req.body ;  
        const user = await userModel.findOne({email}) ;  
        if(!user) {
            return res.json({success:false , message:"User not found"}); 
        } 
        const isMatchPassword = await bcrypt.compare(password , user.password);
        if(!isMatchPassword) {
            return res.json({success:false , message:"invalid password"})
        }
        const token = createTocken(user._id) ;  
        return res.json({
            success:true , 
            message:`Welcome ${user.name}`
        })

    }catch(error){
        console.log("error");
        res.json({success:false , message:"Error"}) ;
    }

} 

export {loginUser , registerUser};