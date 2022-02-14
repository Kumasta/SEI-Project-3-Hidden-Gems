import React, { useState, useEffect } from 'react'
import ReactMapGL, { Popup, NavigationControl, FullscreenControl, GeolocateControl } from 'react-map-gl'
import { Link } from 'react-router-dom/'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

//Components
import Markers from './utilities/Markers'
import Spinner from './utilities/Spinner'
import MapFilter from './utilities/MapFilter'

function Map({ newPin, setNewPin }) {
  const [filterOn, setFilterOn] = useState(false)
  const [filterList, setFilterList] = useState([])
  const [pinData, setPindata] = useState([])
  const [viewPort, setViewPort] = useState({
    latitude: 51.515,
    longitude: -0.078,
    zoom: 6,
    height: '100%',
    width: '100%',
  })


  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/pins')
        console.log(data)
        setPindata(data)
        setFilterList(data)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [])

  const handleMapOnClick = (e) => {
    const { lng, lat } = e.lngLat
    setNewPin({ latitude: lat, longitude: lng })
  }

  const handleCloseNewPopup = () => {
    setNewPin(null)
    console.log('Done')
  }

  return (
    <div className='map-container'>
      {viewPort ?
        <>
          <ReactMapGL
            mapboxAccessToken='pk.eyJ1IjoibWF5dXJyYWprdW1hciIsImEiOiJja3plNnRmbGswZjA4MnZvY24weGdhNmhhIn0.98MAuzBpjQkKuGouobKz5Q'
            mapStyle='mapbox://styles/mapbox/dark-v10'
            onMove={evt => setViewPort(evt.viewState)}
            onClick={e => handleMapOnClick(e)}
            maxBounds={[{ lng: -11.538372871576541, lat: 48.723398702522076 }, { lng: 2.9694145317975256, lat: 60.126150999344304 }]}
            {...viewPort}
          >
            <Markers filterList={filterList} handleCloseNewPopup={handleCloseNewPopup} />
            <NavigationControl visualizePitch={true} />
            <FullscreenControl />
            <GeolocateControl trackUserLocation={true} />
            {newPin &&
              <Popup latitude={newPin.latitude} longitude={newPin.longitude} closeOnClick={false} onClose={() => setNewPin(null)}>
                <div>
                  <Link to={{
                    pathname: '/pinform',
                    state: { newPin: true }
                  }}>
                    <Button variant='primary'>Create new pin?</Button>
                  </Link>
                </div>
              </Popup>
            }
            <MapFilter pinData={pinData} filterList={filterList} setFilterList={setFilterList} setFilterOn={setFilterOn}/>
          </ReactMapGL>
        </>
        :
        <Spinner />
      }
    </div >
  )
}

export default Map;
