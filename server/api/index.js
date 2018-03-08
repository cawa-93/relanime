import { Router } from 'express'

import login from './login'

const router = Router()

// Add list Routes
router.use(login)

export default router
