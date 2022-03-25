import User from '../models/user.js'
import jwt from 'jsonwebtoken'
// import { SECRET } from './environment.js'

// This function will be middleware
// Becasue this is middleware (defined in our router methods) we will have access to the req, res & next

export const secureRoute = async (req, res, next) => {
  try {
    if (!req.headers.authorization) throw new Error('Missing header')
    const token = req.headers.authorization.replace('Bearer ', '')
    console.log('token', token)
    const payLoad = jwt.verify(token, process.env.SECRET)
    const userToVerify = await User.findById(payLoad.sub)
    console.log(userToVerify)
    if (!userToVerify) throw new Error('User not found')
    req.currentUser = userToVerify
    next()
  } catch (err) {
    console.log(err)
    res.status(401).json({ message: 'Unauthorised' })
  }
}