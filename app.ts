import 'express-async-errors'
import express, { Application } from 'express'
import config from './config'
import DevRouter from './routes/DevRoutes'
import cors from 'cors'
import morgan from 'morgan'
import { rateLimit } from 'express-rate-limit'
import { connectDB } from './db'
import { errorHandlerMiddleware } from './middleware'
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
    this.app.use(express.static('public'))

    if (config.environment === 'DEV') {
      this.app.use(
        morgan('tiny')
      )
    }

    this.app.use(
      rateLimit({
        windowMs: 15 * 60 * 1000,
        limit: 100,
        standardHeaders: 'draft-7',
        legacyHeaders: false,
      }))

    this.app.use(errorHandlerMiddleware)
  }

  routes () {
    // ** v1
    this.app.use('/api/v1/dev', DevRouter)

  }

  listen () {
    this.app.listen(config.port, () => {

      if(config.mongodb_url) {
        connectDB(config.mongodb_url)
      }
      // eslint-disable-next-line no-console
      console.log(`Server up and running at port: ${ config.port }`)
    })
  }
}

export default Server

const server = new Server()

server.listen()