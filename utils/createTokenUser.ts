import { IUser } from '../types'

export const createTokenUser = (user: IUser) => {
  return {
    name: user.name,
    userId: user._id,
    role: user.role
  }
}

