import User from '../models/user.js'
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.currentUser._id).populate('ownedPins')
    // user.profile.populte('ownedPins')
    console.log('This is the user profile: ', user)
    if (!user) throw new Error('User not found')
    return res.status(200).json(user)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ message: err.message })
  }
}

export const updateMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.currentUser._id)
    if (!user) throw new Error('User not found')
    const profileToUpdate = user.profile
    console.log(profileToUpdate)
    Object.assign(profileToUpdate, req.body)
    await user.save()
    return res.status(202).json(profileToUpdate)
  } catch (err) {
    return res.status(404).json({ message: err.message })
  }
}

///profile/:profileId
export const viewUserProfile = async (req, res) => {
  try {
    const { id } = req.params
    console.log(id)
    const user = await User.findById(id).populate('ownedPins')
    console.log(user)
    return res.status(200).json(user)
  } catch (err) {
    return res.status(404).json({ message: 'pin not found.' })
  }
}
