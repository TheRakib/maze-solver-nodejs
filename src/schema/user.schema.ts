import { object, string, TypeOf } from 'zod'

export const createUserSchema = object({
    body: object({
        username: string({
            required_error: 'Username is required',
        }),
        password: string({
            required_error: 'Password is required',
        }).min(6, 'Password is to short - should be min 6 chars'),
    }),
})

export type CreateUserInput = TypeOf<typeof createUserSchema>['body']
