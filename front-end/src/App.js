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

const App = () => {


  const [ pinData, setPindata ] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/pins')
        console.log(data)
        setPindata(data)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [])

  return (
    <>
      <BrowserRouter>
        <SiteNav />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Map' element={<Map pinData={pinData}/>} />
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