import { PartialType } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
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

  @IsArray()
  user: Users[];
}

export class UpdateCoworkingsDto extends PartialType(CreateCoworkingsDto) {}
