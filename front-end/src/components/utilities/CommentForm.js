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
  const [formErrors, setFormErrors] = useState('')
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
      console.log('error on commentForm', error.response.data.message)
      setFormErrors(error.response.data.message)
    }
  }

  const handleChange = (e) => {
    setCommentsData({ ...commentsData, [e.target.name]: e.target.value })
  }

  return (
      <Container className='comment-container'>
        <h3>Comment</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-2'>
            <Form.Control onChange={handleChange} as='textarea' rows={3} type='text' name='text' placeholder='Leave a comment...' defaultValue={commentsData.text} />
            {formErrors && <Form.Text>{formErrors}</Form.Text>}
          </Form.Group>
          <Form.Group className='text-center mt-4'>
            <Button onSubmit={handleSubmit} type='submit' disabled={isTextareaDisabled} className='btn btn-dark'>Submit</ Button>
          </Form.Group>
        </Form>
      </Container>
  )
}

export default CommentForm 
