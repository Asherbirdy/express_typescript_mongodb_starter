import express, { Application } from 'express'
import config from './config'
import departmentsRoutes from './routes/departments'
import cors from 'cors'

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
  }

  routes () {
    this.app.use('/api/departments', departmentsRoutes)
  }

  listen () {
    this.app.listen(config.port, () => {
      // eslint-disable-next-line no-console
      console.log(`Server up and running at port: ${ config.port }`)
    })
  }

}

export default Server

const server = new Server()

server.listen()