import { Controller, Get } from '@nestjs/common';
import { NodemailerService } from './nodemailer.service';

@Controller('nodemailer')
export class NodemailerController {

    constructor(private readonly nodemailderService: NodemailerService) {}

    @Get("")
    async confirmByEmail (){
        const dia = new Date()
       return  this.nodemailderService.sendBookingActiveNotificationEmployee("cowork","nico",dia,dia,"calle falsa 123","es un secreto","530nicolas@gmail.com")
    }
}
