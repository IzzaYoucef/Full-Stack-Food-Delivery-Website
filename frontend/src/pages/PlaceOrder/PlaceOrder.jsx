import React, { useContext } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
const PlaceOrder = () => {
  const { totalPrice } = useContext(StoreContext);
  return (
    <div className="place-order">
      <div className="left-side">
        <p className="title">Delivery information</p>
        <div className="input-feilds">
          <div className="multi-feilds">
            <input type="text" placeholder="Firset name" />
            <input type="text" placeholder="Last name" />
          </div>
          <div>
            <input type="text" placeholder="Email adress" />
          </div>
          <div>
            <input type="text" placeholder="Street" />
          </div>
          <div className="multi-feilds">
            <input type="text" placeholder="City" />
            <input type="text" placeholder="State" />
          </div>
          <div className="multi-feilds">
            <input type="text" placeholder="Zip code" />
            <input type="text" placeholder="Country" />
          </div>
          <div>
            <input type="text" placeholder="Phone" />
          </div>
        </div>
      </div>
      <div className="total-addition">
        <div className="left-side">
          <h2>Cart totals</h2>
          <div className="sub-total">
            <p className="sub-total">Subtotal</p>
            <p>{totalPrice} €</p>
          </div> 
          <div className="fees">
            <p className="fee">Deliver fees</p>
            <p>0 €</p>
          </div>
          <div className="total">
            <h2>Total</h2>
            <h2>{totalPrice}€</h2>
          </div>
          <button className="proceed-checkout">Proceed to payment</button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
