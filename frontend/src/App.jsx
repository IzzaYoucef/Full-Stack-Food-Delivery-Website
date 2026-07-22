import React from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'

const App = () => {
  return (
    <>
    <div className='app'>
       <Navbar/> 
       <Routes>
          <Route path='/' element={<Home/>}/>
       </Routes>
    </div> 
    <Footer />
    </>

  )
}

export default App