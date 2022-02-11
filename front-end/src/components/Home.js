import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

//react select components
import Select from 'react-select'

//react bootstrap components
import Carousel from 'react-bootstrap/Carousel'
import Card from 'react-bootstrap/Card'


const Home = () => {

  const [ heroImage, setHeroImage ] = useState([])
  const [ mostRated, setMostRated ] = useState([])

  const navigate = useNavigate()

  const options = [ //Check whether we want to search by the tags
    { value: 'art', label:'art' },
    { value: 'hotel', label:'hotel' },
    { value: 'city walk', label:'city walk' },
  ]

  const [ searchBar, setSearchBar] = useState({
    pinTags: [],
  })

  useEffect(() => {
    const getImageData = async () => {
      try {
        const { data } = await axios.get('/api/pins')
        console.log(data)
        setHeroImage(data)
        setMostRated(data)
      } catch (error) {
        console.log(error)
      }
    }
    getImageData()
  }, [])


  const handleClick = () => {
    navigate('/ShowCase/:id')
  }

  const handleTagsSelected = (tagSelected, name) => {
    console.log('tagsSelected',tagSelected)
    const tagName = tagSelected ? tagSelected.map(item => item.value) : []
    setSearchBar({ ...searchBar, [name]: [...tagName]})
    console.log('searchBar', searchBar)
  }


  return (

    <>
      <section className='hero-container'>
        <Carousel className='carousel-container'>
          {heroImage &&
            heroImage.map((img, i) => {
              return (
                <Carousel.Item onClick={handleClick} key={i} interval={1000}>
                  <img
                    className='d-block w-100'
                    src={img.imageUrl}
                    alt={img.title}
                  />
                  <Carousel.Caption>
                    <h3>{img.title}</h3>
                  </Carousel.Caption>
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
        {mostRated &&
          mostRated.map((pin, i) => {
            return (
              <Card onClick={handleClick} key={i} style={{ width: '18rem' }}>
                <Card.Img variant='top' src={pin.imageUrl} />
                <Card.Body>
                  <Card.Title>{pin.title}</Card.Title>
                  <Card.Text>Rating: {pin.avgRating}</Card.Text>
                </Card.Body>
              </Card>
            )
          })
        }
        </div>
      </section>
      <section className='search'>
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
