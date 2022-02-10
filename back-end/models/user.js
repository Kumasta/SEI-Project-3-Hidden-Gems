import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import uniqueValidator from 'mongoose-unique-validator'


const { Schema } = mongoose

//Embbed schema of profile
const userProfile = new Schema({
  name: { type: String, required: true, default: '' },
  bio: { type: String, required: true, maxlength: 500, default: '' },
  profilePicURL: { type: String, default: '' },

})


//Schema
const userSchema = new Schema({
  username: { type: String, required: true, unique: true, maxlength: 30 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  superUser: { type: Boolean },
  profile: userProfile,//Embbed Schema / [profile]
})


userProfile.virtual('ownedPins', {
  ref: 'Pin',
  localField: '_id',
  foreignField: 'owner',
})

userProfile.virtual('avgPinRating')
  .get(function () {
    if (!this.ownedPins.length) return 'Not rated yet'
    const sum = this.ownedPins.reduce((acc, score) => {
      return acc + score.rating
    }, 0)
    return (sum / this.ratings.length).toFixed(2)
  })

userSchema.set('toJSON', {
  virtuals: true,
  transform(_doc, json) {
    delete json.password
    delete json.superUser
    return json
  },
})

// Creating our passwordConfirmation virtual field
userSchema
  .virtual('passwordConfirmation') //Virtual Key
  .set(function (passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation//< This one is the place holder
  })


// Custom pre validation

userSchema
  .pre('validate', function (next) {
    if (this.isModified('password') && this.password !== this._passwordConfirmation) {
      this.invalidate('passwordConfirmation', 'Does not match password field.')
    }
    next()
  })


// Custom pre save
// Use bcrypt to hash the plaine text passwrod passed by the user. 
userSchema
  .pre('save', function (next) {
    if (this.isModified('password')) {
      this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
    }
    next()
  })

// unique validator
userSchema.plugin(uniqueValidator)

userSchema.methods.validatePassword = function (password) {
  console.log(password, this.password)
  return bcrypt.compareSync(password, this.password)
}

//define and export ou model
export default mongoose.model('User', userSchema)