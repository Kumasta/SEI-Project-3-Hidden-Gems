import User from '../models/user.js'
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.currentUser._id).populate('ownedPins').populate() //?? This needs to be tested
    console.log('This is the user profile: ', user)
    if (!user) throw new Error('User not found')
    return res.status(200).json(user)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ message: err.message })
  }
}