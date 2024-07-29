import { Request, Response } from 'express'
import { StatusCode } from '../enums'

export const AuthController = {
  // ** 
  register: (req: Request, res: Response) => {
    res.status(StatusCode.CREATED).json({ msg: 'register' })
  },

  // ** 
  login: (req: Request, res: Response) => {
    res.status(StatusCode.CREATED).json({ msg: 'login' })
  },

  // ** 
  logout: (req: Request, res: Response) => {
    res.status(StatusCode.CREATED).json({ msg: 'logout' })
  },

}