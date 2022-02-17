import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

//React Bootstrap Components 
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'

const SearchFilter = ({ pinData }) => {



  const [filteredPins, setFilteredPins] = useState([])
  const [filters, setFilters ] = useState({ typeOfPlace: 'All', searchInput: ''})


  const typesOfPlaces = [...new Set(pinData.map(pin => pin.typeOfPlace))]

  const handleFilterChange = (e) => {
    console.log('e.target.name.', e.target.name)
    const filterObject = { ...filters, [e.target.name]: e.target.value}
    console.log('filter object', filterObject)
    setFilters(filterObject)
  }

  useEffect(() => {

    if (pinData.length){

      const search = new RegExp(filters.searchInput, 'i')
      setFilteredPins(pinData.filter(pin => {
        return search.test(pin.title) && (filters.typeOfPlace === pin.typeOfPlace || filters.typeOfPlace === 'All')
      })) 
    }
  }, [pinData, filters])


  return (

    <>
      <h2 id='search'>Not sure what you fancy?</h2>
      <div className='searchbar-container container-sm'>
        <Form >
          <Form.Group>
            <Form.Label className='search-label'>Type of place</Form.Label>
            <Form.Select onChange={handleFilterChange} name='typeOfPlace' defaultValue={pinData.typeOfPlace} >
              <option value='All'>All</option>
              {typesOfPlaces.length && typesOfPlaces.map((typeOfPlace, i) => <option key={i} value={typeOfPlace}>{typeOfPlace}</option>)}
            </Form.Select>
            <Form.Control onChange={handleFilterChange} name={'searchInput'} type='text' defaultValue={filters.searchInput}  placeholder='Search' />
          </Form.Group>
          {/* <Form.Group className='mb-3'>
           
            <Form.Text className='text-muted'>
              Remember to update for error
            </Form.Text>
          </Form.Group> */}
        </Form>
      </div>
      <div className='search-result-container container-sm'>
        {(filteredPins.length ? filteredPins : pinData).map((pin, i) => {
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
