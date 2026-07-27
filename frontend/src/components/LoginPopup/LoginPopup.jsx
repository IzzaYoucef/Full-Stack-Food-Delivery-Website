import React, { useContext, useEffect, useState } from "react"; 
import './LoginPopup.css' 
import { assets } from "../../assets/frontend_assets/assets";
import axios from "axios"
import { StoreContext } from "../../context/StoreContext";


const LoginPopup = ({showState , setShowState}) => { 

    const [currentState , setCurrentStat] = useState("SignUp") ; 
    const [userData , setUserData] = useState({
        name:"" ,
        email:"", 
        password:"" 
    });  

    const {token , setToken , url} = useContext(StoreContext); 

    const handleOnchangeEvent = (e) => { 

       let name = e.target.name ; 
       let value = e.target.value ;  
       setUserData((prev)=>({...prev , [name]:value})) ;  
    }
    const handleSignUp = async (e)=>{
        let newURL ; 
        if(currentState === "SignUp") {
            newURL = url + "/api/user/register" ; 
        }else {
            newURL = url + "/api/user/login" ; 
        }

        e.preventDefault(); 
        const axiosResponse = await axios.post(`${newURL}` , userData);    

        if(axiosResponse.data.success){
            setToken(axiosResponse.data.token) ;
            localStorage.setItem("token" , axiosResponse.data.token);    
            setShowState(false);
        }else{
            window.alert(axiosResponse.data);
        }
    } 

    useEffect(()=>{
        console.log(userData) ;
    }, [userData]) ;  
    useEffect(()=>{
        console.log("token updated :",token) ; 
    } , [token]) ; 
    return (
        <div className="login-pop-up">
            <form onSubmit={(e)=>handleSignUp(e)} className="form-validation">
                <div className="head-info">
                    <h1>{currentState}</h1> 
                    <img onClick={()=>setShowState(false)} src={assets.cross_icon} alt="" />  

                </div>
                {currentState === "SignUp" 
                ?<div className="form-login-pop-up-buttons" id="sign-in">
                    <input type="text" name="name"  onChange={(e)=>handleOnchangeEvent(e)} placeholder="Your name" required /> 
                    <input type="text" name="email" onChange={(e)=>handleOnchangeEvent(e)} placeholder="Your email" required />  
                    <input type="password" name="password" onChange={(e)=>handleOnchangeEvent(e)} placeholder="Your password" required />
                </div> :  
                <div className="form-login-pop-up-buttons" id="login">
                    <input type="email" name="email" onChange={(e)=>handleOnchangeEvent(e)} placeholder="Your email" required/> 
                    <input type="password" name="password" onChange={(e)=>handleOnchangeEvent(e)} placeholder="Your password" required />
                </div>
                }
                <button type="submit" className="btn">{currentState === "SignUp" ? "Create account" : "Login"}</button> 
                <div className="login-pop-up-condtions">
                    <input type="checkbox" /> 
                    <p>By continuing , i agree to the terms of use & privacy policy.</p>
                </div> 
                {currentState === "SignUp" 
                 ? <p>Already have an account ? <span onClick={()=>setCurrentStat("Login")}>Login here </span></p> 
                 : <p>Create a new account ? <span onClick={()=>setCurrentStat("SignUp")}>Sign up here</span></p> 
                }
            </form>
        </div>
    )
}

export default LoginPopup ;