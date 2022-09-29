import { Request, Response, NextFunction } from 'express'
import { verifyJwt } from '../utils/jwt'
const deserializeUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const accessToken = (req.headers.authorization || '').replace(
        /^Bearer\s/,
        ''
    )

    if (!accessToken) {
        return res.send('Provide Authorization token')
    }
    const decoded = verifyJwt(accessToken, 'accessTokenPublicKey')
    if (!decoded) {
        return res.sendStatus(403)
    }
    if (decoded) {
        res.locals.user = decoded
        return next()
    }
}

export default deserializeUser
