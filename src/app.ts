require('dotenv').config()
import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import connectDB from './utils/connectDB'
import log from './utils/logger'
// import api from './api'
import user from './api/user'
import login from './api/login'
import deserializeUser from './middleware/deserializeUser'
import maze from './api/maze'

const app = express()
app.use(morgan('dev'))
app.use(helmet())
app.use(cors())
app.use(express.json())

app.use('/user', user)
app.use('/login', login)
app.use('/maze', maze)
app.use('/maze', maze)

const port = process.env.PORT || 3000
app.listen(port, () => {
    log.info(`API start at http://localhost:${port}`)
    connectDB()
})
