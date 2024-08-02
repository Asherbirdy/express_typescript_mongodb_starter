import 'express-async-errors'
import express, { Application } from 'express'
import config from './config'

// Routes
import DevRouter from './routes/DevRoutes'
import AuthRoutes from './routes/AuthRoutes'
import UserRoutes from './routes/UserRoutes'

import cors from 'cors'
import morgan from 'morgan'
import { rateLimit } from 'express-rate-limit'
import { connectDB } from './db'
import { errorHandlerMiddleware } from './middleware'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import mongoSanitize from 'express-mongo-sanitize'
import hpp from 'hpp'

class Server {
  private app: Application

  constructor () {
    this.app = express()
    this.middlewares()
    this.routes()
  }

  middlewares () {
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(cookieParser(config.jwt_secret))
    this.app.use(express.static('public'))

    if (config.environment === 'DEV') {
      this.app.use(
        morgan('tiny')
      )
    }
    this.app.set('trust proxy', 1) 
    this.app.use(
      rateLimit({
        windowMs: 15 * 60 * 1000,
        limit: 100,
        standardHeaders: 'draft-7',
        legacyHeaders: false,
      }))

  }

  routes () {
    // ** v1
    this.app.use('/api/v1/dev', DevRouter)
    this.app.use('/api/v1/auth', AuthRoutes)
    this.app.use('/api/v1/users', UserRoutes)
  }

  handleErrorAndSafety () {
    this.app.use(errorHandlerMiddleware)
    this.app.use(helmet())
    this.app.use(mongoSanitize())
    this.app.use(hpp())
  }

  listen () {
    this.app.listen(config.port, async () => {
      
      if(config.mongodb_url) {
        await connectDB(config.mongodb_url)
      }
      // eslint-disable-next-line no-console
      console.log(`Server up and running at port: ${ config.port }`)
    })
  }
}

export default Server

const server = new Server()

server.listen()