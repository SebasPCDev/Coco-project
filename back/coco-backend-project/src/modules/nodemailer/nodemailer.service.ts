import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

import { config as dotenvConfig } from 'dotenv';

dotenvConfig({
    path: '.env.development',
  });
  
@Injectable()
export class NodemailerService {

    async confirmacionMailRequest (email:string, companyName:string, password:string){
        console.log(email)
     if(!email)
        {
            throw new BadRequestException ("email is null")
        }

    if(!companyName)
        {
            throw new BadRequestException ("companyName is null")
        }
    if(!companyName)
        {
            throw new BadRequestException ("password is null")
        }
    
     const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port:465,
        secure: true, 
        auth: {
            user: process.env.NODEMAILER_MAIL,
            pass: process.env.NODEMAILER_PASSWORD, 
        },
    });

    const emailConfig = {
        from: 'cocoplus497@gmail.com',
        to: email, 
        subject: 'Estado aprobado',
        html: `<p style="font-size: 28px; line-height:40px; text-decoration: none; color: #fe7c24;font-family: Georgia, sans-serif;text-align:center; text-transform:uppercase;font-weight:bold;Margin-top:10px;" >${companyName},</p>
               <p style="font-size: 18px; line-height:24px; text-decoration: none; color: #333;font-family: Arial, sans-serif;text-align:center;" >Nos complace informarte que tu solicitud ha sido aprobada. ¡Felicidades! </p>
               <p style="font-size: 18px; line-height:24px; text-decoration: none; color: #333;font-family: Arial, sans-serif;text-align:center;margin-bottom: 20px;">Atentamente,<br>
                Coco +</p>

                <p style="font-size: 16px; line-height: 1.5; margin-bottom: 20px; color: red;">
                <strong> Contraseña : ${password} </strong>
                </p>

                <p style="font-size: 16px; line-height: 1.5; margin-bottom: 20px; color: black;">
                    <strong>Coco +<br> ARG, CIUDAD </strong>
                </p>

                <p style="color: #FF9900;">
                    Email: <a href="cocoplus497@gmail.com">cocoplus497@gmail.com</a>
                </p>
                <p style="color: #FF9900;">
                    Website: <a href="http://www.COCO+.org">www.COCO+.com</a>
                </p>
                

                <img src="./LogoMail/Coco+ Verde Sin Fondo.png" width="115" alt="" style="width:100%; height:auto;">
                `
            ,
      };
    
      try {
        const info = await transporter.sendMail(emailConfig);
        console.log('Correo electrónico enviado:', info.response);
        return 'Correo electrónico enviado';
        } catch (error) {
            console.error('Error al enviar el correo electrónico:', error);
            throw new InternalServerErrorException('Error al enviar el correo electrónico:', error);
        }
    
    }
}
