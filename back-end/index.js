import express from 'express'
import mongoose from 'mongoose'
import router from './config/routes.js'
import { PORT, DB_URI } from './config/environment.js'
import 'dotenv/config' // only needs to be added if it doesn't already exist
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()

//Set up server
const startSever = async () => {
  try {
    await mongoose.connect(process.env.DB_URI)

    //Middleware

    //josn parser
    app.use(express.json())

    //Logger
    app.use((req, _res, next) => {
      console.log(`📮 Request received: ${req.method} - ${req.url} 📮`)
      next()
    })
 
    //Routes
    app.use('/api', router)

    // ** New lines **
    app.use(express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })

    //Catch all
    app.use((_req, res) => {
      return res.status(404).json({ message: 'Route not found' })
    })
    
    app.listen(process.env.PORT, () => console.log(`✅ Server is listening on PORT ${process.env.PORT} ✅`))
  } catch (err) {
    console.log(err)
  }
}

startSever()