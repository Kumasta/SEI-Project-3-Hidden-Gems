import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

//Schema
const { Schema } = mongoose

///Comment/Review Schema
const reviewSchema = new Schema({
  text: { type: String, required: true, maxlength: 300, minlength: 15 },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
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
}, {
  timestamps: true,
})

pinSchema.virtual('avgRating')
  .get(function () {
    //?? if (!this.reviews.length) return 'Not reviewd yet'
    //?? const sum = this.reviews.reduce((acc, review) => {
    //??   return acc + review.rating
    //?? }, 0)
    //?? return (sum / this.reviews.length).toFixed(2)
  })

//
pinSchema.set('toJSON', {
  virtuals: true,
})


// Plugins
pinSchema.plugin(uniqueValidator)

export default mongoose.model('Pin', pinSchema)