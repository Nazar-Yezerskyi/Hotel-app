import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: '',
                pass: 'iidk gspq bwmv lcxq'
            }
        });
    }

    async sendEmail(to: string, subject: string, text: string) {
        await this.transporter.sendMail({
            from: '',
            to,
            subject,
            text
        });
    }
}
