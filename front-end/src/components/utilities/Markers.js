import React, { useState, useEffect } from 'react'
import { Marker, Popup } from 'react-map-gl'
import axios from 'axios'
import { Link } from 'react-router-dom/'
// import Button from 'react-bootstrap/Button'

//Components

const Markers = ({ newPin, handleCloseNewPopup }) => {
  const [popup, setPopup] = useState(null)
  const [pinData, setPindata] = useState([])

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

  console.log(newPin)

  return (
    <>
      {pinData?.map(pin => {
        return (
          <Marker latitude={pin.latitude - 0.00001} longitude={pin.longitude} key={pin.id} className='pulse'>
            <button id='map-pin' onClick={e => {
              e.preventDefault()
              setPopup(pin)
            }} />
          </Marker>
        )
      })}
      {popup &&
        <Popup latitude={popup.latitude} longitude={popup.longitude} key={popup.id} closeOnClick={false} onClose={() => {
          setPopup(null)
          handleCloseNewPopup()
          }} onOpen={handleCloseNewPopup}>
          <div>
            <Link to={`/pins/${popup.id}`}>
            <img src={popup.imageUrl} alt={popup.title} />
            <h6>{popup.title}</h6>
            </Link>
  
            <div className='df'>
              <p>{popup.typeOfPlace}</p>
              <p>{popup.avgRating}</p>
            </div>
          </div>
        </Popup>
      }
    </>
  )
}


export default Markers
