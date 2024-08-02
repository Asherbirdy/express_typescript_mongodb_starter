import { Response } from 'express'
import { StatusCode } from '../enums'
import { Req } from '../types'
import config from '../config'

export const UserController = {
  // **
  showCurrentUser: async (req: Req, res: Response) => {
    res.status(StatusCode.OK).json({
      user: req.user
    })
  }
}