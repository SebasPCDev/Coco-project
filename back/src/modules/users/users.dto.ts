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

  @IsEmpty()
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
  @IsUUID()
  @IsNotEmpty()
  companyId: UUID;

  @IsNumber()
  @IsNotEmpty()
  passes: number;

  @IsNumber()
  @IsNotEmpty()
  passesAvailable: number;
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
