import mongoose from 'mongoose'
mongoose.set('strictQuery', false)

export const connectDB = (url:string) => {
  return mongoose.connect(url)
}

