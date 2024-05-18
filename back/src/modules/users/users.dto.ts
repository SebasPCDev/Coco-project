import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Validate,
} from 'class-validator';
import { UUID } from 'crypto';
import { MatchPass } from 'src/decorators/MatchPass.decorator';
import { Role } from 'src/models/roles.enum';
import { UserStatus } from 'src/models/userStatus.enum';

export class CreateUsersDto {
  @ApiProperty({
    example: 'Juan',
    description: 'Nombre del usuario',
  })
  @IsString({ message: 'name debe ser un string' })
  @IsNotEmpty({ message: 'name no debe estar vacío' })
  name: string;

  @ApiProperty({
    example: 'Perez',
    description: 'Apellido del usuario',
  })
  @IsString({ message: 'lastname debe ser un string' })
  @IsNotEmpty({ message: 'lastname no debe estar vacío' })
  lastname: string;

  @ApiProperty({
    example: '123456789',
    description: 'Número de teléfono del usuario',
  })
  @IsString({ message: 'phone debe ser un string' })
  @IsNotEmpty({ message: 'phone no debe estar vacío' })
  phone: string;

  @ApiProperty({
    example: 'juan@example.com',
    description: 'Correo electrónico del usuario',
  })
  @IsEmail({}, { message: 'email debe ser un correo electrónico válido' })
  @IsNotEmpty({ message: 'email no debe estar vacío' })
  email: string;

  @ApiProperty({
    example: '1234567890',
    description: 'Identificación del usuario',
  })
  @IsString({ message: 'identification debe ser un string' })
  @IsNotEmpty({ message: 'identification no debe estar vacío' })
  identification: string;

  @ApiProperty({
    example: 'Gerente',
    description: 'Posición del usuario',
  })
  @IsString({ message: 'position debe ser un string' })
  @IsNotEmpty({ message: 'position no debe estar vacío' })
  position: string;

  @ApiProperty({
    example: '',
    description: 'Contraseña del usuario (se establece dentro del endpoint, se envía null)',
    nullable: true,
  })
  @IsEmpty()
  password: string;

  @ApiProperty({
    example: 'TokenDeRecuperación123',
    description: 'Token de recuperación del usuario (opcional)',
    nullable: true,
  })
  @IsString({ message: 'recoveryToken debe ser un string' })
  @IsOptional()
  recoveryToken?: string;

  @ApiProperty({
    example: '2024-05-15',
    description: 'Fecha de activación del usuario (opcional)',
    nullable: true,
  })
  @IsDate({ message: 'activationDate debe ser una fecha válida' })
  @IsOptional()
  activationDate?: Date;

  @ApiProperty({
    example: 'Admin',
    description: 'Rol del usuario',
    enum: Role,
  })
  @IsEnum(Role, { message: 'role debe ser un valor válido de Role' })
  role: Role;

  @ApiProperty({
    example: 'Active',
    description: 'Estado del usuario',
    enum: UserStatus,
  })
  @IsEnum(UserStatus, { message: 'status debe ser un valor válido de UserStatus' })
  status: UserStatus;
}

export class UpdateUsersDto extends PartialType(OmitType(CreateUsersDto, ['status', 'password'])) {

  @IsString()
  @IsOptional()
  readonly password?: string;

  @IsString()
  @IsOptional()
  @Validate(MatchPass, ['password'])
  readonly confPassword?: string;

}

export class CreateEmployeeDto extends CreateUsersDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID de la compañía',
  })
  @IsUUID('4', { message: 'companyId debe ser un UUID válido' })
  @IsNotEmpty({ message: 'companyId no debe estar vacío' })
  companyId: UUID;

  @ApiProperty({
    example: 5,
    description: 'Número de pases',
  })
  @IsNumber({}, { message: 'passes debe ser un número' })
  @IsNotEmpty({ message: 'passes no debe estar vacío' })
  passes: number;

  @ApiProperty({
    example: 2,
    description: 'Número de pases disponibles',
  })
  @IsNumber({}, { message: 'passesAvailable debe ser un número' })
  @IsNotEmpty({ message: 'passesAvailable no debe estar vacío' })
  passesAvailable: number;
}

export class CreateUserCoworkingsDto extends CreateUsersDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID del coworking',
  })
  @IsUUID('4', { message: 'coworkingId debe ser un UUID válido' })
  @IsNotEmpty({ message: 'coworkingId no debe estar vacío' })
  coworkingId: UUID;
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
