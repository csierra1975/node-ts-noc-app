import { LogEntity, LogSeverityLevel } from "../../entities/log.entity"
import { LogRepository } from "../../repository/log.repository"

export interface ICheckServiceUseCase {
    execute(url: string): Promise<boolean>
}

type SuccssCallback = (() => void) | undefined
type ErrorCallback = (( error: string ) => void) | undefined

export class CheckSevice implements ICheckServiceUseCase {

    constructor(
        private readonly logRepository: LogRepository,
        private readonly successCallback: SuccssCallback,
        private readonly errorCallback: ErrorCallback,
    ){}

    async execute(url: string): Promise<boolean> {

        try {
            const req = await fetch ( url )
            if (!req.ok) {
                throw new Error(`Error on check servcie ${ url }`)
            }

            this.successCallback && this.successCallback();
            const entity = new LogEntity(`Service ${ url } working`, LogSeverityLevel.low)
            this.logRepository.saveLog(entity)

            return true
        }
        catch(error){
            const errorMessage = `${ error }`
            const entity = new LogEntity(errorMessage, LogSeverityLevel.high)
            this.logRepository.saveLog(entity)

            this.errorCallback && this.errorCallback(errorMessage)
            return false
        }
    }
}