//Models
import Pin from '../models/pin.js'

//Get all
export const getAllPins = async (_req, res) => {
  try {
    const allPins = await Pin.find().populate('owner')
    console.log(allPins)
    return res.status(200).json(allPins)
  } catch (err) {
    console.log({ message: 'Pin data not found.' })
    return res.status(404).json({ message: err.message })
  }
}

//Post new Pin
export const addPin = async (req, res) => {
  try {
    req.body.owner = req.currentUser._id
    const pinToAdd = await Pin.create(req.body)
    return res.status(201).json(pinToAdd)
  } catch (err) {
    return res.status(422).json(err)
  }
}

//Find One Pin
export const findSinglePin = async (req, res) => {
  try {
    const { id } = req.params
    const pin = await (await (await Pin.findById(id).populate('owner')).populate('reviews.owner')).populate('owner')
    console.log(pin)
    return res.status(200).json(pin)
  } catch (err) {
    return res.status(404).json({ message: 'pin not found.' })
  }
}



//Update One Pin
export const updatePin = async (req, res) => {
  try {
    const { id } = req.params
    // const updatedInfo = await Pin.findByIdAndUpdate(id, req.body, { new: true })
    // console.log(updatedInfo)
    const updatedInfo = await Pin.findById(id)
    // console.log(req.currentUser.superUser)
    if (!updatedInfo.owner.equals(req.currentUser._id) || !req.currentUser.superUser === false) throw new Error('This user does not have permision')
    Object.assign(updatedInfo, req.body)
    await updatedInfo.save()
    return res.status(202).json(updatedInfo)
  } catch (err) {
    return res.status(404).json({ message: err.message })
  }
}



//Delete Pin by ID
export const deletePin = async (req, res) => {
  try {
    const { id } = req.params
    const pinToDelete = await Pin.findById(id)
    console.log(req.currentUser.superUser)
    if (req.currentUser.superUser === false && !pinToDelete.owner.equals(req.currentUser._id)) throw new Error('This user does not have permision')
    await pinToDelete.remove()
    return res.status(204).json('Pin has been removed')
  } catch (err) {
    return res.status(404).json({ message: err.message })
  }
}

//Add user rating to Pin /pins/:id/rating/
export const addUserRating = async (req, res) => {
  try {
    const { id } = req.params
    // console.log(id)
    const pin = await Pin.findById(id)
    console.log(pin)
    console.log(req.body)
    if (!pin) throw new Error('Pin not found')
    const newRating = { ...req.body, owner: req.currentUser._id }
    console.log(newRating)
    pin.ratings.push(newRating)
    console.log(pin)
    await pin.save()
    res.status(201).json(pin)
  } catch (err) {
    console.log(err)
    return res.status(401).json({ message: err.message })
  }
}

//Update user rating /pins/:id/rating/:RatingId
export const updateUserRating = async (req, res) => {
  try {
    const { id, ratingId } = req.params
    const pin = await Pin.findById(id)
    if (!pin) throw new Error('Pin was not found')
    const ratingToUpdate = pin.ratings.id(ratingId)
    if (!ratingToUpdate) throw new Error('Not yet rated')
    if (!ratingToUpdate.owner.equals(req.currentUser._id)) throw new Error('Unauthorised')
    Object.assign(ratingToUpdate, req.body)
    await pin.save()
    return res.status(202).json(ratingToUpdate)
  } catch (err) {
    console.log(err)
    return res.status(401).json({ message: err.message })
  }
}

//Commets

//Add review
export const addReview = async (req, res) => {
  try {
    const { id } = req.params
    // console.log('id:', id)
    // console.log('Body:', req.body)
    //Get pin
    const pin = await Pin.findById(id)
    //Check if pin was fetched
    if (!pin) throw new Error('Pin not found')
    // console.log('Pin reviews:', Pin.reviews)
    const newReview = { ...req.body, owner: req.currentUser._id }
    // console.log(newReview)
    //Push to review array
    console.log('PIN: ', Pin.reviews)
    pin.reviews.push(newReview)
    await pin.save()
    res.status(201).json(pin)
  } catch (err) {
    console.log(err)
    return res.status(422).json({ message: err.message })
  }
}

//Delete Review
export const deleteReview = async (req, res) => {
  try {
    const { id, reviewId } = req.params
    // console.log(id, reviewId)
    const pin = await Pin.findById(id)
    // console.log(pin.reviews)
    if (!pin) throw new Error('Pin was not found')
    const reviewToDelete = pin.reviews.id(reviewId)
    // console.log(reviewToDelete)
    if (!reviewToDelete) throw new Error('Review not found')
    if (req.currentUser.superUser === false && !pin.owner.equals(req.currentUser._id)) throw new Error('Unauthorised')
    await reviewToDelete.remove()
    await pin.save()
    return res.sendStatus(204)
  } catch (err) {
    console.log(err)
    return res.status(401).json({ message: err.message })
  }
}

//Update Comment
export const updateComment = async (req, res) => {
  try {
    const { id, reviewId } = req.params
    const pin = await Pin.findById(id)
    if (!pin) throw new Error('Pin was not found')
    const commentToUpdate = pin.reviews.id(reviewId)
    console.log(commentToUpdate)
    if (!commentToUpdate) throw new Error('No comment found!')
    if (!commentToUpdate.owner.equals(req.currentUser._id)) throw new Error('Unauthorised')
    Object.assign(commentToUpdate, req.body)
    await pin.save()
    return res.status(202).json(commentToUpdate)
  } catch (err) {
    console.log(err)
    return res.status(401).json({ message: err.message })
  }
}

//Comment likes
//Add user rating to Pin /pins/:id/reviews/:id/like/
export const likeReview = async (req, res) => {
  try {
    const { id, reviewId } = req.params
    // console.log(id)
    const pin = await Pin.findById(id)
    // console.log(pin)
    // console.log(req.body)
    if (!pin) throw new Error('Pin not found')
    const reviewToLike = pin.reviews.id(reviewId)
    if (!reviewToLike) throw new Error('Comment not found')
    const like = { ...req.body, owner: req.currentUser._id }
    // console.log(newRating)
    reviewToLike.likes.push(like)
    // console.log(pin)
    await pin.save()
    res.status(201).json(pin)
  } catch (err) {
    console.log(err)
    return res.status(401).json({ message: err.message })
  }
}

export const deleteReviewLike = async (req, res) => {
  try {
    const { id, reviewId, likeId } = req.params
    // console.log(id, reviewId)
    const pin = await Pin.findById(id)
    // console.log(pin.reviews)
    if (!pin) throw new Error('Pin was not found')
    const review = pin.reviews.id(reviewId)
    // console.log(review)
    if (!review) throw new Error('Review not found')
    const likeToRemove = review.likes.id(likeId)
    if (!likeToRemove) throw new Error('Not Liked')
    if (!likeToRemove.owner.equals(req.currentUser._id)) throw new Error('Unauthorised')
    await likeToRemove.remove()
    await pin.save()
    return res.sendStatus(204)
  } catch (err) {
    console.log(err)
    return res.status(401).json({ message: err.message })
  }
}