import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { transporter } from '../../config/nodemailer';
import { config as dotenvConfig } from 'dotenv';
import sendActivationMail from 'src/templates/activationSuccedMailTemplate';
import sendNotificationEmail from 'src/templates/notificationEmailTemplate';
import forgotPassEmail from 'src/templates/forgotPassEmailTemplate';
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
    if (!email) {
      throw new BadRequestException('email es null');
    }

    if (!companyName) {
      throw new BadRequestException('nombre de la empresa es null');
    }
    if (!password) {
      throw new BadRequestException('contraseña es null');
    }
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
        `Error al enviar el correo electrónico:${error}`,
      );
    }
  }

  async NotificationMailRequest(
    email: string,
    companyName: string,
  ) {
  

    if (!companyName) {
      throw new BadRequestException('Nombre de la empresaes null');
    }
  
    const emailConfig = {
      from: process.env.NODEMAILER_MAIL,
      to: email,
      subject: 'Confirmación de Solicitud',
      html: sendNotificationEmail(companyName),
    };

    try {
      const info = await transporter.sendMail(emailConfig);
      console.log('Correo electrónico enviado:', info.response);
      return 'Correo electrónico enviado';
    } catch (error) {
      console.error('Error al enviar el correo electrónico:', error);
      throw new InternalServerErrorException(
        `Error al enviar el correo electrónico:${error}`,
      );
    }
  }

    async forgotPassEmailRequest(
    email: string,
    name: string,
    link: string,
  ) {
  

    if (!name) {
      throw new BadRequestException('Nombre es obligatorio');
    }
  
    const emailConfig = {
      from: process.env.NODEMAILER_MAIL,
      to: email,
      subject: 'Solicitud cambio de contraseña',
      html: forgotPassEmail(name, link),
    };

    try {
      const info = await transporter.sendMail(emailConfig);
      console.log('Correo electrónico enviado:', info.response);
      return 'Correo electrónico enviado';
    } catch (error) {
      console.error('Error al enviar el correo electrónico:', error);
      throw new InternalServerErrorException(
        `Error al enviar el correo electrónico:${error}`,
      );
    }
  }

  
}
