import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Role } from 'src/models/roles.enum';
import { UserStatus } from 'src/models/userStatus.enum';

export class CreateUsersDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  identification: string;

  @IsString()
  @IsNotEmpty()
  position: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  recoveryToken?: string;

  @IsDate()
  @IsOptional()
  activationDate?: Date;

  @IsEnum(Role)
  role: Role;

  @IsEnum(UserStatus)
  status: UserStatus;
}

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
