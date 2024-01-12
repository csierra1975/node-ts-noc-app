import fs from 'fs'
import path from 'path'
import {FileSystemDatasource} from '../../../src/infrastructure/datasources/file-system.datasource'
import { LogEntity, LogSeverityLevel } from '../../../src/domain/entities/log.entity'

describe('file-system.datasource.ts', () => {

    const logPath = path.join(__dirname, '../../../logs')
    
    beforeEach( () => {
        fs.rmSync(logPath, {recursive:true, force:true})
    })

    test('should create a log files if they do not exist', () => {

        new FileSystemDatasource()
        const files = fs.readdirSync(logPath)

        expect(files).toEqual(['logs-all.log','logs-high.log','logs-medium.log'])

    })

    test('should save a log in all logs file.log', async() => {

        const logDataSource = new FileSystemDatasource()
        const log = new LogEntity({
            message: 'test',
            level: LogSeverityLevel.low,
            origin: 'file-system-datasource.test.ts'
        })

        await logDataSource.saveLog(log)

        const allLogs = fs.readFileSync(path.join(logPath, 'logs-all.log'), 'utf-8')
        
        expect(allLogs).toContain( JSON.stringify(log))
    })

    test('should save a log in all and high logs file.log', async() => {

        const logDataSource = new FileSystemDatasource()
        const log = new LogEntity({
            message: 'test',
            level: LogSeverityLevel.high,
            origin: 'file-system-datasource.test.ts'
        })

        await logDataSource.saveLog(log)

        const allLogs = fs.readFileSync(path.join(logPath, 'logs-all.log'), 'utf-8')
        const highLogs = fs.readFileSync(path.join(logPath, 'logs-high.log'), 'utf-8')
        
        expect(allLogs).toContain( JSON.stringify(log))
        expect(highLogs).toContain( JSON.stringify(log))
    })

    test('should save a log in all and medium logs file.log', async() => {

        const logDataSource = new FileSystemDatasource()
        const log = new LogEntity({
            message: 'test',
            level: LogSeverityLevel.medium,
            origin: 'file-system-datasource.test.ts'
        })

        await logDataSource.saveLog(log)

        const allLogs    = fs.readFileSync(path.join(logPath, 'logs-all.log'), 'utf-8')
        const mediumLogs = fs.readFileSync(path.join(logPath, 'logs-medium.log'), 'utf-8')
        
        expect(allLogs).toContain( JSON.stringify(log))
        expect(mediumLogs).toContain( JSON.stringify(log))
    })

    test('should return all logs', async() => {

        const logDataSource = new FileSystemDatasource()
        const logLow = new LogEntity({
            message: 'low',
            level: LogSeverityLevel.low,
            origin: 'file-system-datasource.test.ts'
        })
        const logMedium = new LogEntity({
            message: 'medium',
            level: LogSeverityLevel.medium,
            origin: 'file-system-datasource.test.ts'
        })
        const logHigh = new LogEntity({
            message: 'high',
            level: LogSeverityLevel.high,
            origin: 'file-system-datasource.test.ts'
        })
        await logDataSource.saveLog(logLow)
        await logDataSource.saveLog(logMedium)
        await logDataSource.saveLog(logHigh)

        const logsLow = await logDataSource.getLogs(LogSeverityLevel.low)
        const logsMedium = await logDataSource.getLogs(LogSeverityLevel.medium)
        const logsHigh = await logDataSource.getLogs(LogSeverityLevel.high)

        expect(logsLow).toEqual( expect.arrayContaining([logLow]))
    })
})