import { ApiHideProperty, ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsInt,
  IsEmail,
  IsNotEmpty,
  IsUrl,
  IsEmpty,
  IsEnum,
} from 'class-validator';

import { CompanyType } from 'src/models/companyType.enum';
import { StatusRequest } from 'src/models/statusRequest.enum';
import { IsTimeRange } from 'src/decorators/IsTimeRange.decorator';
import { CompanySize } from 'src/models/companySize.enum';

export class CreateRequestDto {
  @ApiProperty({
    example: 'John',
    description: 'Nombre del solicitante',
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
    example: '1234567890',
    description: 'El número de teléfono del solicitante',
  })
  @IsString({ message: 'El número de teléfono debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El número de teléfono es obligatorio' })
  phone: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'El correo electrónico del solicitante',
  })
  @IsEmail({}, { message: 'Formato de correo electrónico inválido' })
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
  email: string;

  @ApiProperty({
    example: 'General manager',
    description: 'El position del solicitante, cargo dentro de la empresa',
  })
  @IsString({ message: 'El position debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El position es obligatorio' })
  position: string;

  @ApiProperty({
    example: 'Ejemplo cowork',
    description: 'Nombre de la empresa del solicitante',
  })
  @IsString({ message: 'El nombre de la empresa debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre de la empresa es obligatorio' })
  companyName: string;

  @ApiProperty({
    example: 'Esto es un mensaje de prueba',
    description: 'Mensaje de la request',
  })
  @IsOptional()
  @IsString({ message: 'message debe ser un string' })
  message: string;

  @IsEmpty()
  @ApiHideProperty()
  status: StatusRequest;

  @ApiHideProperty()
  @IsEmpty()
  observation: string;

  @ApiHideProperty()
  @IsEmpty()
  type: CompanyType;
}

export class CreateRequestCoworkingDto extends CreateRequestDto {
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
    example: 'ejemplo@cowork.com',
    description: 'El correo electrónico del cowork del solicitante',
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
    example: '123 Main St',
    description: 'La dirección del Cowork',
  })
  @IsOptional()
  @IsString()
  address: string;

  @ApiProperty({
    example: 'www.example.com',
    description: 'El website de cowork',
  })
  @IsOptional()
  @IsString({
    message: 'El website de la empresa debe ser una cadena de texto',
  })
  @IsUrl({}, { message: 'El website debe ser una URL válida' })
  website: string;

  @ApiProperty({
    example: '09:00',
    description: 'Hora en la que abre el cowork tipo date',
  })
  @IsOptional()
  @IsString({ message: 'El open debe ser un valor tipo string' })
  @IsTimeRange({
    message: 'El horario de apertura debe estar en el rango de 00:00 a 23:59',
  })
  open: string;

  @ApiProperty({
    example: '17:00',
    description: 'Hora en la que cierra el cowork tipo date',
  })
  @IsOptional()
  @IsString({ message: 'El close debe ser un valor tipo string' })
  @IsTimeRange({
    message: 'El horario de apertura debe estar en el rango de 00:00 a 23:59',
  })
  close: string;

  @ApiProperty({
    example: 10,
    description: 'Capacidad  de numero de personas',
  })
  @IsOptional()
  @IsInt({ message: 'El capacity debe ser un valor tipo int' })
  capacity: number;
}

export class CreateRequestCompanyDto extends CreateRequestDto {
  @ApiProperty({
    example: 500,
    description: 'Cantidad de empleados, tamaño de la empresa',
  })
  @IsEnum(CompanySize, {
    message:
      'El tamaño debe ser 1 - 10, 10 - 50, 50 - 250, 250 - 500, o más de 500',
  })
  @IsNotEmpty({ message: 'El tamaño es obligatorio' })
  size: CompanySize;
}

export class UpdateRequestCoworkingDto extends PartialType(
  CreateRequestCoworkingDto,
) { }

export class UpdateRequestDto extends PartialType(CreateRequestDto) { }
