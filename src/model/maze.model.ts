import { getModelForClass, prop, Ref } from '@typegoose/typegoose'
import { User } from './user.model'

export class Maze {
    @prop({ ref: () => User })
    userId: Ref<User>

    @prop({ required: true })
    gridSize: string

    @prop({ required: true })
    entrance: string

    @prop({ required: true })
    walls: Array<string>
}

const MazeModel = getModelForClass(Maze, {
    schemaOptions: {
        timestamps: true,
    },
})

export default MazeModel
