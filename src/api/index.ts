import express from 'express'
import login from './login'
import maze from './maze'
import user from './user'
const router = express.Router()

router.get('/', (_, res) => {
    res.json({
        message: 'Maze API route',
    })
})

router.use('/user', user)
router.use('/login', login)
router.use('/maze', maze)

export default router
