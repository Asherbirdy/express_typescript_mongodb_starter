import { Request, Response } from 'express'
import { StatusCode } from '../enums'

export const AuthController = {
  // ** 
  register: (req: Request, res: Response) => {
    res.status(StatusCode.CREATED).json({ msg: 'register' })
  }
}