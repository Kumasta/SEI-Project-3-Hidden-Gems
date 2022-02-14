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
import CommentForm from './components/utilities/CommentForm'

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
          <Route path='/pins/:id/comment' element={<CommentForm/>} />
        </Routes>
        <ScrollToTop />
      </BrowserRouter>
    </>
  )
}

export default App