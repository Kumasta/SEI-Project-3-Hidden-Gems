import express from 'express'
import mongoose from 'mongoose'
import router from './config/routes.js'
import { port, dbURI } from './config/environment.js'

const app = express()

//Set up server
const startSever = async () => {
  try {
    await mongoose.connect(dbURI)

    //Middleware

    //josn parser
    app.use(express.json())

    //Logger
    app.use((req, _res, next) => {
      console.log(`📮 Request received: ${req.method} - ${req.url} 📮`)
      next()
    })
 
    //Routes
    app.use(router)

    //Catch all
    app.use((_req, res) => {
      return res.status(404).json({ message: 'Route not found' })
    })
    
    app.listen(port, () => console.log(`✅ Server is listening on port ${port} ✅`))
  } catch (err) {
    console.log(err)
  }
}

startSever()