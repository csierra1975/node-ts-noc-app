import { EmailService } from "../../../presentation/email/email.service"
import { ILogEntityOptions, LogEntity, LogSeverityLevel } from "../../entities/log.entity"
import { LogRepository } from "../../repository/log.repository"

const SendEmailLogsOrigin = 'Send Email use case'

interface ISendLogEmailUseCase {
    execute: (to: string | string[]) => Promise<boolean>
}

export class SendEmailLogs  implements ISendLogEmailUseCase {

    constructor(
        private  readonly emailService: EmailService,
        private readonly logRepository: LogRepository,
    ){}

    async execute (to: string | string[]) {
        
        try {
            
            const sent = await this.emailService.sendEmailWithFileSystemLogs(to)

            if (!sent) {
                throw new Error('Email log not send')
            }

            const options: ILogEntityOptions = {
                message: `Email sent`,
                level: LogSeverityLevel.low,
                origin: SendEmailLogsOrigin
            }

            const entity = new LogEntity(options)
            this.logRepository.saveLog(entity)

            return true
        } catch (error) {

            const options: ILogEntityOptions = {
                message: `Email was not sent`,
                level: LogSeverityLevel.high,
                origin: SendEmailLogsOrigin
            }

            const entity = new LogEntity(options)
            this.logRepository.saveLog(entity)
            return false
        }
    }
}