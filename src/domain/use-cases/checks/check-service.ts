import { ILogEntityOptions, LogEntity, LogSeverityLevel } from "../../entities/log.entity"
import { LogRepository } from "../../repository/log.repository"

export interface ICheckServiceUseCase {
    execute(url: string): Promise<boolean>
}

const checkServiceOrigin =  'Check-service.ts'

type SuccssCallback = (() => void) | undefined
type ErrorCallback = (( error: string ) => void) | undefined

export class CheckService implements ICheckServiceUseCase {

    constructor(
        private readonly logRepository: LogRepository,
        private readonly successCallback: SuccssCallback,
        private readonly errorCallback: ErrorCallback,
    ){}

    async execute(url: string): Promise<boolean> {

        try {
            const req = await fetch ( url )
            if (!req.ok) {
                throw new Error(`Error on check service ${ url }`)
            }

            this.successCallback && this.successCallback();
            const options: ILogEntityOptions = {
                message: `Service ${ url } working`,
                level: LogSeverityLevel.low,
                origin: checkServiceOrigin
            }

            const entity = new LogEntity(options)
            this.logRepository.saveLog(entity)

            return true
        }
        catch(error){
            const errorMessage = `${ error }`
            const options: ILogEntityOptions = {
                message: errorMessage,
                level: LogSeverityLevel.high,
                origin: checkServiceOrigin
            }

            const entity = new LogEntity(options)
            this.logRepository.saveLog(entity)

            this.errorCallback && this.errorCallback(errorMessage)
            return false
        }
    }
}