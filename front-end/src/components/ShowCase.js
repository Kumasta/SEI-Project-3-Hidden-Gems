import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


const ShowCase = () => {



  return (
    <div className='container-wrapper'>
      <Container className='mt-4'>
        <Col>
          <Row>
            {/* <img src={} alt={} /> */}
          </Row>
          <Row>
            <h4 className='name'>name</h4>
            <h4 className='rating'>rating</h4>
            <h4 className='type'>type</h4>
            <h4 className='status'>status</h4>
            <h4 className='tags'>tags</h4>
            <h4 className='owner'>owner</h4>
            <hr />
            <p className='description'>description</p>
          </Row>
        </Col>
        <Col>
          <h4 className='review'>review</h4>
        </Col>
      </Container>
    </div>
  )
}


export default ShowCase
