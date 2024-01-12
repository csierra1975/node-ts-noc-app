import mongoose from "mongoose"
import { envs } from "../../../src/config/plugins/envs.plugin"
import { LogModel, MongoDatabase } from "../../../src/data/mongo"
import {MongoLogDatasource} from '../../../src/infrastructure/datasources/mongo-log.datasource'
import { LogEntity, LogSeverityLevel } from "../../../src/domain/entities/log.entity"
import exp from "constants"

describe('mongo-log.datasource.ts', () => {

    const logDataSource = new MongoLogDatasource()

    const log = new LogEntity({
        level:LogSeverityLevel.medium,
        message:'test message',
        origin:'mongo-log-datasource-test.ts'
    })


    beforeAll( async() => {

        await MongoDatabase.connect({
            mongoUrl: envs.MONGO_URL,
            dbName: envs.MONGO_DB_NAME
        })
    } )

    afterEach(async() => {
        await LogModel.deleteMany()
    })

    afterAll(() => {
        mongoose.connection.close()
    })

    test('should create a log', async() => {

        const logSpy = jest.spyOn(console, 'log');

        await logDataSource.saveLog(log);

        expect( logSpy ).toHaveBeenCalled();
        expect( logSpy ).toHaveBeenCalledWith("Mongo Log created:", expect.any(String) );
    })

    test('should get log', async() => {

        await logDataSource.saveLog(log)

        const logs = await logDataSource.getLogs(LogSeverityLevel.medium)

        expect(logs.length).toBe(1)
        expect(logs[0].level).toBe(LogSeverityLevel.medium)
    })
})