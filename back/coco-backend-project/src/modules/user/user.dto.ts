import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {}

export class LoginUserDto {
  @ApiProperty({
    example: 'example@email.com',
    description: 'Debe ser un email válido',
  })
  @IsEmail()
  @IsNotEmpty({ message: 'El email es obligatorio' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'Aa$12345678',
    description: 'No utlices información personal ni compartas tu contraseña',
  })
  @IsNotEmpty({ message: 'El password es obligatorio' })
  password: string;
}
