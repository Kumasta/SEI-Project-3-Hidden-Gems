import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

//React Bootstrap Components
import Card from 'react-bootstrap/Card'
import Rating from '../utilities/Rating'

const MostRated = ({ pinData, setRatingUpdated }) => {


  const [mostRated, setMostRated] = useState(null)


  useEffect(() => {

    if (pinData.length) {
      const filteredRatings = pinData.filter(pin => pin.avgRating >= 4)
      console.log('filteredRating',filteredRatings)
      let arrayLength = 3
      if (filteredRatings.length < 3) {
        arrayLength = filteredRatings.length
      }
      let topRated = []
        while (topRated.length < arrayLength) {
          topRated.push(filteredRatings[Math.floor(Math.random() * filteredRatings.length)])
          topRated = [...new Set(topRated)]
        }
        console.log('top-rated', topRated)
        setMostRated(topRated)
  }
  }, [pinData])


  return (

    <section className='most-rated-container container-sm'>
      <div>
        <h2>Most Rated</h2>
      </div>
      <div className='cards-container'>
        {mostRated &&
          mostRated.map((pin, i) => {
            return (
              <Card className='card-container' key={i} style={{ width: '18rem', height: '18rem' }}>
                <Link className='pins-link' to={`/pins/${pin._id}`}>
                  <div className='card-img-container'>
                    <Card.Img className='card-img' variant='top' src={pin.imageUrl} />
                  </div>
                  <Card.Body>
                    <Card.Title>{pin.title}</Card.Title>
                    <div className='diamond-container'>
                      <Rating avgRating={pin.avgRating} id={pin._id} pin={pin} setRatingUpdated={setRatingUpdated} />
                    </div>
                  </Card.Body>
                </Link>
              </Card>
            )
          })}
      </div>
    </section>
  )
}


export default MostRated
