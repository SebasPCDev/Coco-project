import { Controller, Post, Body, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginUserDto, recoveryPassDto } from './auth.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signin(@Body() credentials: LoginUserDto) {
    return this.authService.signin(credentials);
  }

  @Put('forgot-password')
  forgotPassword(@Body() data: {email: string}) {
    return this.authService.forgotPassword(data.email);
  }

  @Put('recovery-password')
  recoveryPass(@Body() data: recoveryPassDto) {
    return this.authService.recoveryPass(data);
  }
}
