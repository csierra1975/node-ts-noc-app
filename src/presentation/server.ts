import { CheckSevice } from "../domain/use-cases/checks/check-service"
import { SendEmailLogs } from "../domain/use-cases/sendEmail/send-mail-logs"
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource"
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl"
import { CronService } from "./cron/cron-service"
import { EmailService } from "./email/email.service"

const repository = new LogRepositoryImpl(new FileSystemDatasource());
const emailService = new EmailService()

export class Server {

    public static start() {

        console.log('Server started...')
        
        new SendEmailLogs(
            emailService,
            repository
        ).execute('carlos.sierra.chacon@gmail.com')
        
        CronService.createJob(
            '*/3 * * * * *', // cronTime
            () =>  {
                new CheckSevice(
                    repository,
                    () => console.log (' success'),
                    (error) => console.error (error)
                ).execute('http://localhost:3000/posts')
            }
        )
    }
}