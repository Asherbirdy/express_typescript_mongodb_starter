import dotenv from 'dotenv'

dotenv.config()

export default {
  port: process.env.PORT || '8000',
  environment: process.env.ENVIRONMENT
}