require('dotenv').config()
import jwt from 'jsonwebtoken'

export function singJwt(
    object: object,
    keyName: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
    options?: jwt.SignOptions | undefined
) {
    const keyValue: string = process.env[`${keyName}`] as string
    const singingKey = Buffer.from(keyValue, 'base64').toString('ascii')
    return jwt.sign(object, singingKey, {
        ...(options && options),
        algorithm: 'RS256',
    })
}

export function verifyJwt<T>(
    token: string,
    keyName: 'accessTokenPublicKey' | 'refreshTokenPublicKey'
): T | null {
    const keyValue: string = process.env[`${keyName}`] as string
    const publicKey = Buffer.from(keyValue, 'base64').toString('ascii')
    try {
        const decoded = jwt.verify(token, publicKey) as T
        return decoded
    } catch (error) {
        return null
    }
}
