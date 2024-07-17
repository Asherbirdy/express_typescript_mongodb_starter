import { Request, Response } from 'express'

export const DevController = {

  // ** 
  get: (req: Request, res: Response) => {
    res.json( {
      msg: 'DevController_GET'
    } )
  }

}