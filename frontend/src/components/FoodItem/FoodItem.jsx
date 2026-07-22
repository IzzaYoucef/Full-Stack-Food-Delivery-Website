import React, { useContext } from 'react'
import { assets } from '../../assets/frontend_assets/assets'
import './FoodItem.css'; 
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({ id, name, image, price, description }) => { 
  const { items, addToCard, removeFromCard } = useContext(StoreContext);

  return (
    <div className='food-item'>
      <div className="food-item-image-container">
        <img src={image} alt={`${name} Image`} />
        {!items[id] 
          ? <img 
              src={assets.add_icon_white} 
              alt="add item" 
              onClick={() => addToCard(id)} 
              className='add' 
            />
          : <div className='add-item-details'> 
              <img src={assets.add_icon_green} alt="" onClick={() => addToCard(id)} /> 
              <p>{items[id]}</p>  
              <img src={assets.remove_icon_red} alt="" onClick={() => removeFromCard(id)} />
            </div> 
        }
      </div>
      <div className="title-rating-description-price">
        <div className="title-rating">
          <h2>{name}</h2> 
          <img src={assets.rating_starts} alt="rating stars" />
        </div> 
        <p className="descripton">{description}</p> 
        <p className="price">{price}$</p>
      </div>
    </div>
  )
}

export default FoodItem;