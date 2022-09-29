let maze = document.querySelector('.maze')
let ctx = maze.getContext('2d')
let generationComplete = false

let current
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

class Maze {
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
                let cell = new Cell(r, c, this.grid, this.size)
                row.push(cell)
            }
            this.grid.push(row)
        }
        current = this.grid[this.entrance_rows - 1][this.entrance_columns]
        for (let b = 0; b < this.manual_wall.length; b++) {
            const array = this.manual_wall[b]
            let _columns = array[0]
            let _rows = array[1]
            this.grid[_rows - 1][_columns].block = true
        }
    }

    draw() {
        maze.width = this.size
        maze.height = this.size
        maze.style.background = 'black'
        current.visited = true
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.columns; c++) {
                let grid = this.grid
                grid[r][c].show(this.size, this.rows, this.columns)
            }
        }
    }
}

class Cell {
    constructor(rowNum, colNum, parentGrid, parentSize) {
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
        this.parentGrid = parentGrid
        this.parentSize = parentSize
    }

    drawTopWall(x, y, size, columns, rows) {
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(x + size / columns, y)
        ctx.stroke()
    }

    drawRightWall(x, y, size, columns, rows) {
        ctx.beginPath()
        ctx.moveTo(x + size / columns, y)
        ctx.lineTo(x + size / columns, y + size / rows)
        ctx.stroke()
    }

    drawBottomWall(x, y, size, columns, rows) {
        ctx.beginPath()
        ctx.moveTo(x, y + size / rows)
        ctx.lineTo(x + size / columns, y + size / rows)
        ctx.stroke()
    }

    drawLeftWall(x, y, size, columns, rows) {
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(x, y + size / rows)
        ctx.stroke()
    }

    show(size, rows, columns) {
        let x = (this.colNum * size) / columns
        let y = (this.rowNum * size) / rows
        ctx.strokeStyle = '#ffffff'
        ctx.fillStyle = 'black'
        ctx.lineWidth = 2

        if (this.walls.topWall) this.drawTopWall(x, y, size, columns, rows)
        if (this.walls.rightWall) this.drawRightWall(x, y, size, columns, rows)
        if (this.walls.bottomWall)
            this.drawBottomWall(x, y, size, columns, rows)
        if (this.walls.leftWall) this.drawLeftWall(x, y, size, columns, rows)

        if (this.visited) {
            ctx.fillStyle = 'rgb(0, 0, 255)'
            ctx.fillRect(x + 2, y + 1, size / columns - 2, size / rows - 2)
        }

        if (this.block) {
            ctx.fillStyle = 'rgb(83, 247, 43)'
            ctx.fillRect(x + 1, y + 1, size / columns - 2, size / rows - 2)
        }
    }
}

// input
let entrance = 'A1'
let gridSize = '8x8'
let walls = [
    'C1',
    'G1',
    'A2',
    'C2',
    'E2',
    'G2',
    'C3',
    'E3',
    'B4',
    'C4',
    'E4',
    'F4',
    'G4',
    'B5',
    'E5',
    'B6',
    'D6',
    'E6',
    'G6',
    'H6',
    'B7',
    'D7',
    'G7',
    'B8',
]

function converAlphabetToNumber(letter) {
    return alphabet.indexOf(letter)
}

const size = gridSize.split('x')
const width = parseInt(size[0])
const hight = parseInt(size[1])

// entrance
const unfilter_entrance = entrance.split('')
const entrance_columns = converAlphabetToNumber(unfilter_entrance[0])
const entrance_rows = parseInt(unfilter_entrance[1])

// manual Wall

function coverWallIntoNumber(walls) {
    const converted_walls_data = walls.map(function (item) {
        const unfilter_walls = item.split('')
        const walls_columns = converAlphabetToNumber(unfilter_walls[0])
        const walls_rows = parseInt(unfilter_walls[1])
        return [walls_columns, walls_rows]
    })
    return converted_walls_data
}

const blocker = coverWallIntoNumber(walls)

let newMaze = new Maze(
    600,
    width,
    hight,
    entrance_rows,
    entrance_columns,
    blocker
)
newMaze.setup()
newMaze.draw()
