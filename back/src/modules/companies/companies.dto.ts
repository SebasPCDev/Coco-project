import { ApiProperty } from '@nestjs/swagger';
import {
  // IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';
// import { Employees } from 'src/entities/employees.entity';

export class CreateCompaniesDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNumber()
  @IsNotEmpty()
  quantityBeneficiaries: number;

  @IsString()
  @IsNotEmpty()
  businessSector: string;

  @IsNumber()
  @IsNotEmpty()
  size: number;

  // @IsArray()
  // employees: Employees[];
}

export class ActivateCoworkingsDto {
  @ApiProperty({
    example: 'df316546-4992-46ee-8b2e-03c5e7be0792',
    description: 'Id de la solicitud (requests)',
  })
  @IsUUID()
  id: string;
}
