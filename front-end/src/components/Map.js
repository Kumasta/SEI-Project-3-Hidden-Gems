import React, { useState, useEffect } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'

function Map() {
  const [markerLocal, setMarkerLocal] = useState([])
  const [popup, setPopup] = useState(null)
  const [viewPort, setViewPort] = useState({
    latitude: 51.515,
    longitude: -0.078,
    zoom: 10,
    pitch: 0,
  })

  const handleMapOnClick = (e) => {
    const { lng, lat } = e.lngLat
    console.log(lng, lat)
    setMarkerLocal([...markerLocal, { latitude: lat, longitude: lng }])
    console.log(e)
  }


  return (
    <div className='map-container'>
      {viewPort ?
        <ReactMapGL
          mapboxAccessToken='pk.eyJ1IjoibWF5dXJyYWprdW1hciIsImEiOiJja3plNnRmbGswZjA4MnZvY24weGdhNmhhIn0.98MAuzBpjQkKuGouobKz5Q'
          height='100%'
          width='100%'
          mapStyle='mapbox://styles/mapbox/dark-v10'
          {...viewPort}
          onDrag={viewPort => {
            setViewPort(viewPort)
          }}
          onZoom={viewPort => setViewPort(viewPort)}
          onClick={e => handleMapOnClick(e)}
          maxBounds={[{ lng: -11.538372871576541, lat: 48.723398702522076 }, { lng: 2.9694145317975256, lat: 60.126150999344304 }]}
        >
          {/* {console.log(ReactMapGL)} */}
          {markerLocal?.map(coord => {
            return (
              <Marker latitude={coord.latitude} longitude={coord.longitude} key={Math.random()}>
                <span onClick={() => setPopup(coord)}>
                  ❤️
                </span>
              </Marker>
            )
          })}
          {popup &&
            <Popup
              latitude={popup.latitude}
              longitude={popup.longitude}
              // closeOnClick={true}
              onClose={() => setPopup(null)}
            >
              <div>
                This is a popup!
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
