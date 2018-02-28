import { Router } from 'express'

import list from './list'

const router = Router()

// Add list Routes
router.use(list)

export default router
