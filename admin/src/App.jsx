import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import {Routes , Route} from 'react-router-dom'
import Add from './pages/Add/Add'
import Items from './pages/Items/Items'
import Orders from './pages/Orders/Orders'
import './App.css'
const App = () => {
  return (
    <div>
        <Navbar/> 
        <div className="app-content">
            <Sidebar/> 
            <Routes>
                <Route path='/add' element={<Add/>} /> 
                <Route path='/items' element={<Items/>}/> 
                <Route path='/orders' element={<Orders/>}/>
            </Routes>
        </div>
    </div>
  )
}

export default App