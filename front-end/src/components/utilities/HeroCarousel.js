import React from 'react'

// React bootstrap components
import Carousel from 'react-bootstrap/Carousel'
// https://d37zoqglehb9o7.cloudfront.net/uploads/2022/01/13028.5199.1_KAWS_FAMILY_88in_Ed1_Final_002_DA-EDIT2-1-1241x1001.jpg'
// https://dazedimg-dazedgroup.netdna-ssl.com/900/azure/dazed-prod/1310/8/1318637.jpeg
// https://whitewallapi.wpenginepowered.com/wp-content/uploads/2022/01/jonty-wilde-kaws-newfiction-2.jpg

const HeroCarousel = () => {

  return (

    <>
  <Carousel>
  <Carousel.Item interval={1000}>
    <img
      className='d-block w-100'
      src='https://d37zoqglehb9o7.cloudfront.net/uploads/2022/01/13028.5199.1_KAWS_FAMILY_88in_Ed1_Final_002_DA-EDIT2-1-1241x1001.jpg'
      alt='First slide'
    />
    <Carousel.Caption>
      <h3>First slide label</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item interval={500}>
    <img
      className='d-block w-100'
      src='https://dazedimg-dazedgroup.netdna-ssl.com/900/azure/dazed-prod/1310/8/1318637.jpeg'
      alt='Second slide'
    />
    <Carousel.Caption>
      <h3>Second slide label</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className='d-block w-100'
      src='https://whitewallapi.wpenginepowered.com/wp-content/uploads/2022/01/jonty-wilde-kaws-newfiction-2.jpg'
      alt='Third slide'
    />
    <Carousel.Caption>
      <h3>Third slide label</h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
    </>
  )
}


export default HeroCarousel
