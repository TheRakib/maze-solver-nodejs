import logger from 'pino'
import dayjs from 'dayjs'

const level: string = process.env.LOG_LEVEL as string

const log = logger({
    transport: {
        target: 'pino-pretty',
    },
    level,
    base: {
        pid: false,
    },
    timestamp: () => `, "time": "${dayjs().format()}"`,
})

export default log
