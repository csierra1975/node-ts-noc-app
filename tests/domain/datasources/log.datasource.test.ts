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

    test('should test the abstract class', () => {

        const mockLogDataSource = new MockLogDatasource()

        expect(mockLogDataSource).toBeInstanceOf(MockLogDatasource)
        expect(typeof mockLogDataSource.saveLog).toHaveProperty('function')
        expect(typeof mockLogDataSource.getLogs).toHaveProperty('function')
    })
})