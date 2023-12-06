import { CheckSevice } from "../domain/use-cases/checks/check-service"
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource"
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl"
import { CronService } from "./cron/cron-service"

export class Server {

    public static start() {

        console.log('Server started...')

        const fileSystemDatasource = new FileSystemDatasource()
        const repository = new LogRepositoryImpl(fileSystemDatasource);
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