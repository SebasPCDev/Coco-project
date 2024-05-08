import { ApiProperty } from '@nestjs/swagger';

import {
  IsString,
  IsOptional,
  IsInt,
  IsEmail,
  IsNotEmpty,
  IsEmpty,
  IsEnum,
} from 'class-validator';
import { CoworkingStatus } from 'src/models/coworkingStatus.enum';
import { TypeCompany } from 'src/models/typeCompany.enum';
import { StatusRequest } from 'src/models/statusRequest.enum';

export class RequestDtoCompany {
  @ApiProperty({
    example: 'John',
    description: 'Nombre del solicitante ',
  })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  name: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Apellido del solicitante',
  })
  @IsString({ message: 'El apellido debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El apellido es obligatorio' })
  lastname: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'El correo electrónico del solicitante',
  })
  @IsEmail({}, { message: 'Formato de correo electrónico inválido' })
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
  email: string;

  @ApiProperty({
    example: '1234567890',
    description: 'El número de teléfono del solicitante',
  })
  @IsString({ message: 'El número de teléfono debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El número de teléfono es obligatorio' })
  phone: string;

  @ApiProperty({
    example: '1234567890',
    description: 'El número de identificación del solicitante',
  })
  @IsString({
    message: 'El número de identificación debe ser una cadena de texto',
  })
  @IsNotEmpty({ message: 'El número de identificación es obligatorio' })
  identification: string;

  @ApiProperty({
    example: 'General manager',
    description: 'El rol del solicitante, cargo dentro de la empresa',
  })
  @IsString({ message: 'El position debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El position es obligatorio' })
  position: string;

  @ApiProperty({
    example: 'Ejemplo Compañía',
    description: 'Nombre de la empresa del solicitante',
  })
  @IsString({ message: 'El nombre de la empresa debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre de la empresa es obligatorio' })
  companyName: string;

  @ApiProperty({
    example: 'ejemplo@empresa.com',
    description: 'El correo electrónico de la empresa del solicitante',
  })
  @IsEmail(
    {},
    { message: 'Formato de correo electrónico de la empresa inválido' },
  )
  @IsNotEmpty({ message: 'El correo electrónico de la empresa es obligatorio' })
  companyEmail: string;

  @ApiProperty({
    example: '1234567890',
    description: 'El número de teléfono de la empresa del solicitante',
  })
  @IsString({
    message: 'El número de teléfono de la empresa debe ser una cadena de texto',
  })
  @IsNotEmpty({ message: 'El número de teléfono de la empresa es obligatorio' })
  companyPhone: string;

  @ApiProperty({
    example: 5,
    description: 'Numero de beneficiarios',
  })
  @IsOptional()
  @IsInt({ message: 'quantityBeneficiaries debe ser un numero' })
  quantityBeneficiaries: number;

  @ApiProperty({
    example: 'Technology',
    description: 'Sector de la compañia',
  })
  @IsOptional()
  @IsString({ message: 'businessSector debe ser un string' })
  businessSector: string;

  @ApiProperty({
    example: 500,
    description: 'Cantidad de empleados, tamaño de la empresa',
  })
  @IsOptional()
  @IsInt({ message: 'size debe ser un numero' })
  size: number;

  @ApiProperty({
    example: 'Esto es un mensaje de prueba',
    description: 'Mensaje de la request',
  })
  @IsOptional()
  @IsString({ message: 'message debe ser un string' })
  message: string;

  @ApiProperty({
    example: 'pending',
    description: 'El status de la request pending / close	',
  })
 
  @IsEnum(StatusRequest)
  status: StatusRequest;

  @ApiProperty({
    example: 'Esto es una observacion',
    description: 'Observacion de la request',
  })
  @IsString({ message: 'observation debe ser un string' })
  observation: string;

  @ApiProperty({
    example: '',
    description: 'Debe estar vacio (se setea detro del endpoint)',
    nullable: true,
  })
  @IsEmpty({ message: 'Debe ser nullo' })
  type: TypeCompany;
}
