import React, { useState, useEffect } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import axios from 'axios'

function Map({ pinData }) {
  // const [markerLocal, setMarkerLocal] = useState([])
  const [popup, setPopup] = useState(null)

  // const [pinList, SetPinList] = useState([])

  const [viewPort, setViewPort] = useState({
    latitude: 51.515,
    longitude: -0.078,
    zoom: 6,
    height: '100%',
    width: '100%',
  })

  // const handleMapOnClick = (e) => {
  //   const { lng, lat } = e.lngLat
  //   console.log(lng, lat)
  //   setMarkerLocal([...markerLocal, { latitude: lat, longitude: lng }])
  //   console.log(e)
  // }


  return (
    <div className='map-container'>
      {viewPort ?
        <ReactMapGL
          mapboxAccessToken='pk.eyJ1IjoibWF5dXJyYWprdW1hciIsImEiOiJja3plNnRmbGswZjA4MnZvY24weGdhNmhhIn0.98MAuzBpjQkKuGouobKz5Q'
          mapStyle='mapbox://styles/mapbox/dark-v10'
          {...viewPort}
          onMove={evt => setViewPort(evt.viewState)}
          // onClick={e => handleMapOnClick(e)}
          maxBounds={[{ lng: -11.538372871576541, lat: 48.723398702522076 }, { lng: 2.9694145317975256, lat: 60.126150999344304 }]}
        >
          {pinData?.map(pin => {
            return (
                <Marker latitude={pin.latitude} longitude={pin.longitude} key={pin.id} anchor={'bottom-left'}>
                  <button id='map-pin' onClick={e => {
                    // e.preventDefault()
                    setPopup(pin)
                    console.log(pin)
                  }}/>
                </Marker>
            )
          })}
          {popup &&
              <Popup latitude={popup.latitude} longitude={popup.longitude} key={popup.i + 'pop'} onClose={() => setPopup(null)} closeOnClick={true} >
              <div>
                {/* <img src={pop.imageUrl} alt={pop.title} /> */}
                <h3>{popup.title}</h3>
              </div>
            </Popup>
          }
        </ReactMapGL>
        :
        <h1>Loading</h1>
      }
    </div >
  )
}

export default Map;
