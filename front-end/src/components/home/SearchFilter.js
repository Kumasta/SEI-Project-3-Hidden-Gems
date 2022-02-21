import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

//React Bootstrap Components 
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import { typeList } from '../../enviroment/typeList'

import Rating from '../utilities/Rating'

const SearchFilter = ({ pinData, setRatingUpdated }) => {

  const allTypes = typeList()

  const [filteredPins, setFilteredPins] = useState([])
  const [filters, setFilters] = useState({ typeOfPlace: 'All', searchInput: '' })

  const handleFilterChange = (e) => {
    const filterObject = { ...filters, [e.target.name]: e.target.value }
    setFilters(filterObject)
  }

  useEffect(() => {

    if (pinData.length) {

      const search = new RegExp(filters.searchInput, 'i')
      setFilteredPins(pinData.filter(pin => {
        return search.test(pin.title) && (filters.typeOfPlace === pin.typeOfPlace || filters.typeOfPlace === 'All')
      }))
    }
  }, [pinData, filters])


  return (

    <section className='search-section'>
      <h2 id='search'>Not sure what you fancy?</h2>
      <div className='searchbar-container container-sm'>
        <Form>
          <Form.Group className='form-group-container'>
            <Form.Select onChange={handleFilterChange} name={'typeOfPlace'} defaultValue={pinData.typeOfPlace} >
            <option value="" defaultValue disabled> -- Select a type of place -- </option>
              <option value='All'>All</option>
              {allTypes && allTypes.sort().map((typeOfPlace, i) => <option key={i} value={typeOfPlace}>{typeOfPlace}</option>)}
            <option value={'Other'}>Other</option>
            </Form.Select>
            <Form.Control className='input-form'onChange={handleFilterChange} name={'searchInput'} type='text' defaultValue={filters.searchInput}  placeholder='Search' />
          </Form.Group>
        </Form>
      </div>
      <div className='search-result-container container-sm'>
        {(filteredPins.length ? filteredPins : pinData).map((pin, i) => {
            return (
              <Card className='card-container ' key={i} style={{ width: '18rem', height: '18rem' }}>
                <Link className='pins-link' to={`/pins/${pin._id}`}>
                  <Card.Img className='card-img' variant='top' src={pin.imageUrl} />
                  <Card.Body>
                    <Card.Title >{pin.title}</Card.Title>
                    <div className='diamond-container'>
                      <Rating avgRating={pin.avgRating} id={pin._id} pin={pin} />
                    </div>
                  </Card.Body>
                </Link>
              </Card>
            )
          })
          }
        </div>
        </section>
  )
}


export default SearchFilter
