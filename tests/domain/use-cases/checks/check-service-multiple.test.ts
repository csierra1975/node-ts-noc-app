import { LogEntity } from '../../../../src/domain/entities/log.entity'
import { CheckSeviceMultiple } from '../../../../src/domain/use-cases/checks/check-service-multiple'

describe('check-service.ts Check case use case', () => { 

    const mokcRepositoryMongo = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }

    const mokcRepositoryFileSystem = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }

    const listRepositories = [mokcRepositoryMongo, mokcRepositoryFileSystem]
    const successCallback = jest.fn()
    const errorCallback = jest.fn()

    const checkService = new CheckSeviceMultiple(listRepositories,
                            successCallback, 
                            errorCallback)

    beforeEach( () => {
        jest.clearAllMocks()
    })                      

    test('should call successCallback when fetch returns true', async() => {


        const wasOk = await checkService.execute('https://google.com')

        expect(wasOk).toBe(true)
        expect(successCallback).toHaveBeenCalled()
        expect(errorCallback).not.toHaveBeenCalled()

        listRepositories.forEach(mokcRepository => {
            expect(mokcRepository.saveLog).toBeCalledWith(expect.any(LogEntity))
        })
    })

    test('should call successCallback when fetch returns false', async() => {


        const wasOk = await checkService.execute('https://godfdfdogle.com')

        expect(wasOk).toBe(false)
        expect(successCallback).not.toHaveBeenCalled()
        expect(errorCallback).toHaveBeenCalled()

        listRepositories.forEach(mokcRepository => {
            expect(mokcRepository.saveLog).toBeCalledWith(expect.any(LogEntity))
        })
    })
 })