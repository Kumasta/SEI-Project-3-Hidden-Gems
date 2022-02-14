import React from 'react'
import axios from 'axios'
import { useState } from 'react'

// Import Auth helpers
import { getLocalToken } from '../../enviroment/auth'

//React Bootstrap Components 
import { Container, Form, Button } from 'react-bootstrap'

const CommentForm = ({ pinData }) => {

const [ commentsData, setCommentsData] = useState({ name: '', comment: '' })
const [ formErrors, setFormErrors ] = useState({ name: '', comment: '' })
const  isTextareaDisabled = commentsData.comment.length === 0 

  


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
    await axios.post(`/api/pins/${pinData._id}`, commentsData,
    { headers: { Authorization: `Beaer${getLocalToken()}`}
    })
    } catch (error) {
      console.log('error on commentForm', error)
      setFormErrors({ ...formErrors, ...error.response.data.errors })
      
    }
  }

  const handleChange = (e) => {
    console.log('event.target.value => ' , e.target.value)
    setCommentsData({...commentsData, [e.target.name]: e.target.value})
    console.log('comments data => ', commentsData)
  }

  return (

    <div className='form-page'>
      <Container>
        <h2>Comment</h2>
        <Form onSubmit={handleSubmit }>
          <Form.Group className='mb-2'>
            <Form.Label htmlFor='name'>Name</Form.Label>
            <Form.Control  onChange={handleChange} type='name' name='name' placeholder='Name' defaultValue={commentsData.name} />
            {formErrors.username && <Form.Text>{formErrors.username}</Form.Text>}
          </Form.Group>
          <Form.Group className='mb-2'>
            <Form.Label htmlFor='Comment'>Comment</Form.Label>
            <Form.Control onChange={handleChange} as='textarea' rows={3} type='comment' name='comment' placeholder='Comment' defaultValue={commentsData.comment} />
            {formErrors.username && <Form.Text>{formErrors.username}</Form.Text>}
          </Form.Group>
          <Form.Group className='text-center mt-4'>
            <Button onSubmit={handleSubmit } type='submit' disabled={isTextareaDisabled}  dissclassName='btn btn-dark'>Submit</ Button>
          </Form.Group>
        </Form>
      </Container>
    </div>
  )
}

export default CommentForm 
