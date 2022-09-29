import { Request, Response, NextFunction } from 'express'
import { verifyJwt } from '../utils/jwt'
const getUserId = async (req: Request, res: Response, next: NextFunction) => {
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
    return decoded
}

export default getUserId
