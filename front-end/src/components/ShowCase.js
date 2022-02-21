import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Footer from './utilities/Footer'
import Spinner from './utilities/Spinner'
import Rating from './utilities/Rating'
import CommentForm from './utilities/CommentForm'
import CommentCard from './utilities/CommentCard'
import { getPayload } from '../enviroment/auth'
import MiniMap from './utilities/MiniMap'

const ShowCase = () => {

  const [pin, setPin] = useState(null)
  const [hasError, setHasError] = useState({ error: false, message: '' })
  const { id } = useParams()
  const [user, setUser] = useState([])
  const [ratingUpdated, setRatingUpdated] = useState(null)
  const [latLng, setLatLng] = useState({
    latitude: null,
    longitude: null,
  })

  useEffect(() => {
    const getSinglePin = async () => {
      try {
        const { data } = await axios.get(`/api/pins/${id}`)
        console.log(data)
        setPin(data)
        setUser(data.owner.username)
        setLatLng({ ...latLng, latitude: data.latitude, longitude: data.longitude })
      } catch (error) {
        setHasError({ error: true, message: error.message })
      }
    }
    setRatingUpdated(null)
    getSinglePin()
  }, [id, ratingUpdated])

  const userIsOwnerOfComment = () => {
    const payload = getPayload()
    if (!payload) return
    return pin.owner.id === payload.sub
  }

  return (
    <>
      {pin ?
        <>
        <Container className='mt-4'>
          <Col>
            <Row>
              <img className='main-image' src={pin.imageUrl} alt={pin.title} />
            </Row>
            <Row>
              <Col>
              <h2 className='title'>{pin.title}</h2>
              </Col>
              <Col>
              {userIsOwnerOfComment() && <Link className='btn-dark btn edit-btn' to={`/pins/${pin.id}/edit`}>Edit Gem</Link>}
              </Col>
              <h6 className='type'>{pin.typeOfPlace}</h6>
              <h6 className='rating'>Average rating: {pin.avgRating}</h6>
              <Rating avgRating={pin.avgRating} id={pin._id} pin={pin} setRatingUpdated={setRatingUpdated} />
              <h5 className='status'>{pin.status}</h5>
              <ul>
                {pin.tags.length &&
                  pin.tags.map((tag, i) => {
                    return (
                        <li key={i}>#{tag} </li>
                    )
                  })
                }
              </ul>
              <h5 className='username'>Posted by <Link to={`/profile/${pin.owner.id}`}>{user}</Link></h5>
              <hr />
              <p className='description'>{pin.description}</p>
              <hr/>
              <h5 className='review'>Comments</h5>
              {pin.reviews.length ?
                pin.reviews.map((review) => {
                  return (
                    <CommentCard key={review.id} pin={pin} review={review} setRatingUpdated={setRatingUpdated} />
                  )
                })
                :
                null
                }
              <CommentForm pin={pin} setRatingUpdated={setRatingUpdated} />
            </Row>
            <Row>
              {latLng.latitude && <MiniMap latLng={latLng}/>}
            </Row>
          </Col>
          </Container>
          <Footer />
        </>
        :
        <>
          <h2 className='text-center'>
            {hasError.error ? 'Something went wrong!' 
            : 
            <Spinner />}
          </h2>
        </>
      }
    </>
  )
}

export default ShowCase
