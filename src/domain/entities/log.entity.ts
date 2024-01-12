
export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high'
}

export interface ILogEntityOptions {
    message: string, 
    level: LogSeverityLevel, 
    createdAt?: Date,
    origin: string
}

export class LogEntity {

    public level: LogSeverityLevel // Enum
    public message: string
    public createdAt: Date
    public origin: string

    constructor(options: ILogEntityOptions){
        const { message, level, createdAt = new Date(), origin } = options
        this.message = message
        this.level = level
        this.createdAt = createdAt
        this.origin = origin
    }

    static fromJson = (json: string): LogEntity => {
        
        json = ( json === '' ) ? '{}': json;
        const { message, level, createdAt, origin } = JSON.parse(json)

        //if (!message) throw new Error('Message is')

        return  new LogEntity({ message, level, createdAt: new Date(createdAt), origin });
    }

    static fromObject = (object: { [key: string]: any}): LogEntity => {

        const { message, level, createdAt, origin} = object
        const log = new LogEntity({message, level, createdAt, origin})

        return log
    }
}