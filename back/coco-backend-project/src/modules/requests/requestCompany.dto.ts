import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt, IsEmail, IsDate, IsNotEmpty, isEmpty } from 'class-validator';

export class RequestDtoCompany {
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
  @IsString({ message: 'El número de identificación debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El número de identificación es obligatorio' })
  identification: string;

  @ApiProperty({
    example: 'Admin',
    description: 'El rol del solicitante, cargo dentro de la empresa',
  })
  @IsString({ message: 'El rol debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El rol es obligatorio' })
  role: string;

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
  @IsEmail({}, { message: 'Formato de correo electrónico de la empresa inválido' })
  @IsNotEmpty({ message: 'El correo electrónico de la empresa es obligatorio' })
  companyEmail: string;

  @ApiProperty({
    example: '1234567890',
    description: 'El número de teléfono de la empresa del solicitante',
  })
  @IsString({ message: 'El número de teléfono de la empresa debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El número de teléfono de la empresa es obligatorio' })
  companyPhone: string;

  @ApiProperty({
    example: 5,
    description: 'Numero de beneficiarios',
  })
  @IsOptional()
  @IsInt({message:"quantityBeneficiaries debe ser un numero"})
  quantityBeneficiaries: number;

  @ApiProperty({
    example: 'Technology',
    description: 'Sector de la compañia',
  })
  @IsOptional()
  @IsString({message:"businessSector debe ser un string"})
  businessSector: string;

  @ApiProperty({
    example: 500,
    description: 'Cantidad de empleados, tamaño de la empresa',
  })
  @IsOptional()
  @IsInt({message:"size debe ser un numero"})
  size: number;
//! COwork
  // @ApiProperty({
  //   example: '123 Main St',
  //   description: 'The address of the company',
  // })
  // @IsOptional()
  // @IsString()
  // address: string;

  // @ApiProperty({
  //   example: 'www.example.com',
  //   description: 'The website of the company',
  // })
  // @IsOptional()
  // @IsString()
  // website: string;

  // @ApiProperty({
  //   example: '09:00',
  //   description: 'The open time',
  // })
  // @IsOptional()
  // @IsDate()
  // open: Date;

  // @ApiProperty({
  //   example: '17:00',
  //   description: 'The close time',
  // })
  // @IsOptional()
  // @IsDate()
  // close: Date;

  // @ApiProperty({
  //   example: 10,
  //   description: 'The capacity of the event',
  // })
  // @IsOptional()
  // @IsInt()
  // capacity: number;

  @ApiProperty({
    example: 'Esto es un mensaje de prueba',
    description: 'Mensaje de la request',
  })
  @IsOptional()
  @IsString({message:"message debe ser un string"})
  message: string;

  @ApiProperty({
    example: 'pending',
    description: 'El status de la request pending / close	',
  })
  @IsString({message:"status debe ser un string "})
  status: string;

  @ApiProperty({
    example: 'Esto es una observacion',
    description: 'Observacion de la request',
  })
  @IsString({message:"observation debe ser un string"})
  observation: string;

  @ApiProperty({
    example: 'Coworking',
    description: 'Tipo  de usuario que ingresa company / coworking (se seta detro del endpoint)',
    nullable: true,
  })
  
  @IsString()
  type: null|string;


}