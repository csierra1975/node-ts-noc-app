import { CheckService } from "../domain/use-cases/checks/check-service"
import { CheckSeviceMultiple } from "../domain/use-cases/checks/check-service-multiple"
import { SendEmailLogs } from "../domain/use-cases/sendEmail/send-mail-logs"
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource"
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource"
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource"
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl"
import { CronService } from "./cron/cron-service"
import { EmailService } from "./email/email.service"

// const logRepository = new LogRepositoryImpl(
//     new FileSystemDatasource()
//     );

const fsLogRepository = new LogRepositoryImpl(
         new FileSystemDatasource()
         );

const mongoLogRepository = new LogRepositoryImpl(
        new MongoLogDatasource()
);

const postgresLogRepository = new LogRepositoryImpl(
        new PostgresLogDatasource()
);

const emailService = new EmailService()

export class Server {

    public static start() {

        console.log('Server started...')
        
        // new SendEmailLogs(
        //     emailService,
        //     repository
        // ).execute('carlos.sierra.chacon@gmail.com')
        
        CronService.createJob(
            '*/3 * * * * *', // cronTime
            () =>  {
                new CheckSeviceMultiple(
                    [fsLogRepository, mongoLogRepository, postgresLogRepository],
                    () => console.log (' success'),
                    (error) => console.error (error)
                ).execute('http://localhost:3000/posts')
            }
        )
    }
}