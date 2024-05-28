import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ForgotPasswordDto {
  @ApiProperty({
    example: 'example@email.com',
    description: 'Debe ser un email válido',
  })
  @IsEmail()
  @IsNotEmpty({ message: 'El email es obligatorio' })
  email: string;
}

export class RecoveryPassDto {
  @IsString({
    message:
      'La contraseña debe tener entre 8 y 15 caracteres, tener al menos una míscula, una mayúscula y un caracter especial (!@#$%^&*)',
  })
  @MinLength(8)
  @MaxLength(15)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  token: string;
}

export class LoginUserDto {
  @ApiProperty({
    example: 'example@email.com',
    description: 'Debe ser un email válido',
  })
  @IsEmail()
  @IsNotEmpty({ message: 'El email es obligatorio' })
  email: string;

  @ApiProperty({
    example: 'Aa$12345678',
    description: 'No utlices información personal ni compartas tu contraseña',
  })
  @IsNotEmpty({ message: 'El password es obligatorio' })
  password: string;
}
