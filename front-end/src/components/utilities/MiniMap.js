import React, { useState, useEffect } from 'react'
import ReactMapGL, { Marker } from 'react-map-gl'
import { useLocation } from 'react-router-dom'

const MiniMap = ({ latLng, setFormData, formData }) => {
  const location = useLocation()
  // console.log('Location: ', location.pathname.includes('/edit'))
  const [viewPort, setViewPort] = useState({
    latitude: null,
    longitude: null,
    zoom: 10,
    height: '100%',
    width: '100%',
  })

  useEffect(() => {
    setViewPort({ ...viewPort, latitude: latLng.latitude, longitude: latLng.longitude })
    // console.log(viewPort)
  }, [latLng])

  const handleDrag = (e) => {
    console.log(e.lngLat.lat)
    console.log(e.lngLat.lng)
    setFormData({...formData, latitude: e.lngLat.lat, longitude: e.lngLat.lng})
  }

  return (
    <div className='mini-map-container'>
      {viewPort ?
        <>
          <ReactMapGL
            mapboxAccessToken='pk.eyJ1IjoibWF5dXJyYWprdW1hciIsImEiOiJja3plNnRmbGswZjA4MnZvY24weGdhNmhhIn0.98MAuzBpjQkKuGouobKz5Q'
            mapStyle='mapbox://styles/mapbox/dark-v10'
            onMove={evt => setViewPort(evt.viewState)}
            // onClick={e => handleMapOnClick(e)}
            // maxZoom={16}
            // minZoom={10}
            maxBounds={[{ lng: -11.538372871576541, lat: 48.723398702522076 }, { lng: 2.9694145317975256, lat: 60.126150999344304 }]}
            {...viewPort}
          >
            <Marker id='map-pin' classname='map-pin' latitude={latLng.latitude} longitude={latLng.longitude} draggable={location.pathname.includes('/edit') || location.pathname.includes('/pinform') ? true : false} onDragEnd={handleDrag}>

            </Marker>
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