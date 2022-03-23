import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import { SECRET } from '../config/environment.js'


//Registration 
export const registerUser = async (req, res) => {
  try {
    console.log(req.body)
    const newUser = await User.create(req.body)
    console.log(newUser)
    return res.status(202).json({ message: 'Registration Successful' })
  } catch (err) {
    console.log(err)
    return res.status(422).json(err)
  }
}

//login route
export const loginUser = async (req, res) => {
  try {
    //Destructure the rq.body
    const { email, password } = req.body
    // Find user by eamil
    const userToLogin = await User.findOne({ email: email })
    // If not found or password don't match. return unauthorised status and text
    if (!userToLogin || !userToLogin.validatePassword(password)) {
      return res.status(401).json({ message: 'Unauthorised' })
    }
    // If we get to this point - the user is validated, se we need to send them a token
    //the token will be used to authorise them when accessing scure routes
    //jwt.sign creats a token:
    // first arugment is going to be our payload - this always needs a sub which identifies the user making the request - this needs to be unique so we'll use the _id
    // 
    const token = jwt.sign({ sub: userToLogin._id }, process.env.SECRET, { expiresIn: '7 days' })
    console.log(token)
    return res.status(200).json({ message: `Welcome back, ${userToLogin.username}`, token: token })
  } catch (err) {
    console.log(err)
    return res.status(401).json(err)
  }
}