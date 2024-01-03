import fs from 'fs'
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";


export class FileSystemDatasource implements LogDataSource {

    private readonly logPath = 'logs/'
    private readonly allLogsPath = 'logs/logs-all.log'
    private readonly mediumLogsPath = 'logs/logs-medium.log'
    private readonly hightLogsPath = 'logs/logs-high.log'

    constructor() {
        this.createLogFiles()
    }

    async saveLog(log: LogEntity): Promise<void> {

        const logAsJson = `${ JSON.stringify(log)}\n`

        fs.appendFileSync( this.allLogsPath, logAsJson)

        if ( log.level === LogSeverityLevel.low) return

        if ( log.level === LogSeverityLevel.medium) {
            fs.appendFileSync( this.mediumLogsPath, logAsJson)    
        } else {
            fs.appendFileSync( this.hightLogsPath, logAsJson)
        }
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        
        switch(severityLevel){
            case LogSeverityLevel.low:
                return this.getLogsFromFile(this.allLogsPath)
            case LogSeverityLevel.low:
                return this.getLogsFromFile(this.mediumLogsPath)
             case LogSeverityLevel.low:
                return this.getLogsFromFile(this.hightLogsPath)
            default:
                throw new Error(`${severityLevel} not implemented`)
        }
    }

    private getLogsFromFile = (path: string): LogEntity[] => {

        const content = fs.readFileSync(path, 'utf-8')

        if (content === '') return []

        return content.split('\n').map( line => LogEntity.fromJson(line)) 
    }

    private createLogFiles = () => {
        if ( !fs.existsSync(this.logPath)) {
            fs.mkdirSync(this.logPath)
        }

        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.hightLogsPath
        ].forEach( path  => {
            if ( !fs.existsSync(path)) {
                fs.writeFileSync(path, '')
            }
        })
    }
}