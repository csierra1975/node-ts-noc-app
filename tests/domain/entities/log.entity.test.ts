import { LogEntity, LogSeverityLevel } from '../../../src/domain/entities/log.entity'

const dataLog = {
    message: 'Hi world',
    level: LogSeverityLevel.high,
    origin: 'log.entity.test.ts'
}

describe('log.entity.test.ts', () => {

    test('should create a LogEntity instance', () => {

        const log = new LogEntity(dataLog)

        expect(log).toBeInstanceOf(LogEntity)
        expect(log.message).toBe(dataLog.message)
        expect(log.level).toBe(dataLog.level)
        expect(log.origin).toBe(dataLog.origin)
        expect(log.createdAt).toBeInstanceOf(Date)
    })

    test('should create a LogEntity instance from json', () => {

        const json = '{"message":"Service http://localhost:3000/posts working","level":"low","createdAt":"2024-01-10T16:39:24.041Z","origin":"Check-service.ts"}'

        const log = LogEntity.fromJson(json)

        expect(log).toBeInstanceOf(LogEntity)
        expect(log.message).toBe('Service http://localhost:3000/posts working')
        expect(log.level).toBe('low')
        expect(log.origin).toBe('Check-service.ts')
        expect(log.createdAt).toBeInstanceOf(Date)

    })

    test('should create a LogEntity instance from object', () => {

        const log = LogEntity.fromObject(dataLog)

        expect(log).toBeInstanceOf(LogEntity)
        expect(log.message).toBe(dataLog.message)
        expect(log.level).toBe(dataLog.level)
        expect(log.origin).toBe(dataLog.origin)
        expect(log.createdAt).toBeInstanceOf(Date)
    })
})