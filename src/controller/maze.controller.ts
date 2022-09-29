import { json, Request, Response } from 'express'
import { rest } from 'lodash'
const MazeGenerator = require('../utils/generateMaze')
import { CreateMazeInput, GetMazeInput } from '../schema/maze.schema'
import { createMaze, findMaze, findMazeByUserId } from '../service/maze.service'

export async function createMazeHandler(
    req: Request<{}, {}, CreateMazeInput>,
    res: Response
) {
    const userId = res.locals.user._id
    const body = req.body
    const payload = {
        userId: userId,
        ...body,
    }
    try {
        const maze = await createMaze(payload)
        return res.send(maze)
    } catch (error) {
        console.error(error)
    }
}

export async function getMazeHandler(
    req: Request<GetMazeInput>,
    res: Response
) {
    const userId = res.locals.user._id
    try {
        const maze = await findMazeByUserId(userId)
        return res.send(maze)
    } catch (error) {
        console.error(error)
    }
}

export async function singleMazeHandler(
    req: Request<GetMazeInput>,
    res: Response
) {
    const mazeId = req.params.mazeId
    const maze = await findMaze(mazeId)
    if (!maze) {
        return res.sendStatus(404)
    }
    return res.send(maze)
}

export async function generateMaze(req: Request, res: Response) {
    const { entrance, gridSize, walls } = req.body

    const alphabet = [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
    ]

    function converAlphabetToNumber(letter: string) {
        return alphabet.indexOf(letter)
    }

    const size = gridSize.split('x')
    const width = parseInt(size[0])
    const hight = parseInt(size[1])

    // entrance
    const unfilter_entrance = entrance.split('')
    const entrance_columns = converAlphabetToNumber(unfilter_entrance[0])
    const entrance_rows = parseInt(unfilter_entrance[1])

    function coverWallIntoNumber(walls: Array<number>[]) {
        const converted_walls_data = walls.map(function (item) {
            const unfilter_walls = item.split('')
            const walls_columns = converAlphabetToNumber(unfilter_walls[0])
            const walls_rows = parseInt(unfilter_walls[1])
            return [walls_columns, walls_rows]
        })
        return converted_walls_data
    }

    const blocker = coverWallIntoNumber(walls)

    const Data = new MazeGenerator(
        size,
        width,
        hight,
        entrance_rows,
        entrance_columns,
        blocker
    )
    const payload = Data.setup()
    res.send(payload)
}

export async function getSolutionHandler(req: Request, res: Response) {}
