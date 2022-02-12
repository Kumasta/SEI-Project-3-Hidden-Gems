import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

//Schema
const { Schema } = mongoose

//Embbed Rating Schema
const pinRatingSchema = new Schema({
  rating: { type: Number, required: true, min: 1, max: 5 },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
})


///Likes
const likeSchema = new Schema({
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  like: { type: Boolean, default: false }, //?? Change likes to like in the key
})

///Comment
const reviewSchema = new Schema({
  text: { type: String, required: true, maxlength: 300, minlength: 15 },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  likes: [likeSchema],
}, {
  timestamps: true,
})

const pinSchema = new Schema({
  title: { type: String, required: true },
  typeOfPlace: { type: String, required: true }, //One value but will have serveral tags below
  description: { type: String, required: true, minlength: 50 },
  imageUrl: { type: String, required: true },
  status: { type: Boolean },
  tags: [{ type: String }],
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  reviews: [reviewSchema], //Embedded Schema
  ratings: [pinRatingSchema],
  averageRating: { type: Number, required: true },
}, {
})

pinSchema.virtual('avgRating')
  .get(function () {
    if (!this.ratings.length) return 'Not rated yet'
    const sum = this.ratings.reduce((acc, score) => {
      return acc + score.rating
    }, 0)
    return (sum / this.ratings.length).toFixed(2)
  })

reviewSchema.virtual('sumOfLikes')
  .get(function () {
    if (!this.likes.length) return 'Not rated yet'
    return this.likes.length
  })

//
pinSchema.set('toJSON', {
  virtuals: true,
})

reviewSchema.set('toJSON', {
  virtuals: true,
})

// Plugins
pinSchema.plugin(uniqueValidator)

export default mongoose.model('Pin', pinSchema)