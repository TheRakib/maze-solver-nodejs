import express from 'express'
import {
    createMazeHandler,
    getMazeHandler,
    generateMaze,
    getSolutionHandler,
} from '../controller/maze.controller'
import deserializeUser from '../middleware/deserializeUser'
import validateResource from '../middleware/validateResourse'
import { createMazeSchema, GetMazeInput } from '../schema/maze.schema'
const router = express.Router()

router.post(
    '/',
    [deserializeUser, validateResource(createMazeSchema)],
    createMazeHandler
)
router.get('/', [deserializeUser], getMazeHandler)
router.post('/test', generateMaze)
router.get('/:mazeId/solution', getSolutionHandler)

export default router
