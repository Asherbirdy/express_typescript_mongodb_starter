import { StatusCode } from '../enums'
import { Request, Response, NextFunction } from 'express'

interface CustomError extends Error {
  statusCode?: number
  errors?: { [key: string]: { message: string } }
  code?: number
  keyValue?: { [key: string]: any }
  value?: string
}

export const errorHandlerMiddleware = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err) // 記錄錯誤以便調試

  const customError = {
    statusCode: err.statusCode || StatusCode.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong, please try again later',
  }

  if (err.name === 'ValidationError' && err.errors) {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(', ')
    customError.statusCode = StatusCode.BAD_REQUEST
  }

  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${ Object.keys(
      err.keyValue || {}
    ).join(', ') } field(s), please choose another value`
    customError.statusCode = StatusCode.BAD_REQUEST
  }

  if (err.name === 'CastError' && err.value) {
    customError.msg = `No item found with id: ${ err.value }`
    customError.statusCode = StatusCode.NOT_FOUND
  }

  return res.status(customError.statusCode).json({ 
    success: false,
    error: customError.msg 
  })
}
