import React, { useContext, useState , useEffect } from 'react'
import './Cart.css' 
import { StoreContext } from '../../context/StoreContext'
import { assets } from '../../assets/frontend_assets/assets';

const Cart = () => { 

  const {food_list, items, addToCard, removeFromCard, totalPrice, setTotalPrice} = useContext(StoreContext); 
  const [dilevery , setDelivery] = useState(true) ;  
  const [fees , setFees] = useState(0) ;
    useEffect(() => {
        setFees(dilevery ? 2 : 0); 
    }, [dilevery]); 
  return (
    <div className='cart-container'>
        <div className="item-text-details">
           <p>Items</p>
           <p>Title</p>
           <p>Price</p>
           <p>Quantity</p>
           <p>Total</p>
           <p>Remove</p>
        </div>
        <hr />
        <div className="item-infos" >
            {food_list.map((item, index) => {
                if (items[item._id] > 0) {
                  return (
                  <> 
                   <div className="added-item item-text-details" key={item._id}>
                      <img src={item.image} alt="item image" />
                      <p>{item.name}</p>
                      <p>{item.price}</p>
                      <p>{items[item._id]}</p>
                      <p>{item.price * items[item._id]}€</p>
                      <p className='cross' onClick={() => removeFromCard(item._id)}>x</p>
                  </div>
                  <hr />
                  </>
                  )
                }
                return <></>
     
            })}
        </div>  

        <div className="total-addition">
            <div className="left-side"> 
                <div className="dilevery-option">
                    <div className="children" id='d'>
                        <input type="radio" onClick={() => setDelivery(true)} name='c' id='d' /> 
                        <p>Delivery</p>
                    </div>
                    <div className="children" id='nd'>
                        <input type="radio"  onClick={() => setDelivery(false)} name='c' id='nd'/> 
                        <p>Pick up</p>
                    </div>
                </div>
                <h2>Cart totals</h2 > 
                <div className="sub-total">
                    <p className='sub-total'>Subtotal</p> 
                    <p>{totalPrice} €</p> 
                </div>
                <div className="fees" >
                    <p className='fee'className={dilevery === true ? "" : "delivery"} >Deliver fees</p>  
                    <p className={dilevery === true ? "" : "delivery"}>{fees} €</p>
                </div> 
                <div className="total" >
                  <h2>Total</h2>  
                  <h2>{totalPrice + fees}€</h2>
                </div>
                <button className='proceed-checkout'>Proceed to checkout</button>
            </div> 
            <div className="right-side">
                <p className='promo-code'>If you have a promo code , Enter it here</p>
                <div className="feild">
                  <input type="text" placeholder='Enter promo code' /> 
                  <button className='submit-ptomo-code'>Submit promo code</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Cart