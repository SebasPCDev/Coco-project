import { ApiProperty } from '@nestjs/swagger';
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
import { CoworkingStatus } from 'src/models/coworkingStatus.enum';
import { TypeCompany } from 'src/models/typeCompany.enum';
import { StatusRequest } from 'src/models/statusRequest.enum';

export class RequestDtoCoworking {
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
  open: string;

  @ApiProperty({
    example: '17:00',
    description: 'Hora en la que cierra el cowork tipo date',
  })
  @IsOptional()
  @IsString({ message: 'El close debe ser un valor tipo string' })
  close: string;

  @ApiProperty({
    example: 10,
    description: 'Capacidad  de numero de personas',
  })
  @IsOptional()
  @IsInt({ message: 'El capacity debe ser un valor tipo int' })
  capacity: number;

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
    description: 'Debe estar vacio (se seta detro del endpoint), se envia null',
    nullable: true,
  })
  @IsEmpty({ message: 'Debe ser nullo' })
  type: TypeCompany;
}
