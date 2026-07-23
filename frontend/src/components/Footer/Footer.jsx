import React from "react"; 
import { assets } from "../../assets/frontend_assets/assets"; 
import './Footer.css'

const Footer = () => {
    return (
        <div className="footer" id="contact-us">
            <div className="footerContent">
                <div className="left-side-content">
                    <img src={assets.logo} alt="" /> 
                    <p className="footer-description">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi omnis architecto, veniam illo laboriosam possimus, reprehenderit voluptatibus assumenda distinctio optio inventore veritatis provident dolore ipsum voluptates consequatur doloribus molestias eaque.
                    </p>
                    <div className="social-media-icons">
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                        <img src={assets.linkedin_icon} alt="" />
                    </div>
                </div>
                <div className="center-content">
                    <h2>Company</h2> 
                    <ul>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>
                <div className="right-side-content">
                    <h2>Get in touch</h2> 
                    <div className="info">
                        <p>+33758404280</p>
                        <p>youcefizza948@gmail.com</p>
                    </div>
                </div>
            </div> 
            <hr />
            <p className="copyright">Copyright 2026 © Tomato.com - All Right Reserved. </p>
        </div>
    )
} 
export default Footer ; 