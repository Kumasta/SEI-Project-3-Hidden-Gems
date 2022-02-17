import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

//React Bootstrap Components
import Card from 'react-bootstrap/Card'
import Rating from '../utilities/Rating'

const MostRated = ({ pinData, setRatingUpdated }) => {


  const [topRated, setTopRated] = useState([])

  console.log('pinDataProp', pinData)

  // Sorting the pinData for the avgRating in descending order
  useEffect(() => {
    const sortedRatings = pinData.sort((a, b) => parseFloat(b.averageRating) -
      parseFloat(a.averageRating))
    console.log('sorted-ratings', sortedRatings)

    const topRated = sortedRatings.slice(0, 4)
    console.log('topRated', topRated)
    setTopRated(topRated)
  }, [pinData])


  return (

    <>
        <div>
          <h2>Most Rated</h2>
        </div>
        <div className='cards-container'>
          {topRated &&
            topRated.map((pin, i) => {
              return (
                <Card className='card-container' key={i} style={{ width: '18rem', height: '18rem'}}>
                  <Link className='pins-link' to={`/pins/${pin._id}`}>
                    <Card.Img className='card-img' variant='top' src={pin.imageUrl} />
                    <Card.Body>
                      <Card.Title>{pin.title}</Card.Title>
                      <div clasName='diamond-container'>
                      <Rating avgRating={pin.avgRating} id={pin._id} pin={pin} setRatingUpdated={setRatingUpdated} />
                      </div>
                    </Card.Body>
                  </Link>
                </Card>
              )
            })}
        </div>
    </>
  )
}


export default MostRated
