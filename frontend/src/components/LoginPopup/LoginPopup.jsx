import React, { useState } from "react"; 
import './LoginPopup.css' 
import { assets } from "../../assets/frontend_assets/assets";

const LoginPopup = ({showState , setShowState}) => { 

    const [currentState , setCurrentStat] = useState("SignUp") ; 

    return (
        <div className="login-pop-up">
            <form className="form-validation">
                <di className="head-info">
                    <h1>{currentState}</h1> 
                    <img onClick={()=>setShowState(false)} src={assets.cross_icon} alt="" />  

                </di>
                {currentState === "SignUp" 
                ?<div className="form-login-pop-up-buttons" id="sign-in">
                    <input type="text" placeholder="Your name" required /> 
                    <input type="text" placeholder="Your email" required />  
                    <input type="password" placeholder="Your password" required />
                </div> :  
                <div className="form-login-pop-up-buttons" id="login">
                    <input type="text" placeholder="Your email" /> 
                    <input type="password" placeholder="Your password" />
                </div>
                }
                <button className="btn">{currentState === "SignUp" ? "Create account" : "Login"}</button> 
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