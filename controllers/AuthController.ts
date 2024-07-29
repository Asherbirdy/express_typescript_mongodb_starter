
import { Request, Response } from 'express'
import { StatusCode } from '../enums'
import User from '../models/User'
import { createTokenUser, attachCookieToResponse } from '../utils'

export const AuthController = {
  // ** 
  register: async (req: Request, res: Response) => {
    const { name, email, password } = req.body
    const emailAlreadyExist = await User.findOne({ email })
    if (emailAlreadyExist) {
      // throw new CustomError.BadRequestError(`${ email } 已經被使用！`)
      res.status(StatusCode.BAD_REQUEST).json({ msg: `${ email } 已經被使用！` })
      return
    }

    const isFirstAccount = (await User.countDocuments({})) === 0
    const role = isFirstAccount ? 'admin' : 'user'
    const user = await User.create({ name, email, password, role })
  
    const tokenUser = createTokenUser(user)
    
    attachCookieToResponse({ res, user: tokenUser })
    res.status(StatusCode.CREATED).json({ user: tokenUser })
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