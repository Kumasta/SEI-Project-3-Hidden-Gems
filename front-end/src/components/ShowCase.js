import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Rating from './utilities/Rating'

const ShowCase = ( { commentsData }) => {

  const [pin, setPin] = useState([])
  const [hasError, setHasError] = useState({ error: false, message: '' })
  const { id } = useParams()
  const [ user, setUser] = useState([])

  useEffect(() => {
    const getSinglePin = async () => {
      try {
        const { data } = await axios.get(`/api/pins/${id}`)
        console.log(data)
        setPin(data)
        setUser(data.owner.username)
      } catch (error) {
        setHasError({ error: true, message: error.message })
      }
    }
    getSinglePin()
  }, [id])

  return (
      <Container className='mt-4'>
        {pin ?
          <>
            <Col>
              <Row>
                <img src={pin.imageUrl} alt={pin.title} />
              </Row>
              <Row>
                <h3 className='title'>{pin.title}</h3>
                <h5 className='type'>{pin.typeOfPlace}</h5>
                <h5 className='rating'>{pin.avgRating}</h5>
                <Rating avgRating={pin.avgRating} id={pin._id} pin={pin} />
                <h5 className='status'>{pin.status}</h5>
                <h5 className='tags'>{pin.tags}</h5>
                <h5 className='username'>Posted by {user}</h5>
                <hr />
                <p className='description'>{pin.description}</p>
                <h5 className='review'>Comments</h5>
                <hr />
              </Row>
            </Col>
          </>
          :
          <h2 className="text-center">
            {hasError.error ? 'Something went wrong!' : 'Loading...'}
          </h2>
        }
      </Container>
  )
}

export default ShowCase
