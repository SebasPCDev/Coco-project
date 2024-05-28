import { Controller, Get } from '@nestjs/common';
import { NodemailerService } from './nodemailer.service';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller('nodemailer')
export class NodemailerController {
  constructor(private readonly nodemailderService: NodemailerService) {}

  @Get('')
  async confirmByEmail() {
    return this.nodemailderService.sendActivationMailCoworkEmployee(
      'nico',
      '530nicolas@gmail.com',
      'mi contraseña',
    );
  }
}
