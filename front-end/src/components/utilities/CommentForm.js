import React from 'react'
import axios from 'axios'
import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'


// Import Auth helpers
import { getLocalToken } from '../../enviroment/auth'


//React Bootstrap Components 
import { Container, Form, Button } from 'react-bootstrap'

const CommentForm = ({ pin, setRatingUpdated }) => {

  const [commentsData, setCommentsData] = useState({ text: '' })
  const [formErrors, setFormErrors] = useState({ text: '' })
  const isTextareaDisabled = commentsData.text.length === 0
  


  // Post a new comment 
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (pin._id === undefined) return 
      await axios.post(`/api/pins/${pin._id}/reviews`,
        commentsData,
        {
          headers: {
            Authorization: `Bearer ${getLocalToken()}`
          },
        }
      )
      setRatingUpdated(true)
    } catch (error) {
      console.log('error on commentForm', error)
      setFormErrors({ ...formErrors, ...error.response.data.errors })
    }
  }

  const handleChange = (e) => {
    console.log('event.target.value => ', e.target.value)
    setCommentsData({ ...commentsData, [e.target.name]: e.target.value })
    console.log('comments data => ', commentsData)
  }

  return (

    <div className='form-page'>
      <Container>
        <h2>Comment</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-2'>
            <Form.Control onChange={handleChange} as='textarea' rows={3} type='text' name='text' placeholder='Leave a comment...' defaultValue={commentsData.text} />
            {formErrors.username && <Form.Text>{formErrors.username}</Form.Text>}
          </Form.Group>
          <Form.Group className='text-center mt-4'>
            <Button onSubmit={handleSubmit} type='submit' disabled={isTextareaDisabled} className='btn btn-dark'>Submit</ Button>
          </Form.Group>
        </Form>
      </Container>
    </div>
  )
}

export default CommentForm 
