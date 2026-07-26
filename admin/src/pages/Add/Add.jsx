import React from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import { useState } from "react";
import { data } from "react-router-dom";
import { useEffect } from "react"; 
import axios from "axios";
import { toast } from "react-toastify";
const Add = () => {
  const [image, setImage] = useState(false);
  const [foods , setFoods] = useState({
    name:"", 
    description:"", 
    price:0 ,
    category:"salad" 
  }) ; 

  const addClickHandler = (e)=> {
    let name = e.target.name ; 
    let value = e.target.value ; 
    setFoods(data=>({...data, [name]:value}))
  } 

const onsubmitHandler = async (event) => { 
  const url = "http://localhost:4000"; 
  event.preventDefault(); 
  const formData = new FormData(); 
  formData.append("name", foods.name);
  formData.append("description", foods.description);
  formData.append("price", foods.price); 
  formData.append("category", foods.category); 
  formData.append("image", image);

  const axiosResponse = await axios.post(`${url}/api/food/add`, formData);
  if (axiosResponse.data.success) { 
    console.log("formData sent Successfully"); 
    setFoods({
      name: "", 
      description: "", 
      price: 0,
      category: "salad" 
    }); 
    setImage(false);  
    toast.success("Food added successfully") ; 
  } else {
    console.log("NOPE, OOPS Something wrong");
    toast.error(axiosResponse.data.message)
  }
}
  useEffect(()=>{
    console.log(foods);
  } , [foods])
  return (
    <form onSubmit={onsubmitHandler}>
      <div className="add-container">
        <div className="upoald-image info">
          <p>Upload image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file" 
            name="image"
            required
            hidden
            id="image"
          />
        </div>

        <div className="product-name info">
          <p>Product name</p>
          <input onChange={addClickHandler} value={foods.name} type="text" name="name" placeholder="type here" />
        </div>
        <div className="product-description info">
          <p>product description</p>
          <textarea
            name="description"
            placeholder="Write content here" 
            onChange={addClickHandler} 
            value={foods.description}
          ></textarea>
        </div>
        <div className="product-category-price ">
          <div className="category">
            <p>Product category</p>
            <select name="category" id="category" value={foods.category} onChange={addClickHandler}>
              <option value="salad">Salad</option>
              <option value="roll">Roll</option>
              <option value="pasta">Pasta</option>
              <option value="sandwich">Sandwich</option>
              <option value="desert">Dessert</option>
              <option value="cake">Cake</option>
            </select>
          </div>
          <div className="price">
            <p>Product price</p>
            <input type="number" value={foods.price} onChange={addClickHandler} required name="price" placeholder="$20" />
          </div>
        </div>
        <button className="add" >Add</button>
      </div>
    </form>
  );
};

export default Add;
