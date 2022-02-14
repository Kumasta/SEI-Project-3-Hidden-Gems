import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

//Utility Components
import HeroCarousel from './home/HeroCarousel'
import Spinner from './utilities/Spinner'
import MostRated from './home/MostRated'

//React Bootstrap Components
import Card from 'react-bootstrap/Card'

const Home = ({ pinData, setPindata }) => {

  const [hasError, setHasError] = useState({ error: false, message: '' })

  const [filteredTagPins, setFilteredTagPins] = useState([])
  const [filterTagList, setFilterTagList] = useState([])

  const [filterTypeList, setFilterTypeList] = useState([])
  const [filteredTypePins, setFilteredTypePins] = useState([])

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
  }, [])


  useEffect(() => {

    let tagsList = []
    const filteredTagsList = []

    pinData.forEach((pin) => {
      tagsList = [...tagsList, ...pin.tags]
    })
    tagsList.forEach((item) => {
      filteredTagsList.indexOf(item) === -1 && filteredTagsList.push(item)
    })
    setFilterTagList(filteredTagsList.sort())
  }, [pinData])


  const handleTagSearch = (e) => {
    const search = e.target.value
    console.log('user search', search)
    const tagSearched = pinData.filter(pin => pin.tags.includes(search))
    setFilteredTagPins(tagSearched)
  }

  useEffect(() => {

    let typeOfPlaceList = []

    pinData.forEach((pin) => {
      const placeType = pin.typeOfPlace
      typeOfPlaceList.push(placeType)
      console.log('pin.typeOfPlace => ',typeOfPlaceList)
    })
    const uniqueTypes = [ ...new Set(typeOfPlaceList)]
    setFilterTypeList(uniqueTypes.sort())
  }, [pinData])


  const handleTypeSearch = (e) => {
    const search = e.target.value
    console.log('user search', search)
    const tagSearched = pinData.filter(pin => pin.typeOfPlace.includes(search))
    setFilteredTypePins(tagSearched)
  }

  return (

    <>
      <section className='hero-container container-sm'>
        {pinData ?
          <HeroCarousel pinData={pinData} />
          :
          hasError.error ?
            <p>{hasError.message}</p>
            :
            <Spinner />
        }
      </section>
      <main>
        <section className='most-rated-container container-sm'>
          {pinData ?
            <MostRated pinData={pinData} />
            :
            <Spinner />
          }

        </section>
        <section className='search-section'>
        <h2>Not sure what you fancy?</h2>
          <div className='searchbar-container container-sm'>
            <form>
            <label className='search-label'>Select a type of place</label>
              <select onChange={handleTypeSearch}>
                <option value='' defaultValue disabled>Select a type of place</option>
                {filterTypeList.map((typeOfPlace, id) => <option key={id} value={typeOfPlace}>{typeOfPlace}</option>
                )}
              </select>
              <label className='search-label'>Select a tag </label>
              <select onChange={handleTagSearch}>
                <option value='' defaultValue disabled>Select a tag</option>
                {filterTagList.map((tag, id) => <option key={id} value={tag}>{tag}</option>
                )}
              </select>
            </form>
          </div>
          <div className='search-result-container container-sm'>
            {filteredTagPins &&
              filteredTagPins.map((pin, i) => {
                return (
                  <Card className='card-container' key={i} style={{ width: '18rem', height: '18rem' }}>
                    <Link className='pins-link' to={`/pins/${pin._id}`}>
                      <Card.Img className='card-img' variant='top' src={pin.imageUrl} />
                      <Card.Body>
                        <Card.Title>{pin.title}</Card.Title>
                        <Card.Text>Rating: {pin.avgRating}</Card.Text>
                      </Card.Body>
                    </Link>
                  </Card>
                )
              })
            }
            {filteredTypePins &&
              filteredTypePins.map((pin, i) => {
                return (
                  <Card className='card-container' key={i} style={{ width: '18rem', height: '18rem' }}>
                    <Link className='pins-link' to={`/pins/${pin._id}`}>
                      <Card.Img className='card-img' variant='top' src={pin.imageUrl} />
                      <Card.Body>
                        <Card.Title>{pin.title}</Card.Title>
                        <Card.Text>Rating: {pin.avgRating}</Card.Text>
                      </Card.Body>
                    </Link>
                  </Card>
                )
              })
            }
          </div>
        </section>
      </main>
      <footer>
        <hr />
        © Made by Mayur, Tom &amp; Marilyn
      </footer>
    </>
  )
}


export default Home
