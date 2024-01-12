import { LogEntity } from '../../../../src/domain/entities/log.entity'
import { CheckService } from '../../../../src/domain/use-cases/checks/check-service'

describe('check-service.ts Check case use case', () => { 

    const mokcRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }

    const successCallback = jest.fn()
    const errorCallback = jest.fn()

    const checkService = new CheckService(mokcRepository,
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

        expect(mokcRepository.saveLog).toBeCalledWith(expect.any(LogEntity))
    })

    test('should call successCallback when fetch returns false', async() => {


        const wasOk = await checkService.execute('https://godfdfdogle.com')

        expect(wasOk).toBe(false)
        expect(successCallback).not.toHaveBeenCalled()
        expect(errorCallback).toHaveBeenCalled()

        expect(mokcRepository.saveLog).toBeCalledWith(expect.any(LogEntity))
    })
 })