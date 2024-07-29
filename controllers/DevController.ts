import { Request, Response } from 'express'
import { StatusCode } from '../enums'
import config from '../config'

export const DevController = {

  // ** 
  get: (req: Request, res: Response) => {
    console.log(config.environment)
    res.status(StatusCode.OK).json( {
      msg: 'DevController_GET',
      envPort: config.environment
    } )
  }

}