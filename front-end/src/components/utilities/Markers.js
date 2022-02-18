import React, { useState } from 'react'
import { Marker, Popup } from 'react-map-gl'
import { Link } from 'react-router-dom/'
// import Button from 'react-bootstrap/Button'

//Components

const Markers = ({ viewPort, setViewPort, filterList, handleCloseNewPopup }) => {
  const [popup, setPopup] = useState(null)

  return (
    <>
      {filterList?.map(pin => {
        return (
          <Marker latitude={pin.latitude + 0.000001} longitude={pin.longitude} key={pin.id} className='pulse' anchor='bottom-left'>
            <button id='map-pin' onClick={e => {
              e.preventDefault()
              setPopup(pin)
              setViewPort({...viewPort, longitude: pin.longitude, latitude: pin.latitude})
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
              <p>{popup.avgRating === 'Not rated yet' ? popup.avgRating : popup.avgRating + ' 💎'}</p>
            </div>
          </div>
        </Popup>
      }
    </>
  )
}


export default Markers
