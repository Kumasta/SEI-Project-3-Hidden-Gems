import mongoose from 'mongoose'
import pinData from './data/pins.js'
import userData from './data/users.js'
import { dbURI } from '../config/environment.js'
import Pin from '../models/pin.js'
import User from '../models/user.js'

const seedDB = async () => {
  try {
    //Connect to the database
    await mongoose.connect(dbURI)
    console.log('✅ Database Connected')
    //Drop all data from the database
    await mongoose.connection.db.dropDatabase()
    console.log('🗑  Database dropped')

    // Create users
    const users = await User.create(userData)
    console.log(`🌱 Users added: ${users.length}`)

    // Add owner to seed documents
    const pinsWithOwers = pinData.map(pin => {
      return { ...pin, owner: users[0]._id }
    })
    // console.log(pinsWithOwers)

    //Seed all the collections we have with our data
    const pinsAdded = await Pin.create(pinsWithOwers)
    console.log(`🌱 Seeded database with ${pinsAdded.length} pins`)
    //Close the database connection
    await mongoose.connection.close()
    console.log('🔚 Seed Finished')
  } catch (err) {
    console.log(err)
    //CLose the database connection
    await mongoose.connection.close()
  }
}
seedDB()