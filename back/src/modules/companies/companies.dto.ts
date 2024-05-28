import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import {
  IsEmail,
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Companies } from 'src/entities/companies.entity';
import { CompanySize } from 'src/models/companySize.enum';
import { CompanyStatus } from 'src/models/companyStatus.enum';

export class CompaniesResponse {
  page: number;
  limit: number;
  total: number;
  companies: Companies[]
}

export class CreateCompaniesDto {
  @ApiProperty({
    example: 'Acme Inc.',
    description: 'Nombre de la empresa',
  })
  @IsString({ message: 'El nombre debe ser una cadena de caracteres' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  @Matches(/^[a-zA-Z\s]+$/, {
    message: 'El nombre no debe contener caracteres especiales',
  })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(50, { message: 'El nombre no puede tener más de 50 caracteres' })
  name: string;

  @ApiProperty({
    example: '+123456789',
    description: 'Número de teléfono de la empresa',
  })
  @IsString({ message: 'El teléfono debe ser una cadena de caracteres' })
  @IsNotEmpty({ message: 'El teléfono no puede estar vacío' })
  phone: string;

  @ApiProperty({
    example: 'info@company.com',
    description: 'Correo electrónico de la empresa',
  })
  @IsEmail({}, { message: 'El correo electrónico debe ser válido' })
  @IsNotEmpty({ message: 'El correo electrónico no puede estar vacío' })
  email: string;

  @IsNumber({}, { message: 'La cantidad de beneficiarios debe ser un número' })
  @Min(0, { message: 'La cantidad de beneficiarios no puede ser negativa' })
  @IsOptional({ message: 'La cantidad de beneficiarios no puede estar vacía' })
  quantityBeneficiaries: number;

  @ApiProperty({
    example: 'Tecnología',
    description: 'Sector empresarial',
  })
  @IsString({
    message: 'El sector empresarial debe ser una cadena de caracteres',
  })
  @IsOptional({ message: 'El sector empresarial no puede estar vacío' })
  businessSector: string;

  @IsEnum(CompanySize, {
    message: 'El tamaño debe ser 0-30, 31-100, 101-500, 500-en adelante',
  })
  @IsNotEmpty({ message: 'El tamaño es obligatorio' })
  size: CompanySize;

  @IsEmpty()
  totalPasses: number;

  @ApiProperty({
    example: 'pending',
    description: 'Estado de la compañía',
  })
  @IsEnum(CompanyStatus, {
    message: 'El estado puede ser pending, active, inactive',
  })
  status: CompanyStatus;
}

export class UpdateCompaniesDto extends PartialType(
  OmitType(CreateCompaniesDto, ['totalPasses']),
) {
  @IsNumber()
  @IsOptional()
  totalPasses: number;
}

export class ActivateCoworkingsDto {
  @ApiProperty({
    example: 'df316546-4992-46ee-8b2e-03c5e7be0792',
    description: 'ID de la solicitud',
  })
  @IsUUID('4', { message: 'El ID de la solicitud debe ser un UUID válido' })
  @IsNotEmpty({ message: 'El ID de la solicitud no puede estar vacío' })
  id: string;
}
