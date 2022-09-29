'use strict'

let entrance
let block
let alphabet = [
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

class MazeGenerator {
    constructor(size, rows, columns, entrance_rows, entrance_columns, blocker) {
        this.size = size
        this.columns = columns
        this.rows = rows
        this.entrance_rows = entrance_rows
        this.entrance_columns = entrance_columns
        this.grid = []
        this.stack = []
        this.manual_wall = blocker
    }

    setup() {
        for (let r = 0; r < this.rows; r++) {
            let row = []
            for (let c = 0; c < this.columns; c++) {
                let cell = new Cell(r, c)
                row.push(cell)
            }
            this.grid.push(row)
        }
        this.grid[this.entrance_rows - 1][this.entrance_columns].entrance = true
        for (let b = 0; b < this.manual_wall.length; b++) {
            const array = this.manual_wall[b]
            let _columns = array[0]
            let _rows = array[1]
            this.grid[_rows - 1][_columns].block = true
        }
        return this.grid
    }
}

class Cell {
    constructor(rowNum, colNum) {
        this.rowNum = rowNum
        this.colNum = colNum
        this.visited = false
        this.walls = {
            topWall: true,
            rightWall: true,
            bottomWall: true,
            leftWall: true,
        }
        this.block = false
    }
}

module.exports = MazeGenerator
