import express from 'express'
import { createSessionHandler } from '../controller/auth.controller'
import validateResource from '../middleware/validateResourse'
import { createSessionsSchema } from '../schema/auth.schema'
const router = express.Router()

router.post('/', validateResource(createSessionsSchema), createSessionHandler)

export default router
