// Imports
import React from 'react'
// import axios from 'axios'
// import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

//Components
import SiteNav from './components/SiteNav'
import Home from './components/Home'
import ShowCase from './components/ShowCase'
import AboutUs from './components/AboutUs'
import Map from './components/Map'
import Register from './components/auth/Register'
import Login from './components/auth/Login'

const App = () => {



  return (
    <>
      <BrowserRouter>
        <SiteNav />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Map' element={<Map/>} />
          <Route path='/AboutUs' element={<AboutUs />} />
          <Route path='/pins/:id' element={<ShowCase />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/Login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App