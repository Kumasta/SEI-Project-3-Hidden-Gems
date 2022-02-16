// Imports
import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

//Components
import SiteNav from './components/SiteNav'
import Home from './components/Home'
import ShowCase from './components/ShowCase'
import About from './components/About'
import Map from './components/Map'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import PinForm from './components/utilities/PinForm'
import ScrollToTop from './components/utilities/ScrollToTop'
import PinFormEdit from './components/utilities/PinFormEdit'
import Profile from './components/Profile'
import ProfileEdit from './components/utilities/ProfileEdit'


const App = () => {

  const [newPin, setNewPin] = useState()
  const [pinData, setPindata] = useState([])
  
  return (
    <>
      <BrowserRouter>
        <SiteNav />
        <Routes>
          <Route path='/' element={<Home pinData={pinData} setPindata={setPindata}/>} />
          <Route path='/Map' element={<Map newPin={newPin} setNewPin={setNewPin}/>} />
          <Route path='/About' element={<About />} />
          <Route path='/pins/:id' element={<ShowCase />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/pinForm' element={<PinForm newPin={newPin}/>} />
          <Route path='/pins/:id/edit' element={<PinFormEdit />} />
          <Route path='/profile/:userId' element={<Profile />} />
          <Route path='/profile/:userId/edit' element={<ProfileEdit />} />
        </Routes>
        <ScrollToTop />
      </BrowserRouter>
    </>
  )
}

export default App