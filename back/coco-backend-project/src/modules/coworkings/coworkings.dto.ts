import { PartialType } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
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
  open: Date;

  @IsString()
  @IsNotEmpty()
  close: Date;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsOptional()
  country: string;

  @IsString()
  @IsOptional()
  state: string;

  @IsString()
  @IsOptional()
  city: string;

  @IsString()
  @IsOptional()
  lat: string;

  @IsString()
  @IsOptional()
  long: string;

  @IsNotEmpty()
  @IsNumber()
  capacity: number;

  @IsEnum(CoworkingStatus)
  status: CoworkingStatus;

  @IsString()
  // URL
  @IsOptional()
  thumbnail: string;
}

export class UpdateCoworkingsDto extends PartialType(CreateCoworkingsDto) {}
