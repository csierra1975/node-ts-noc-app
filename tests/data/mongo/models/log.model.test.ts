import mongoose from "mongoose"
import { envs } from "../../../../src/config/plugins/envs.plugin"
import { LogModel, MongoDatabase } from "../../../../src/data/mongo"

describe('log.mode.test.ts', () => {

    beforeAll(async () => {

        await MongoDatabase.connect({
            mongoUrl: envs.MONGO_URL,
            dbName: envs.MONGO_DB_NAME
        })
    })

    afterAll( () => {
        mongoose.connection.close()
    })

    test('should return LogModel', async () => {
        // Borrar
    })
/*
    test('should return LogModel', async () => {

        const logData = {
            origin: 'log.model.tes.ts',
            message: 'test-message2',
            level: 'low'
        }

        const log = await LogModel.create( logData )

        expect(log).toEqual( expect.objectContaining({
           ...logData,
            createAt: expect.any(Date),
            id: expect.any(String)
        }))

        await LogModel.findByIdAndDelete( log.id );
    })

    test('should retrun the schema object', () => {

        const schema = LogModel.schema.obj

        expect(schema).toEqual(expect.objectContaining(
            {
            message: { type: expect.any(Function), required: true },
            level: {
              type: expect.any(Function),
              enum: [ 'low', 'medium', 'high' ],
              default: 'low'
            },
            origin: { type: expect.any(Function) },
            createAt: expect.any(Object)
          }))
    })
*/
})