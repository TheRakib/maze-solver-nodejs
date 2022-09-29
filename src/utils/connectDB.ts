require('dotenv').config()
import mongoose from 'mongoose'
import log from './logger'

const DB_URL: string = process.env.MONGO_URL as string

async function connectDB() {
    try {
        mongoose.connect(DB_URL)
        log.info('Connect to DB')
    } catch (error) {
        console.error(error)
    }
}

export default connectDB
