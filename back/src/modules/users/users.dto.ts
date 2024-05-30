import {
  ApiHideProperty,
  ApiProperty,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import {
  IsEmail,
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { MatchPass } from 'src/decorators/MatchPass.decorator';
import { Users } from 'src/entities/users.entity';
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

  @ApiHideProperty()
  @IsEmpty()
  password: string;

  @IsEmpty()
  @ApiHideProperty()
  recoveryToken?: string;

  @IsEmpty()
  @ApiHideProperty()
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
  @IsEnum(UserStatus, {
    message: 'status debe ser un valor válido de UserStatus',
  })
  status: UserStatus;
}

export class UsersResponseDto {
  page: number;
  limit: number;
  total: number;
  users: Users[];
}

export class UpdateUsersDto extends PartialType(
  OmitType(CreateUsersDto, ['status', 'password']),
) {
  @IsString({
    message:
      'La contraseña debe tener entre 8 y 15 caracteres, tener al menos una míscula, una mayúscula y un caracter especial (!@#$%^&*)',
  })
  @MinLength(8)
  @MaxLength(15)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)
  @IsOptional()
  readonly password?: string;

  @IsString()
  @IsOptional()
  @Validate(MatchPass, ['password'])
  readonly confPassword?: string;
}

export class UpdateDto {
  @ApiProperty({
    example: 'Juan',
    description: 'Nombre del usuario',
  })
  @IsString({ message: 'name debe ser un string' })
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: 'Perez',
    description: 'Apellido del usuario',
  })
  @IsString({ message: 'lastname debe ser un string' })
  @IsOptional()
  lastname?: string;

  @ApiProperty({
    example: '123456789',
    description: 'Número de teléfono del usuario',
  })
  @IsString({ message: 'phone debe ser un string' })
  @IsOptional()
  phone?: string;

  @ApiProperty({
    example: 'juan@example.com',
    description: 'Correo electrónico del usuario',
  })
  @IsEmail({}, { message: 'email debe ser un correo electrónico válido' })
  @IsOptional()
  email?: string;
}
