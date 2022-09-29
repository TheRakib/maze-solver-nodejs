import { DocumentType } from '@typegoose/typegoose'
import SessionModel from '../model/session.model'
import { User } from '../model/user.model'
import { singJwt } from '../utils/jwt'

export async function createSession({ userId }: { userId: string }) {
    return SessionModel.create({ user: userId })
}

export async function signRefreshToken({ userId }: { userId: string }) {
    const session = await createSession({
        userId,
    })
    const refreshToken = singJwt(
        {
            session: session._id,
        },
        'refreshTokenPrivateKey'
    )
    return refreshToken
}

export function singAccessToken(user: DocumentType<User>) {
    const payload = user.toJSON()
    const accessToken = singJwt(payload, 'accessTokenPrivateKey')
    return accessToken
}
