import { Router } from 'express'
import { UserController } from '../controllers'
import { authenticateUser } from '../middleware'

const router = Router()

router.get('/showMe', authenticateUser, UserController.showCurrentUser)

export default router