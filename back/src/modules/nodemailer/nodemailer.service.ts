import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import * as nodemailer from 'nodemailer';

import { config as dotenvConfig } from 'dotenv';
import sendActivationMail from 'src/templates/activationSuccedMailTemplate';

dotenvConfig({
  path: '.env.development',
});

@Injectable()
export class NodemailerService {
  async confirmacionMailRequest(
    email: string,
    companyName: string,
    password: string,
  ) {
    console.log(email);
    if (!email) {
      throw new BadRequestException('email is null');
    }

    if (!companyName) {
      throw new BadRequestException('companyName is null');
    }
    if (!companyName) {
      throw new BadRequestException('password is null');
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.NODEMAILER_MAIL,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    const emailConfig = {
      from: process.env.NODEMAILER_MAIL,
      to: email,
      subject: 'Estado aprobado',
      html: sendActivationMail(email, companyName, password),
    };

    try {
      const info = await transporter.sendMail(emailConfig);
      console.log('Correo electrónico enviado:', info.response);
      return 'Correo electrónico enviado';
    } catch (error) {
      console.error('Error al enviar el correo electrónico:', error);
      throw new InternalServerErrorException(
        'Error al enviar el correo electrónico:',
        error,
      );
    }
  }
}
