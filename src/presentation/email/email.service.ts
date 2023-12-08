import nodemailer from 'nodemailer'
import { envs } from '../../config/plugins/envs.plugin'
import { LogRepository } from '../../domain/repository/log.repository'
import { ILogEntityOptions, LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity'

export interface ISendMailOptions {
    to: string | string[],
    subject: string,
    htmlBody: string,
    attachments?: IAttachments[]
}

interface IAttachments {
    fileName: string,
    path: string
}

const EmailServiceOrigin =  'Email-service.ts'

export class EmailService {

    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    })

    async sendEmail(options: ISendMailOptions): Promise<boolean> {

        const { to, subject, htmlBody, attachments = []} = options

        try {
            
            const sendInformation = await this.transporter.sendMail({
                to,
                subject,
                html: htmlBody,
                attachments
            })
            
            return true
        } catch (error) {
            return false
        }
    }

    async sendEmailWithFileSystemLogs(to: string | string[]): Promise<boolean> {

        const subject = 'Logs from service'
        const htmlBody = `
            <h3>Logs del sistema</h3>
            <p>Ipsum ea adipisicing ut deserunt. Consectetur dolore exercitation ad ea veniam sint enim ut duis labore ut. Aliquip laboris consequat mollit laborum esse nostrud in. In nulla ut irure incididunt nulla labore laboris cillum excepteur eiusmod proident esse in. Sunt adipisicing laboris proident sit. Elit nulla et eu cupidatat duis labore labore ipsum do ad sint. Est proident elit incididunt consectetur et id cupidatat sit.</p>
            <p>Ver logs adjuntos</p>
            `
            const attachments: IAttachments[] = [
                {fileName: 'logs-all.log', path: './logs/logs-all.log'},
                {fileName: 'logs-medium.log', path: './logs/logs-medium.log'},
                {fileName: 'logs-high.log', path: './logs/logs-high.log'}
            ]

            return this.sendEmail({to, subject, htmlBody, attachments})
    }
}