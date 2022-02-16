// import React, { useState, useEffect } from 'react'
// import axios from 'axios'
// import Card from 'react-bootstrap/Card'
// import Button from 'react-bootstrap/Button'
// import { getPayload, getLocalToken } from '../../enviroment/auth'

// const CommentCard = ({ pin }) => {


//   const [ currentReviewId, setCurrentReviewId ] = useState()

//   useEffect(() => {
//     if (pin) {
//       console.log('pin id', pin._id)
//       console.log('pin reviews', pin.reviews)
//       console.log('pin reviews id', pin.reviews[1].id)
//     }
//   }, [pin])

//   const userIsOwnerOfComment = () => {
//     const payload = getPayload()
//     if (!payload) return
//     return pin.reviews.owner.id === payload.sub
//   }

//   const deleteComment = async () => {
//     try {
//       await axios.delete(`/api/pins/${pin._id}/reviews/${pin.reviews._id}`, {
//         headers: {
//           Authorization: `Bearer ${getLocalToken()}`
//         },
//       }
//       )
//     } catch (error) {
//       console.log(error)
//     }
//   }



//   // useEffect(()=> {
//   //   const findReviewId = findIndex(pin.reviews._id)
//   // })



//   return (

//     <>
//       {pin.reviews.length &&
//         pin.reviews.map((review, i) => {
//           return (
//             <Card key={i}>
//               <Card.Header>{review.owner.username}</Card.Header>
//               <Card.Body>
//                 <Card.Text>{review.text}</Card.Text>
//                 {/* { userIsOwnerOfComment() &&
//                         <>  */}
//                 <Button onClick={deleteComment} className='btn btn-dark ' variant='primary'>Edit</Button>
//                 <Button className='btn btn-dark ' variant='primary'>Delete</Button>
//                 {/* </>
//                         }  */}
//               </Card.Body>
//             </Card>
//           )
//         })}


//     </>
//   )
// }


// export default CommentCard
