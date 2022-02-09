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
  }
}

//Post new
export const addPin = async (req, res) => {
  try {
    req.body.owner = req.currentUser._id
    const pinToAdd = await Pin.create(req.body)
    return res.status(201).json(pinToAdd)
  } catch (err) {
    return res.status(422).json(err)
  }
}

//Find One
export const findSinglePin = async (req, res) => {
  try {
    const { id } = req.params
    const pin = await (await Pin.findById(id).populate('owner')).populate('reviews.owner')// to add review info
    console.log(pin)
    return res.status(200).json(pin)
  } catch (err) {
    return res.status(404).json({ message: 'pin not found.' })
  }
}



//Update One
export const updatePin = async (req, res) => {
  try {
    const { id } = req.params
    // const updatedInfo = await Pin.findByIdAndUpdate(id, req.body, { new: true })
    // console.log(updatedInfo)
    const updatedInfo = await Pin.findById(id)
    console.log(req.currentUser.superUser)
    if (!updatedInfo.owner.equals(req.currentUser._id) || !req.currentUser.superUser === false) throw new Error('This user does not have permision')
    Object.assign(updatedInfo, req.body)
    await updatedInfo.save()
    return res.status(202).json(updatedInfo)
  } catch (err) {
    return res.status(404).json({ message: err.message })
  }
}

//Delete by ID
export const deletePin = async (req, res) => {
  try {
    const { id } = req.params
    const pinToDelete = await Pin.findById(id)
    console.log(req.currentUser.superUser)
    if (!pinToDelete.owner.equals(req.currentUser._id) || !req.currentUser.superUser) throw new Error('This user does not have permision')
    await pinToDelete.remove()
    return res.status(204).json('Pin has been removed')
  } catch (err) {
    return res.status(404).json({ message: err.message })
  }
}

//Reviews

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
    Pin.reviews.push(newReview)
    await Pin.save()
    res.status(201).json(Pin.reviews)
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
    // console.log(Pin.reviews)
    if (!pin) throw new Error('Pin was not found')
    const reviewToDelete = Pin.reviews.id(reviewId)
    // console.log(reviewToDelete)
    if (!reviewToDelete) throw new Error('Review not found')
    if (!reviewToDelete.owner.equals(req.currentUser._id)) throw new Error('Unauthorised')
    await reviewToDelete.remove()
    await Pin.save()
    return res.sendStatus(204)
  } catch (err) {
    console.log(err)
  }
}