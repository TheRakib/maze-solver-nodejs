import { DocumentType } from '@typegoose/typegoose'
import MazeModel, { Maze } from '../model/maze.model'

export async function createMaze(input: Partial<Maze>) {
    return MazeModel.create(input)
}

export async function findMaze(id: string) {
    return MazeModel.findById(id)
}

export async function findMazeByUserId(userId: string) {
    return MazeModel.find({ userId })
}

export async function findAndUpdateMaze() {}

export async function DeleteMaze() {}
