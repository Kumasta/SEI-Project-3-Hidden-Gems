import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { getPayload, getLocalToken } from '../../enviroment/auth'
import CommentEdit from './CommentEdit'

const CommentCard = ({ review, pin, setRatingUpdated }) => {


  const [commentsData, setCommentsData] = useState({ text: '' })
  const [formErrors, setFormErrors] = useState({ text: '' })
  const [ commentEdit, setCommentEdit ] = useState(true)
  


  const deleteComment = async () => {
    try {
      await axios.delete(`/api/pins/${pin._id}/reviews/${review.id}`, {
        headers: {
          Authorization: `Bearer ${getLocalToken()}`
        }
      }
      )
      setRatingUpdated(true)
    } catch (error) {
      console.log(error)
    }
  }

  const userIsOwnerOfComment = () => {
    const payload = getPayload()
    if (!payload) return
    return review.owner.id === payload.sub
  }


  const editComment = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`/api/pins/${pin._id}/reviews/${review.id}`,
        commentsData,
        {
          headers: {
            Authorization: `Bearer ${getLocalToken()}`
          }
        }
      )
      setRatingUpdated(true)
      handleEditButtonClick()
    } catch (error) {
      console.log('error on commentForm', error)
      setFormErrors({ ...formErrors, ...error.response.data.errors })
    }
  }


  const handleEditButtonClick = () => {
    if (commentEdit) return setCommentEdit(false)
    return setCommentEdit(true)
  }


  return (


    <>
      <Card>
        <Card.Header>{review.owner.username}</Card.Header>
        {commentEdit ?
          <Card.Body>
            <Card.Text>{review.text}</Card.Text>
            {userIsOwnerOfComment() &&
              <>
                <Button className='btn btn-dark ' onClick={handleEditButtonClick} variant='primary'>Edit</Button>
                <Button className='btn btn-dark ' onClick={deleteComment} variant='primary'>Delete</Button>
              </>
            }
          </Card.Body>
          :
          <CommentEdit
            handleEditButtonClick={handleEditButtonClick}
            review={review}
            formErrors={formErrors}
            editComment={editComment}
            setCommentsData={setCommentsData}
            commentsData={commentsData} />}
      </Card>
    </>
  )
}

export default CommentCard
