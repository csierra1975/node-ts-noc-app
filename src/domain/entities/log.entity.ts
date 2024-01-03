
export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high'
}

export interface ILogEntityOptions {
    message: string, 
    level: LogSeverityLevel, 
    createAt?: Date,
    origin: string
}

export class LogEntity {

    public level: LogSeverityLevel // Enum
    public message: string
    public createdAt: Date
    public origin: string

    constructor(options: ILogEntityOptions){
        const { message, level, createAt = new Date(), origin } = options
        this.message = message
        this.level = level
        this.createdAt = createAt
        this.origin = origin
    }

    static fromJson = (json: string): LogEntity => {

        const { message, level, createAt, origin } = JSON.parse(json)

        //if (!message) throw new Error('Message is')

        return  new LogEntity({ message, level, createAt, origin });
    }

    static fromObject = (object: { [key: string]: any}): LogEntity => {

        const { message, level, createAt, origin} = object
        const log = new LogEntity({message, level, createAt, origin})

        return log
    }
}