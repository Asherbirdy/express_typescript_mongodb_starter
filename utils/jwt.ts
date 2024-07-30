
// https://jwt.io/introduction
import jwt from 'jsonwebtoken'
import config from '../config'

interface CustomRequest extends Request {
  user?: {
    userId: string
    role: string
  }
}

// 創造 JWT
export const createJWT = ({ payload }: any) => {
  console.log(payload)
  if (!config.jwt_secret) {
    throw new Error('JWT secret is not defined in the config')
  }
  const token = jwt.sign(payload, config.jwt_secret)
  return token
}

// 認證 JWT
export const isTokenValid = (token: any) => {
  if (!config.jwt_secret) {
    throw new Error('JWT secret is not defined in the config')
  }
  return jwt.verify(token, config.jwt_secret)
}

// 將使用者資料 存在 cookie // user是tokenUser
export const attachCookieToResponse = ({ res, user, refreshToken }: any) => {
  const accessTokenJWT = createJWT({ payload: { user } })
  const refreshTokenJWT = createJWT({ payload: { user, refreshToken } })
  const oneDay = 1000 * 60 * 60 * 24

  res.cookie('accessToken', accessTokenJWT, {
    httpOnly: true,
    secure: config.environment === 'PROD',
    signed: true,
    maxAge: 1000 * 60 * 15,
  })

  res.cookie('refreshToken', refreshTokenJWT, {
    httpOnly: true,
    secure: config.environment === 'PROD',
    signed: true,
    expires: new Date(Date.now() + oneDay),
  })
}

