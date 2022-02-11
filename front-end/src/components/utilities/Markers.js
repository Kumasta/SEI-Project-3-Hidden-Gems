import React, { useState } from 'react'
import { Popup } from 'react-map-gl'

const Marker = ({ pin }) => {
  const [popup, setPopup] = useState(false)

  return (
    <>
      <Marker latitude={pin.latitude} longitude={pin.longitude} key={pin.id}>
        <span onClick={() => setPopup(true)}>
          ❤️
        </span>
      </Marker>
      {popup &&
        <Popup
          latitude={pin.latitude}
          longitude={pin.longitude}
          closeOnClick={true}
          onClose={() => setPopup(false)}
        >
          <div>
            <h4>{pin.title}</h4>
          </div>
        </Popup>
      }
    </>
  )
}


export default Marker
