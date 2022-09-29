import { array, object, string, TypeOf } from 'zod'

export const createMazeSchema = object({
    body: object({
        entrance: string({
            required_error: 'Maze Entrance required',
        }),
        gridSize: string({
            required_error: 'Maze Grid size required',
        }),
        walls: string().array().nonempty({
            message: "Can't be empty!",
        }),
    }),
})

export const getMazeSchema = object({
    params: object({
        mazeId: string(),
    }),
})

export type CreateMazeInput = TypeOf<typeof createMazeSchema>['body']
export type GetMazeInput = TypeOf<typeof getMazeSchema>['params']
