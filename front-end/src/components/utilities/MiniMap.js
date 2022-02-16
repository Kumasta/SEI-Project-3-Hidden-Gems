import React, { useState, useEffect } from 'react'
import ReactMapGL, { Popup, NavigationControl, FullscreenControl, GeolocateControl } from 'react-map-gl'
import { Link } from 'react-router-dom/'
import Button from 'react-bootstrap/Button'
import axios from 'axios'


const MiniMap = () => {
  const [viewPort, setViewPort] = useState({
    latitude: 51.515, //To Change!
    longitude: -0.078, //To Change!
    zoom: 6,
    height: '100%',
    width: '100%',
  })
  return(
    <div className='mini-map-container'>
    {viewPort ?
      <>
        <ReactMapGL
          mapboxAccessToken='pk.eyJ1IjoibWF5dXJyYWprdW1hciIsImEiOiJja3plNnRmbGswZjA4MnZvY24weGdhNmhhIn0.98MAuzBpjQkKuGouobKz5Q'
          mapStyle='mapbox://styles/mapbox/dark-v10'
          onMove={evt => setViewPort(evt.viewState)}
          // onClick={e => handleMapOnClick(e)}
          maxBounds={[{ lng: -11.538372871576541, lat: 48.723398702522076 }, { lng: 2.9694145317975256, lat: 60.126150999344304 }]}
          {...viewPort}
        >
        </ReactMapGL>
      </>
      :
      <p>Loading</p>
      // <Spinner />
    }
  </div >
  )
}

export default MiniMap