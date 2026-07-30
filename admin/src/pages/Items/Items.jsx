import React from 'react'
import './Items.css' 
import axios from 'axios';
import { useEffect , useState } from 'react';
import {toast} from 'react-toastify'
const Items = ({url}) => { 

  const [list , setList] = useState([]) ; 
  const fetchList = async () => {
    const axiosResponse =  await axios.get(`${url}/api/food/list`) ; 
    console.log(axiosResponse.data);  
    if(axiosResponse.data.success) {
      console.log("sccess") ; 
      setList(axiosResponse.data.data) ; 
    } else{
      console.log("error : " , axiosResponse.data.message);
    }
  } 

  useEffect(()=> {
    fetchList();  
    console.log(list);
  } , []); 

  const handleRemoveFood = async (foodId)=>{ 
    const axiosResponse = await axios.post(`${url}/api/food/remove` , {id:foodId}) ; 

    if(axiosResponse.data.success){
      console.log("food has been deleted");  
      await fetchList();
      toast.success(axiosResponse.data.message);
    }else {
      console.log("somthing wrong")
    }
  }
  return (
    <div className='food-items-list'>
      <p>All Foods List</p> 

      <div className="table-format title">
         <p>Image</p>
         <p>Name</p>
         <p>Category</p>
         <p>Price</p>
         <p>Action</p>
      </div> 
      {list.map((item , index)=>{
         return (
          <div className="table-format list-item" key={index}>
            <img src={`${url}/images/${item.image}`} alt="" /> 
            <p>{item.name}</p> 
            <p>{item.category}</p> 
            <p>{item.price} €</p> 
            <p className='cross' onClick={()=>handleRemoveFood(item)}>X</p>
          </div>
         )
      })}
    </div>
  )
}

export default Items