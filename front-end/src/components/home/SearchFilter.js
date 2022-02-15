import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

//React Bootstrap Components 
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'

const SearchFilter = ({ pinData }) => {


  const [typeOptions, setTypeOptions] = useState([])
  const [tagOptions, setTagOptions] = useState([])

  const [filteredPins, setFilteredPins] = useState([])

  const [filteredPinsTest, setFilteredPinsTest] = useState([])
  const [filters, setFilters] = useState({ typeOfPlace: '', tags: 'All' })

  useEffect(() => {

    const typeOfPlaceList = []
    const tagList = []

    pinData.forEach((pin) => {
      typeOfPlaceList.push(pin.typeOfPlace)
      pin.tags.forEach(tag => tagList.push(tag))
    })
    const uniquePlaceTypes = [...new Set(typeOfPlaceList)]
    setTypeOptions(uniquePlaceTypes.sort())

    const uniqueTags = [...new Set(tagList)]
    setTagOptions(uniqueTags.sort())
  }, [pinData])

  const handleFilterChange = (e) => {
    const filterObj = { ...filters, [e.target.name]: e.target.name }
    setFilters(filterObj)
  }

  useEffect(() => {

    if (pinData.length) {
      const tagSelect = new RegExp(filters.tags, 'i')
      setFilteredPinsTest(pinData.filter(pin => {
        return (tagSelect.test(pinData.tags) && (filters.typeOfPlace === pin.typeOfPlace)) || (filters.typeOfPlace === '' && filters.tags === '' )
      }))

    }
  }, [filters, pinData])


  const handleSelect  = (e) => {
    const option = e.target.value
    console.log('user option', option)
    const optionSelected = pinData.filter(pin => pin.typeOfPlace.includes(option))
    setFilteredPins(optionSelected)
  }


  return (

    <>
      <h2>Not sure what you fancy?</h2>
      <div className='searchbar-container container-sm'>
        <Form >
          <Form.Group>
          <Form.Label className='search-label'>Type of place</Form.Label>
          <Form.Select onChange={handleSelect} name='typeOfPlace'>
          <option value='' defaultValue disabled> -- Select a type -- </option>
            {typeOptions.map((typeOfPlace, id) => <option key={id} value={typeOfPlace}>{typeOfPlace}</option>
            )}
          </Form.Select>
          </Form.Group>
          <Form.Group>
          <Form.Label className='search-label'>Tag </Form.Label>
          <Form.Select onChange={handleSelect} name='tags'>
          <option value='' defaultValue disabled> -- Select a tag -- </option>
            {tagOptions.map((tag, id) => <option key={id} value={tag}>{tag}</option>
            )}
          </Form.Select>
          </Form.Group>
        </Form>
      </div>
      <div className='search-result-container container-sm'>
        {filteredPins &&
          filteredPins.map((pin, i) => {
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
    </>
  )
}


export default SearchFilter
