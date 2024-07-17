import { Router } from 'express'
import { DevController } from '../controllers'

const router = Router()

router.get( '/', DevController.get )

export default router