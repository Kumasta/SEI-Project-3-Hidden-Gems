// Imports
<<<<<<< HEAD
import React, { useState } from 'react'
=======
import axios from 'axios'
import React, { useState, useEffect } from 'react'
>>>>>>> 2ef505fe28f9eb7d486ce05b3eec6a68d2bcf60d
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
<<<<<<< HEAD
  const [newPin, setNewPin] = useState()
=======


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

>>>>>>> 2ef505fe28f9eb7d486ce05b3eec6a68d2bcf60d
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