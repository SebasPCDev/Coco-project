import { Controller, Get } from '@nestjs/common';
import { NodemailerService } from './nodemailer.service';

@Controller('nodemailer')
export class NodemailerController {

    constructor(private readonly nodemailderService: NodemailerService) {}

    @Get("/confirm")
    async confirmByEmail (){
       return  this.nodemailderService.confirmacionMailRequest("530nicolas@gmail.com","Coworking1","contraseña")
    }
}
