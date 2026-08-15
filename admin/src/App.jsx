import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import {Routes , Route} from 'react-router-dom' 
import { ToastContainer } from 'react-toastify';
import Add from './pages/Add/Add'
import Items from './pages/Items/Items'
import Orders from './pages/Orders/Orders'
import './App.css'
const App = () => { 
  const url = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000" ; 
  return (
    <div>
        <Navbar/>  
        <ToastContainer/>
        <div className="app-content">
            <Sidebar/> 
            <Routes>
                <Route path='/add' element={<Add  url={url} />} /> 
                <Route path='/items' element={<Items url={url} />}/> 
                <Route path='/orders' element={<Orders url={url} />}/>
            </Routes>
        </div>
    </div>
  )
}

export default App