import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

//react select components
import Select from 'react-select'

//react bootstrap components
import Carousel from 'react-bootstrap/Carousel'
import Card from 'react-bootstrap/Card'


const Home = () => {

  const [pinData, setPindata] = useState([])
  const [filteredPins, setFilteredPins] = useState([])
  const [filterList, setFilterList] = useState([])


  const options = [ //Check whether we want to search by the tags
    { value: 'art', label: 'art' },
    { value: 'hotel', label: 'hotel' },
    { value: 'city walk', label: 'city walk' },
  ]

  const [searchBar, setSearchBar] = useState({
    pinTags: [],
  })

  useEffect(() => {
    const getImageData = async () => {
      try {
        const { data } = await axios.get('/api/pins')
        console.log(data)
        setPindata(data)
      } catch (error) {
        console.log(error)
      }
    }
    getImageData()
  }, [])

//?? Filtered ratings
  // const filteredRatings = pinData.filter(pin => {
  //   const topRatings = pin.averageRating >= 4
  //   console.log('top ratings', topRatings)
  //   return topRatings
  // })

  useEffect(() => {
    if (pinData.length) {
      const filteredPins = []
      pinData.map(pin => {
        filteredPins.push(pin.tags)
      })
      setFilterList(filteredPins)
    }
  }, [pinData])

  const showFilteredPins = (e) => {
    const search = e.target.value
    console.log('user search', search)
    const pinsSearched = pinData.filter(pin => pin.tags.includes(search))
    setFilteredPins(pinsSearched)
  }

  //?? React select search bar 
  const handleTagsSelected = (tagSelected, name) => {
    console.log('tagsSelected', tagSelected)
    const tagName = tagSelected ? tagSelected.map(item => item.value) : []
    setSearchBar({ ...searchBar, [name]: [...tagName] })
    console.log('searchBar', searchBar)
  }

  return (

    <>
      <section className='hero-container'>
        <Carousel className='carousel-container'>
          {pinData &&
            pinData.map((img, i) => {
              return (
                <Carousel.Item key={i} interval={1000}>
                  <Link className='pins-link' to={`/pins/${img._id}`}>
                    <img
                      className='d-block w-100'
                      src={img.imageUrl}
                      alt={img.title}
                    />
                    <Carousel.Caption>
                      <h3>{img.title}</h3>
                    </Carousel.Caption>
                  </Link>
                </Carousel.Item>
              )
            })
          }
        </Carousel>
      </section>
      <section className='most-rated-container'>
        <div className='most-rated-txt'>
          <h2>Most Rated</h2>
        </div>
        <div className='cards-container'>
          {/* {filteredRatings &&
            filteredRatings.map((pin, i) => {
              return (
                <Card className='card-container' key={i} style={{ width: '18rem', height:'18rem' }}>
                  <Card.Img className='card-img' variant="top" src={pin.imageUrl}/>
                  <Link className='pins-link' to={`/pins/${pin._id}`}>
                  <Card.Body>
                    <Card.Title>{pin.title}</Card.Title>
                    <Card.Text>{pin.averageRating}</Card.Text>
                    <Card.Text>{pin.avgRating}</Card.Text>
                  </Card.Body>
                  </Link>
                </Card>
              )
            })} */}
        </div>
      </section>
      <section className='search'>
        <div className='searchbar-container'>
          <form>
            <select onChange={showFilteredPins}>
              <option>See all</option>
              {filterList.map((tag, id) => <option key={id} value={tag}>{tag}</option>
              )}
            </select>
          </form>
          {filteredPins &&
            filteredPins.map((pin, i) => {
              return (
                <Card key={i} style={{ width: '18rem' }}>
                  <Link className='pins-link' to={`/pins/${pin._id}`}>
                    <Card.Img variant='top' src={pin.imageUrl} />
                    <Card.Body>
                      <Card.Title>{pin.title}</Card.Title>
                      <Card.Text>Rating: {pin.avgRating}</Card.Text>
                      {/* <Card.Text>Rating: {pin.averageRating}</Card.Text> */}
                    </Card.Body>
                  </Link>
                </Card>
              )
            })
          }
        </div>
        <label className='search-label'>Not sure what you fancy?</label>
        <div>
          <Select className='select-container'
            options={options}
            isMulti
            name='pinTags'
            onChange={(tagSelected) => handleTagsSelected(tagSelected, 'pinTags')}
          />
        </div>
      </section>
      <footer>
        © Made by Mayur, Tom &amp; Marilyn
      </footer>
    </>
  )
}


export default Home
