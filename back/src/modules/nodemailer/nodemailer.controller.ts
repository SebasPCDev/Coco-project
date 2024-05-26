import { Controller, Get } from '@nestjs/common';
import { NodemailerService } from './nodemailer.service';

@Controller('nodemailer')
export class NodemailerController {

    constructor(private readonly nodemailderService: NodemailerService) {}

    @Get("")
    async confirmByEmail (){
        const dia = new Date()
       return  this.nodemailderService.sendActivationMailCoworkEmployee("nico","530nicolas@gmail.com","mi contraseña")
    }
}
