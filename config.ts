import dotenv from 'dotenv'

dotenv.config()

export default {
  port: process.env.PORT || '8000',
  environment: process.env.ENVIRONMENT as 'DEV' | 'PROD',
  mongodb_url: process.env.MONGODB_URL,
  jwt_secret: process.env.JWT_SECRET
}