import { isTokenValid, attachCookieToResponse } from '../utils'
import { StatusCode } from '../enums'
import Token from '../models/Token'
import { Request, Response, NextFunction } from 'express'
export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
  const { refreshToken, accessToken } = req.signedCookies

  try {
    if (accessToken) {
      const payload = isTokenValid(accessToken)
      req.user = payload.user
      return next()
    }
    const payload = isTokenValid(refreshToken)

    const existingToken = await Token.findOne({
      user: payload.user.userId,
      refreshToken: payload.refreshToken,
    })
    if (!existingToken || !existingToken?.isValid) {
      // throw new CustomError.UnauthenticatedError('Authentication Invalid')
      res.status(StatusCode.UNAUTHORIZED).json({msg: 'Authentication Invalid'})
      return
    }
    attachCookieToResponse({
      res,
      user: payload.user,
      refreshToken: existingToken.refreshToken,
    })
    req.user = payload.user
  } catch (error) {
    // throw new CustomError.UnauthenticatedError('Authentication Invalid')
    res.status(StatusCode.UNAUTHORIZED).json({msg: 'Authentication Invalid'})
    return
  }
}

export const authorizePermission = (... role) => {
  return (req: Request, res: Request, next: NextFunction) => {
    if (!role.includes(req.user.role)) {
      // throw new CustomError.UnauthenticatedError(
      //   'Unauthorized to access this route'
      // )

      res.status(StatusCode.UNAUTHORIZED).json({msg: 'Authentication Invalid'})
      return
    }
    next()
  }
}

