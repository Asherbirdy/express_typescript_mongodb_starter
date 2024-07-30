// interface User {
//   _id: string; // 將 ObjectId 轉為 string 類型
//   name: string;
//   email: string;
//   password: string;
//   role: string;
//   __v: number;
// }

import { IUser } from '../types'

export const createTokenUser = (user: IUser) => {
  return {
    name: user.name,
    userId: user._id,
    role: user.role
  }
}

