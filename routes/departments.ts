import { Router } from 'express'
import { getDepartments, } from '../controllers/departments'

const router = Router()

router.get('/', getDepartments)

export default router