import { MailerService } from '@nestjs-modules/mailer';
import { HttpStatus, Injectable } from '@nestjs/common';
import { CustomizeException } from 'src/common/shared/exception/customize.exception';

@Injectable()
export class EmailService {
    constructor(private mailerService: MailerService) { }
    async sendEmail(options: {
        email: string; subject: string; html: string;
    }) {
        try {
            const message = {
                to: options.email,
                subject: options.subject,
                html: options.html
            };
            const emailSend = await this.mailerService.sendMail({
                ...message,
            });
            return emailSend;
        } catch (error) {
            console.log(error);
            throw new CustomizeException('Error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
