import React, { useState, useEffect, useRef, useCallback } from 'react'
import ReactMapGL, { Popup, NavigationControl, FullscreenControl, GeolocateControl } from 'react-map-gl'
import { Link } from 'react-router-dom/'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

//Components
import Markers from './utilities/Markers'
import Spinner from './utilities/Spinner'
import MapFilter from './utilities/MapFilter'
import { userIsAuthenticated } from '../enviroment/auth'


function Map({ newPin, setNewPin }) {
  const [filterOn, setFilterOn] = useState(false)
  const [filterList, setFilterList] = useState([])
  const [pinData, setPindata] = useState([])
  const [viewPort, setViewPort] = useState({
    latitude: 51.515,
    longitude: -0.078,
    zoom: 6,
  })



  const TOKEN = 'pk.eyJ1IjoibWF5dXJyYWprdW1hciIsImEiOiJja3plNnRmbGswZjA4MnZvY24weGdhNmhhIn0.98MAuzBpjQkKuGouobKz5Q'

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
            mapboxAccessToken={TOKEN}
            mapStyle='mapbox://styles/mapbox/dark-v10'
            onMove={evt => setViewPort(evt.viewState)}
            onClick={e => handleMapOnClick(e)}
            maxBounds={[{ lng: -11.538372871576541, lat: 48.723398702522076 }, { lng: 2.9694145317975256, lat: 60.126150999344304 }]}
            height={'100%'}
            width={'100%'}
            {...viewPort}
          >
            <Markers viewPort={viewPort} setViewPort={setViewPort} filterList={filterList} handleCloseNewPopup={handleCloseNewPopup} />
            <NavigationControl visualizePitch={true} />
            <FullscreenControl />
            <GeolocateControl />
            {newPin &&
              <Popup latitude={newPin.latitude} longitude={newPin.longitude} closeOnClick={false} onClose={() => setNewPin(null)}>
                {userIsAuthenticated() ?
                  <div>
                    <Link to={{
                      pathname: '/pinform',
                      state: { newPin: true }
                    }}>
                      <Button className='btn-dark btn' variant='primary'>Create new pin?</Button>
                    </Link>
                  </div>
                  :
                  <div >
                    <p>Want to make a new pin?</p>
                    <Link className='btn-dark btn' variant='primary' to={'/Register'}>Register</Link>
                    <Link className='btn-dark btn' variant='primary' to={'/Login'}>Login</Link>
                  </div>
                }

              </Popup>
            }
            <MapFilter pinData={pinData} filterList={filterList} setFilterList={setFilterList} setFilterOn={setFilterOn} />
            {/* <GeocoderComp viewPort={viewPort}/> */}
          </ReactMapGL>
        </>
        :
        <Spinner />
      }
    </div >
  )
}

export default Map;
