import React from 'react'
import { useEffect } from 'react'


//React Bootstrap Components 
import { Form, Button } from 'react-bootstrap'

const CommentEdit  = ({ review, editComment, formErrors, commentsData, setCommentsData,handleEditButtonClick}) => {

  const isTextareaDisabled = commentsData.text.length === 0

  useEffect(()=> {
    setCommentsData({text: review.text})
  },[review])

  const handleChange = (e) => {
    console.log('event.target.value => ', e.target.value)
    setCommentsData({ ...commentsData, [e.target.name]: e.target.value })
    console.log('comments data => ', commentsData)
  }

  return (
      <Form onSubmit={editComment}>
        <Form.Group className='mb-2'>
          <Form.Control onChange={handleChange} as='textarea' rows={3} type='text' name='text' placeholder='update your comment...' defaultValue={commentsData.text} />
          {formErrors.username && <Form.Text>{formErrors.username}</Form.Text>}
        </Form.Group>
        <Form.Group className='text-center mt-4'>
          <Button onClick={editComment} disabled={isTextareaDisabled} className='btn btn-dark'>Submit</ Button>
          <Button onClick={handleEditButtonClick} className='btn btn-dark'>Cancel</ Button>
        </Form.Group>
      </Form>
  )
}

export default CommentEdit
