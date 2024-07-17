import { Request, Response } from 'express'
import { StatusCode } from '../enums'

export const DevController = {

  // ** 
  get: (req: Request, res: Response) => {
    res.status(StatusCode.OK).json( {
      msg: 'DevController_GET'
    } )
  }

}