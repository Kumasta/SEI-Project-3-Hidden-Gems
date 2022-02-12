import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

//Utility Components
import HeroCarousel from './utilities/HeroCarousel'
import Spinner from './utilities/Spinner'

//React Select Components
import Select from 'react-select'

//React Bootstrap Components
import Card from 'react-bootstrap/Card'


const Home = ({ pinData, setPindata }) => {

  const [hasError, setHasError] = useState({ error: false, message: '' })
  const [filteredPins, setFilteredPins] = useState([])
  const [filterList, setFilterList] = useState([])


  // const options = [ //Check whether we want to search by the tags
  //   { value: 'art', label: 'art' },
  //   { value: 'hotel', label: 'hotel' },
  //   { value: 'city walk', label: 'city walk' },
  // ]

  // const [searchBar, setSearchBar] = useState({
  //   pinTags: [],
  // })

  useEffect(() => {
    const getPinsData = async () => {
      try {
        const { data } = await axios.get('/api/pins')
        console.log('Get data request', data)
        setPindata(data)
      } catch (error) {
        setHasError({ error: true, message: error.message })
      }
    }
    getPinsData()
  }, [setPindata])

  //?? Filtered ratings
  const filteredRatings = pinData.filter(pin => {
    const topRatings = pin.averageRating >= 3
    console.log('top ratings', topRatings)
    return topRatings
  })

  useEffect(() => {
    if (pinData.length) {
      const filteredPins = []
      pinData.map(pin => { filteredPins.push(pin.tags) })
      setFilterList(filteredPins)
    }
  }, [pinData])

  const showFilteredPins = (e) => {
    const search = e.target.value
    console.log('user search', search)
    const pinsSearched = pinData.filter(pin => pin.tags.includes(search))
    setFilteredPins(pinsSearched)
  }


  return (

    <>
      <section className='hero-container'>
        {pinData ?
          <HeroCarousel pinData={pinData} />
          :
          hasError.error ?
            <p>{hasError.message}</p>
            :
            <Spinner />
        }
      </section>
        <section className='most-rated-container container-sm'>
            <h2>Most Rated</h2>
          <div className='cards-container'>
            {filteredRatings &&
              filteredRatings.map((pin, i) => {
                return (
                  <Card className='card-container' key={i} style={{ width: '18rem', height: '18rem' }}>
                    <Link className='pins-link' to={`/pins/${pin._id}`}>
                      <Card.Img className='card-img' variant="top" src={pin.imageUrl} />
                      <Card.Body>
                        <Card.Title>{pin.title}</Card.Title>
                        <Card.Text>Rating test: {pin.averageRating}</Card.Text>
                        <Card.Text>{pin.avgRating}</Card.Text>
                      </Card.Body>
                    </Link>
                  </Card>
                )
              })}
          </div>
        </section>
        <section className='search-container container-sm'>
            <form>
              <label className='search-label'>Not sure what you fancy?</label>
              <select onChange={showFilteredPins}>
                <option value='' defaultValue disabled>Select a tag</option>
                {filterList.map((tag, id) => <option key={id} value={tag}>{tag}</option>
                )}
              </select>
            </form>
            </section>
            <section className='search-result-container'>
            {filteredPins &&
              filteredPins.map((pin, i) => {
                return (
                  <Card key={i} style={{ width: '18rem' }}>
                    <Link className='pins-link' to={`/pins/${pin._id}`}>
                      <Card.Img variant='top' src={pin.imageUrl} />
                      <Card.Body>
                        <Card.Title>{pin.title}</Card.Title>
                        <Card.Text>Rating: {pin.avgRating}</Card.Text>
                        <Card.Text>Rating: {pin.averageRating}</Card.Text>
                      </Card.Body>
                    </Link>
                  </Card>
                )
              })
            }
          </section>
      <footer>
      <hr />
        © Made by Mayur, Tom &amp; Marilyn
      </footer>
    </>
  )
}


export default Home
