import mongoose from 'mongoose'
import pinData from './data/pins.js'
import userData from './data/users.js'
import { DB_URI } from '../config/environment.js'
import Pin from '../models/pin.js'
import User from '../models/user.js'

const seedDB = async () => {
  try {
    //Connect to the database
    await mongoose.connect(DB_URI)
    console.log('✅ Database Connected')
    //Drop all data from the database
    await mongoose.connection.db.dropDatabase()
    console.log('🗑  Database dropped')

    // Create users
    const users = await User.create(userData)
    console.log(`🌱 Users added: ${users.length}`)

    // Add owner to seed documents

    const pinsSplitInTwo = pinData.length / 2

    const pinsWithOwnerOne = pinData.slice(0, pinsSplitInTwo)
    const pinsWithOwnerTwo = pinData.slice(pinsSplitInTwo)

    // console.log('owner one',pinsWithOwnerOne)
    // console.log('owner two',pinsWithOwnerTwo)

    const pinsWithOwner = pinsWithOwnerOne.map(pin => {
      return { ...pin, owner: users[0]._id }
    })

    const pinsWithOwner2 = pinsWithOwnerTwo.map(pin => {
      return { ...pin, owner: users[1]._id }
    })


    //Seed all the collections we have with our data
    const pinsAdded = await Pin.create(pinsWithOwner)
    console.log(`🌱 Seeded database with ${pinsAdded.length} pins`)

    const pinsAdded2 = await Pin.create( pinsWithOwner2)
    console.log(`🌱 Seeded database with ${pinsAdded2.length} pins`)
    
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