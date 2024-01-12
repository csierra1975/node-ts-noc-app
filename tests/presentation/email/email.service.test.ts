import { EmailService, ISendMailOptions } from "../../../src/presentation/email/email.service"
import nodemailer from 'nodemailer'

describe('email.service.ts', () => {

  const mockSendMail = jest.fn();

  // Mock al createTransport
    nodemailer.createTransport = jest.fn().mockReturnValue( {
      sendMail: mockSendMail
    } );

    const emailService = new EmailService();

    test('should send email', async()=> {

        const options: ISendMailOptions = {
            to: 'test@test.com',
            subject: 'test',
            htmlBody: '<h1>Test</h1>'
        }

        await emailService.sendEmail(options)

        expect( mockSendMail ).toHaveBeenCalledWith( {
            attachments: expect.any( Array ),
            to: 'test@test.com',
            subject: 'test',
            html: '<h1>Test</h1>'
          } );
    })

    test( 'should send email with attachements', async () => {

        const email = 'test@test.com';
        await emailService.sendEmailWithFileSystemLogs( email );
    
        expect( mockSendMail ).toHaveBeenCalledWith( {
          to: email,
          subject: "Logs from service",
          html: expect.any( String ),
          attachments: expect.arrayContaining( [
            {fileName: 'logs-all.log', path: './logs/logs-all.log'},
            {fileName: 'logs-medium.log', path: './logs/logs-medium.log'},
            {fileName: 'logs-high.log', path: './logs/logs-high.log'}
          ] )
        } )
    } )
})