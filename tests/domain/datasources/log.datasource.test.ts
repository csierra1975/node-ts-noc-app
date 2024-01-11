import { SeverityLevel } from '@prisma/client'
import {LogDataSource} from '../../../src/domain/datasources/log.datasource'
import { LogEntity, LogSeverityLevel } from '../../../src/domain/entities/log.entity'

describe('log.datasource.test.ts LogDataSource', () => {

    const newLog = new LogEntity({
        origin:'log.datasource.test.ts',
        message:'test-message',
        level: LogSeverityLevel.low
    })

    class MockLogDatasource implements LogDataSource {
        async saveLog(log: LogEntity): Promise<void> {
            return
        }
        async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
            return  [newLog]
        }
    }

    test('should test the abstract class', async () => {

        const mockLogDataSource = new MockLogDatasource()

        expect(mockLogDataSource).toBeInstanceOf(MockLogDatasource)
        expect(typeof mockLogDataSource.saveLog).toBe('function')
        expect(typeof mockLogDataSource.getLogs).toBe('function')

        await mockLogDataSource.saveLog(newLog) // asi comprobamos que el tipo del parámetro no se ha cambiado
        const logs = await mockLogDataSource.getLogs(LogSeverityLevel.low) // asi comprobamos que el tipo del parámetro no se ha cambiado
        expect( logs ).toHaveLength(1) 
        expect(logs[0]).toBeInstanceOf(LogEntity)
    })
})