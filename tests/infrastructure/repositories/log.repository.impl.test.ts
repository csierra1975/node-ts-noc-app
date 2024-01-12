import { LogEntity, LogSeverityLevel } from "../../../src/domain/entities/log.entity"
import { LogRepositoryImpl } from '../../../src/infrastructure/repositories/log.repository.impl'
describe('log.repository.impl.log', () => {

    const newLog = new LogEntity({
        origin:'log.datasource.test.ts',
        message:'test-message',
        level: LogSeverityLevel.low
    })

    
    const mockLogDatasource = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }
    
    test('saveLog should call the datasource with argument', async () => {

        const repository = new LogRepositoryImpl(mockLogDatasource)

        await repository.saveLog(newLog)

        expect(mockLogDatasource.saveLog).toHaveBeenCalledTimes(1)
        expect(mockLogDatasource.saveLog).toHaveBeenCalledWith(newLog)
    })

    test('getLogs should call the datasource with argument', async() => {

        const repository = new LogRepositoryImpl(mockLogDatasource)

        await repository.getLogs(LogSeverityLevel.low)

        expect(mockLogDatasource.getLogs).toHaveBeenCalledTimes(1)
        expect(mockLogDatasource.getLogs).toHaveBeenCalledWith(LogSeverityLevel.low)
    })

})