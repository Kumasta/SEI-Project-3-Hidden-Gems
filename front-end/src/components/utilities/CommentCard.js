import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { getPayload, getLocalToken } from '../../enviroment/auth'
import CommentEdit from './CommentEdit'

const CommentCard = ({ review, pin, setRatingUpdated }) => {

  const [commentsData, setCommentsData] = useState({ text: '' })
  const [formErrors, setFormErrors] = useState('')
  const [ commentEdit, setCommentEdit ] = useState(true)
  const [ likeId, setLikeId ] = useState(false)


  const deleteComment = async () => {
    try {
      await axios.delete(`/ai/pins/${pin._id}/reviews/${review.id}`, {
        headers: {
          Authorization: `Bearer ${getLocalToken()}`
        }
      }
      )
      setRatingUpdated(true)
    } catch (error) {
      console.log('delete error message', error.response.data.message)
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

  const payload = getPayload()

  const likeClick = () => {
    const userId = window.localStorage.getItem('userId')
    console.log(userId)
    const likeOwner = review.likes.findIndex(owner => {
      return owner.owner = payload.sub
    })
    console.log(likeOwner)
    if (likeOwner === -1){
      return postLike()
    }
    console.log(payload.sub)
    console.log(review.likes[likeOwner]._id)
    setLikeId(review.likes[likeOwner]._id)
  }

  const postLike = async () => {
    const headers = {'Authorization': `Bearer ${getLocalToken()}`}
    try {
      await axios.post(`/api/pins/${pin._id}/reviews/${review.id}/like`, 
      { like: true }, 
      { headers })
      // setLikes(true)
      setRatingUpdated(true)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
  const deleteLike = async () => {
    const headers = {'Authorization': `Bearer ${getLocalToken()}`}
    try {
      await axios.delete(`/api/pins/${pin._id}/reviews/${review.id}/like/${likeId}`, { headers })
      // setLikes(false)
      setRatingUpdated(true)
    } catch (error) {
      console.log(error)
    }
  }
  deleteLike()
  }, [likeId])

  return (
    <>
      <Card>
        <Card.Header>{review.owner.username}</Card.Header>
        {commentEdit ?
          <Card.Body>
            <Card.Text>{review.text}</Card.Text>
            <Card.Text>Likes: {review.likes.length}</Card.Text>
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
        {payload && 
        <Button className='btn btn-dark' onClick={likeClick} variant='primary'>Like</Button>
        }
      </Card>
    </>
  )
}

export default CommentCard
