import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config()

export const databaseConnection = async () => {
  //get mongo uri and connect to database
  //if not get an error
  if (process.env.MONGO_URI) {
    try {
      await mongoose.connect(process.env.MONGO_URI)
      console.log('Database connection successful.')
    } catch (error) {
      throw new Error('Database connection error')
    }
  } else {
    throw new Error('Please provide a valid Mongo URI')
  }
}
