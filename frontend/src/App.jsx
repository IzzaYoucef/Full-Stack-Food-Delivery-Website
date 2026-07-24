import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'

const App = () => { 
   const [showState , setShowState] = useState(false);  
   useEffect(()=>{
      console.log("Changd") ;
   } , [showState]) ; 
   
  return (
    <> 
    {showState ? <LoginPopup showState={showState} setShowState={setShowState} /> : <></>}
    <div className='app'>
       <Navbar setShowState={setShowState}/> 
       <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/Cart' element={<Cart/>}/> 
          <Route path='/order' element={<PlaceOrder />} />
       </Routes>
    </div> 
    <Footer />
    </>

  )
}

export default App