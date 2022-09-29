import { Request, Response } from 'express'
import { CreateSessionInput } from '../schema/auth.schema'
import { signRefreshToken, singAccessToken } from '../service/auth.service'
import { findUserByUsername } from '../service/user.service'

export async function createSessionHandler(
    req: Request<{}, {}, CreateSessionInput>,
    res: Response
) {
    const { username, password } = req.body
    const user = await findUserByUsername(username)
    if (!user) {
        return res.send('Invalid username or password')
    }
    const isValid = await user.validatePassword(password)
    if (!isValid) {
        return res.send('Invalid username or password')
    }
    const accessToken = singAccessToken(user)

    const refreshToken = await signRefreshToken({ userId: user._id })
    return res.send({
        accessToken,
        // refreshToken
    })
}
