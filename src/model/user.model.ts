import {
    getModelForClass,
    modelOptions,
    DocumentType,
    pre,
    prop,
    Severity,
    index,
} from '@typegoose/typegoose'
import argon2 from 'argon2'
import log from '../utils/logger'

@pre<User>('save', async function () {
    if (!this.isModified('password')) {
        return
    }
    const hash = await argon2.hash(this.password)
    this.password = hash
    return
})
@index({ email: 1 })
@modelOptions({
    schemaOptions: {
        timestamps: true,
    },
    options: {
        allowMixed: Severity.ALLOW,
    },
})
export class User {
    @prop({ lowercase: true, required: true, unique: true })
    username: string
    @prop({ required: true })
    password: string

    async validatePassword(
        this: DocumentType<User>,
        candidatePassword: string
    ) {
        try {
            return await argon2.verify(this.password, candidatePassword)
        } catch (error) {
            log.error(error, 'Could not validate password')
        }
    }
}

const UserModel = getModelForClass(User)

export default UserModel
