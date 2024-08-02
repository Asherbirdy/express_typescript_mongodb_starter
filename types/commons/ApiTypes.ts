
import { Request } from 'express'

export interface Req extends Request {
  user?: {
    userId: string
    role: string
  }
}