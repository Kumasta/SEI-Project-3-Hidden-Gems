import React from 'react'
import { Link } from 'react-router-dom'

//React Bootstrap Components
import Carousel from 'react-bootstrap/Carousel'

const HeroCarousel = ({ pinData }) => {

  return (
      <Carousel className='carousel-container'>
        {pinData.map((pin, i) => {
            return (
              <Carousel.Item key={i} interval={2500}>
                <Link className='pins-link' to={`/pins/${pin._id}`}>
                  <img
                    className='d-block w-100 carousel-img'
                    src={pin.imageUrl}
                    alt={pin.title}
                  />
                  <Carousel.Caption>
                    <h3>{pin.title}</h3>
                  </Carousel.Caption>
                </Link>
              </Carousel.Item>
            )
          })
        }
      </Carousel>
  )
}


export default HeroCarousel
