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
import sendBookingNotificationEmployee from 'src/templates/bookingNotificationEmployee';
import sendBookingNotificationCoworking from 'src/templates/bookingNotificationCoworking';
import sendBookingActiveNotificationEmployee from 'src/templates/notificationActiveBookingUser';
import sendBookingActiveNotificationCoworking from 'src/templates/notificationActiveBookingCowork';
import sendBookingRejectNotificationEmployee from 'src/templates/notificationRejectBookingUser';
import sendBookingRejectNotificationCoworking from 'src/templates/notificationRejectBookingCowork';
import sendActivationMailCoworkEmployee from 'src/templates/activationSuccedCoworkEmployee';
import SendNotificationPasesEmployee from 'src/templates/notificationPasesEmployee';
import sendCancelBooking from 'src/templates/cancelBooking';
import sendEmailActiveCompany from 'src/templates/notificationEmailActiveCompany';
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

  async NotificationMailRequest(email: string, companyName: string) {
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

  async NotificationMailActiveCompany(email: string, companyName: string) {
    if (!companyName) {
      throw new BadRequestException('Nombre de la empresaes null');
    }

    const emailConfig = {
      from: process.env.NODEMAILER_MAIL,
      to: email,
      subject: 'Activación de empresa',
      html: sendEmailActiveCompany(companyName),
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

  async forgotPassEmailRequest(email: string, name: string, link: string) {
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

  async NotificationBookingEmployee(
    companyName: string,
    employeeName: string,
    employeeEmail: string,
    dia: Date,
    hora: Date,
    address: string,
  ) {
    if (!companyName) {
      throw new BadRequestException('Nombre del coworking null');
    }

    const emailConfig = {
      from: process.env.NODEMAILER_MAIL,
      to: employeeEmail,
      subject: 'Solicitud para Espacio de Coworking',
      html: sendBookingNotificationEmployee(
        companyName,
        employeeName,
        dia,
        hora,
        address,
      ),
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

  async NotificationBookingCoworking(
    companyName: string,
    employeeName: string,
    employeeLastname: string,
    dia: Date,
    hora: Date,
    coworkignEmail: string,
  ) {
    if (!companyName) {
      throw new BadRequestException('Nombre del coworking null');
    }

    const emailConfig = {
      from: process.env.NODEMAILER_MAIL,
      to: coworkignEmail,
      subject: 'Solicitud para Espacio de Coworking',
      html: sendBookingNotificationCoworking(
        companyName,
        employeeName,
        employeeLastname,
        dia,
        hora,
      ),
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

  async sendBookingActiveNotificationEmployee(
    companyName: string,
    employeeName: string,
    dia: Date,
    hora: Date,
    address: string,
    phrase: string,
    employeeEmail: string,
    link: string,
  ) {
    if (!companyName) {
      throw new BadRequestException('Nombre del coworking null');
    }

    const emailConfig = {
      from: process.env.NODEMAILER_MAIL,
      to: employeeEmail,
      subject: 'Estado de reserva',
      html: sendBookingActiveNotificationEmployee(
        companyName,
        employeeName,
        dia,
        hora,
        address,
        phrase,
        link
      ),
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

  async sendBookingActiveNotificationCoworking(
    companyName: string,
    employeeName: string,
    dia: Date,
    hora: Date,
    address: string,
    coworkignEmail: string,
  ) {
    if (!companyName) {
      throw new BadRequestException('Nombre del coworking null');
    }

    const emailConfig = {
      from: process.env.NODEMAILER_MAIL,
      to: coworkignEmail,
      subject: 'Estado de reserva',
      html: sendBookingActiveNotificationCoworking(
        companyName,
        employeeName,
        dia,
        hora,
        address,
      ),
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

  async sendBookingRejectNotificationEmployee(
    companyName: string,
    employeeName: string,
    dia: Date,
    hora: Date,
    address: string,
    employeeEmail: string,
  ) {
    if (!companyName) {
      throw new BadRequestException('Nombre del coworking null');
    }

    const emailConfig = {
      from: process.env.NODEMAILER_MAIL,
      to: employeeEmail,
      subject: 'Estado de reserva',
      html: sendBookingRejectNotificationEmployee(
        companyName,
        employeeName,
        dia,
        hora,
        address,
      ),
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

  async sendBookingRejectNotificationCoworking(
    companyName: string,
    employeeName: string,
    dia: Date,
    hora: Date,
    address: string,
    coworkignEmail: string,
  ) {
    if (!companyName) {
      throw new BadRequestException('Nombre del coworking null');
    }

    const emailConfig = {
      from: process.env.NODEMAILER_MAIL,
      to: coworkignEmail,
      subject: 'Estado de reserva',
      html: sendBookingRejectNotificationCoworking(
        companyName,
        employeeName,
        dia,
        hora,
        address,
      ),
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

  async sendActivationMailCoworkEmployee(
    employeeCoworking: string,
    email: string,
    password: string,
  ) {
    const emailConfig = {
      from: process.env.NODEMAILER_MAIL,
      to: email,
      subject: 'Estado de reserva',
      html: sendActivationMailCoworkEmployee(
        employeeCoworking,
        email,
        password,
      ),
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

  async SendNotificationPasesEmployee(
    companyName: string,
    employeeName: string,
    numeroPasesDis: number,
    pasesMensuales: number,
    dia: Date,
    hora: Date,
    address: string,
    employeeEmail: string,
  ) {
    const emailConfig = {
      from: process.env.NODEMAILER_MAIL,
      to: employeeEmail,
      subject: 'Disponibilidad de Pases',
      html: SendNotificationPasesEmployee(
        companyName,
        employeeName,
        numeroPasesDis,
        pasesMensuales,
        dia,
        hora,
        address,
      ),
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
  async sendCancelBooking(
    companyName: string,
    employeeName: string,
    dirigidoA: string,
    dia: Date,
    hora: Date,
    address: string,
    email: string,
  ) {
    const emailConfig = {
      from: process.env.NODEMAILER_MAIL,
      to: email,
      subject: 'Disponibilidad de Pases',
      html: sendCancelBooking(
        companyName,
        employeeName,
        dirigidoA,
        dia,
        hora,
        address,
      ),
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
