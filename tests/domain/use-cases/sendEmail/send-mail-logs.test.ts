
import { SendEmailLogs } from '../../../../src/domain/use-cases/sendEmail/send-mail-logs'
import { LogEntity } from '../../../../src/domain/entities/log.entity'

describe('Use case send-mail-logs', () => {

    const mockEmailService = {
        sendEmailWithFileSystemLogs: jest.fn().mockResolvedValue(true)
    }
    
    const mokcRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }

    const sendEmailLogs = new SendEmailLogs(
        mockEmailService as any,
        mokcRepository
    )

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('should send log', async () => {

        const result = await sendEmailLogs.execute('carlostest@google.com')

        expect(result).toBe(true)

        expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1)
        expect(mokcRepository.saveLog).toHaveBeenCalledWith( expect.any(LogEntity))
        expect(mokcRepository.saveLog).toHaveBeenCalledWith(  expect.objectContaining({
            level: 'low',
            message: 'Email sent',
            origin: 'Send Email use case'
        }))
    })

    test('should log in case of error', async () => {

        mockEmailService.sendEmailWithFileSystemLogs.mockResolvedValue(false)

        const sendEmailLogs = new SendEmailLogs(
            mockEmailService as any,
            mokcRepository
        )

        const result = await sendEmailLogs.execute('carlostest@google.com')

        expect(result).toBe(false)

        expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1)
        expect(mokcRepository.saveLog).toHaveBeenCalledWith( expect.any(LogEntity))
        expect(mokcRepository.saveLog).toHaveBeenCalledWith(  expect.objectContaining({
            level: 'high',
            message: 'Email was not sent',
            origin: 'Send Email use case'
        }))
    })
})