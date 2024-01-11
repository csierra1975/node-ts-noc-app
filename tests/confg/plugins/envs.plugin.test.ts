import { envs } from "../../../src/config/plugins/envs.plugin"


describe('env.plugin.ts', () => {

    test('should return env options', () =>{

        expect( envs).toEqual({
            PORT: 3000,
            MAILER_EMAIL: 'carlos.sierra.chacon@gmail.com',
            MAILER_SECRET_KEY: 'igdrnfrwnhmgstdf',
            MAILER_SERVICE: 'gmail',
            PROD: false,
            MONGO_URL: 'mongodb://carlos:123456789@localhost:27017',
            MONGO_DB_NAME: 'NOC-TEST',
            MONGO_USER: 'carlos',
            MONGO_PASS: '123456789'
        })
    })

    test('should return error if not found env', async () =>{

        jest.resetModules()

        process.env.PORT = 'ABC'

       try {
            await import('../../../src/config/plugins/envs.plugin')
            // esperamos que el import nunca se cargue y lanze una exception ya que el puerto es una cadena y no numérico
            expect(true).toBe(false)
       }
       catch(error){
            expect(`${error}`).toContain('"PORT" should be a valid integer')
       }
    })
})