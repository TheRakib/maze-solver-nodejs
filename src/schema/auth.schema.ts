import { object, string, TypeOf } from 'zod'

export const createSessionsSchema = object({
    body: object({
        username: string({
            required_error: 'username is required',
        }),
        password: string({
            required_error: 'password is required',
        }).min(6, 'Invalid username or password'),
    }),
})

export type CreateSessionInput = TypeOf<typeof createSessionsSchema>['body']
