import express from 'express'

import { secureRoute } from './securingRoute.js'

//Controllers
import { getAllPins, addPin, findSinglePin, updatePin, deletePin, addReview, deleteReview, addUserRating, updateUserRating, updateComment, likeReview, deleteReviewLike } from '../controllers/pins.js'
import { registerUser, loginUser } from '../controllers/auth.js'
import { getProfile, updateMyProfile, viewUserProfile } from '../controllers/users.js'

const router = express.Router()

//To add a secureRoute to any route/method, we can add the combination, we ass the secureRoute middleware before the controller function in the method

// Pins
router.route('/pins')
  .get(getAllPins)
  .post(secureRoute, addPin)

// Single pin by id
router.route('/pins/:id')
  .get(findSinglePin)
  .put(secureRoute, updatePin)
  .delete(secureRoute, deletePin)

//UserRating
router.route('/pins/:id/rating')
  .post(secureRoute, addUserRating)

router.route('/pins/:id/rating/:ratingId')
  .put(secureRoute, updateUserRating)

//Reviews
router.route('/pins/:id/reviews')
  .post(secureRoute, addReview)

router.route('/pins/:id/reviews/:reviewId')
  .delete(secureRoute, deleteReview)
  .put(secureRoute, updateComment)

//Likes
router.route('/pins/:id/reviews/:reviewId/like')
  .post(secureRoute, likeReview)

router.route('/pins/:id/reviews/:reviewId/like/:likeId')
  .delete(secureRoute, deleteReviewLike)


// Profile
router.route('/profile')
  .get(secureRoute, getProfile)
  .put(secureRoute, updateMyProfile)

router.route('/profile/:id')
  .get(viewUserProfile)

//Auth Route
//Register
router.route('/register')
  .post(registerUser)

router.route('/login')
  .post(loginUser)

export default router