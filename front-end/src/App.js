// Imports
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

//Components
import SiteNav from './components/SiteNav'
import Home from './components/Home'
import ShowCase from './components/ShowCase'
import AboutUs from './components/AboutUs'
import Map from './components/Map'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import PinForm from './components/utilities/PinForm'

const App = () => {

  const [newPin, setNewPin] = useState()


  return (
    <>
      <BrowserRouter>
        <SiteNav />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Map' element={<Map newPin={newPin} setNewPin={setNewPin}/>} />
          <Route path='/AboutUs' element={<AboutUs />} />
          <Route path='/pins/:id' element={<ShowCase />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/pinForm' element={<PinForm newPin={newPin}/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App