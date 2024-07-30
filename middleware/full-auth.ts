import { isTokenValid } from '../utils'
import { Request, Response, NextFunction } from 'express'
import { StatusCode } from '../enums'
export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
  let token
  // check header
  const authHeader = req.headers.authorization
  if (authHeader && authHeader.startsWith('Bearer')) {
    token = authHeader.split(' ')[ 1 ]
  }
  // check cookies
  else if (req.cookies.token) {
    token = req.cookies.token
  }

  if (!token) {
    res.status(StatusCode.UNAUTHORIZED).json({msg: 'Authentication Invalid'})
    return
  }
  try {
    const payload = isTokenValid(token)

    // Attach the user and his permissions to the req object
    req.user = {
      userId: payload.user.userId,
      role: payload.user.role,
    }

    next()
  } catch (error) {
    res.status(StatusCode.UNAUTHORIZED).json({msg: 'Authentication Invalid'})
    return
  }
}

export const authorizeRoles = (... roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        'Unauthorized to access this route'
      )
    }
    next()
  }
}

