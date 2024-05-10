import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  // IsArray,
  IsEmail,
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Users } from 'src/entities/users.entity';
import { CoworkingStatus } from 'src/models/coworkingStatus.enum';

export class CreateCoworkingsDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  open: string;

  @IsString()
  @IsNotEmpty()
  close: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsOptional()
  country?: string;

  @IsString()
  @IsOptional()
  state?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  lat?: string;

  @IsString()
  @IsOptional()
  long?: string;

  @IsNotEmpty()
  @IsNumber()
  capacity: number;

  @IsString()
  // URL
  @IsOptional()
  message?: string;

  @IsEnum(CoworkingStatus)
  status: CoworkingStatus;

  @IsString()
  // URL
  @IsOptional()
  thumbnail?: string;

  // @IsArray()
  @IsEmpty()
  user: Users[];
}

export class UpdateCoworkingsDto extends PartialType(CreateCoworkingsDto) {}

export class ActivateCoworkingsDto {
  @ApiProperty({
    example: 'df316546-4992-46ee-8b2e-03c5e7be0792',
    description: 'Id de la solicitud (requests)',
  })
  @IsUUID()
  id: string;
}
