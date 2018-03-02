import { Router } from 'express'

import list from './list'
import login from './login'

const router = Router()

// Add list Routes
router.use(list)
router.use(login)

export default router
