import { StatusCode } from '../enums'
import { Request, Response } from 'express'

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
) => {
  const customError = {
    // set default
    statusCode: err.statusCode || StatusCode.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong try again later',
  }

  if (err.name === 'ValidationError' && err.errors) {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(',')
    customError.statusCode = 400
  }

  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${ Object.keys(
      err.keyValue || {}
    ) } field, please choose another value`
    customError.statusCode = 400
  }

  if (err.name === 'CastError' && err.value) {
    customError.msg = `No item found with id: ${ err.value }`
    customError.statusCode = 404
  }

  return res.status(customError.statusCode).json({ msg: customError.msg })
}
