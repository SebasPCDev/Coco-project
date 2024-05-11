import { ApiHideProperty, ApiProperty, PartialType } from '@nestjs/swagger';
import {
  // IsArray,
  IsEmail,
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
} from 'class-validator';
import { Users } from 'src/entities/users.entity';
import { CoworkingStatus } from 'src/models/coworkingStatus.enum';

export class CreateCoworkingsDto {
  @ApiProperty({
    example: 'Coworking La Fábrica',
    description: 'Nombre del Coworking',
  })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  name: string;

  @ApiProperty({
    example: '541145454545',
    description: 'Número de teléfono del coworking',
  })
  @IsString({ message: 'El número de teléfono debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El número de teléfono es obligatorio' })
  phone: string;

  @ApiProperty({
    example: 'admin@lafrabrica.com',
    description: 'Correo electrónico del coworking',
  })
  @IsEmail({}, { message: 'Formato de correo electrónico inválido' })
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
  email: string;

  @ApiProperty({
    example: '8:00',
    description: 'Horario de apertura del coworking',
  })
  @IsString({ message: 'El horario de apertura debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El horario de apertura es obligatorio' })
  open: string;

  @ApiProperty({
    example: '18:00',
    description: 'Horario de cierre del coworking',
  })
  @IsString({ message: 'El horario de cierre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El horario de cierre es obligatorio' })
  close: string;

  @ApiProperty({
    example: 'Avenida 13, número 316',
    description: 'Domicilio del coworking',
  })
  @IsString({ message: 'El domicilio debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El domcilio es obligatorio' })
  address: string;

  @ApiProperty({
    example: 'Argentina',
    description: 'País donde se encuentra el coworking',
  })
  @IsString({ message: 'El domicilio debe ser una cadena de texto' })
  @IsOptional()
  country?: string;

  @ApiProperty({
    example: 'Buenos Aires',
    description: 'Estado/Provincia donde se encuentra el coworking',
  })
  @IsString({ message: 'El estado debe ser una cadena de texto' })
  @IsOptional()
  state?: string;

  @ApiProperty({
    example: 'La Plata',
    description: 'Ciudad donde se encuentra el coworking',
  })
  @IsString({ message: 'La ciudad debe ser una cadena de texto' })
  @IsOptional()
  city?: string;

  @ApiProperty({
    example: '-34.9214500',
    description: 'Coordenadas geográficas, latitud',
  })
  @IsString({ message: 'La latitud debe ser una cadena de texto' })
  @IsOptional()
  lat?: string;

  @ApiProperty({
    example: '-57.9545300',
    description: 'Coordenadas geográficas, longitud',
  })
  @IsString({ message: 'La logintud debe ser una cadena de texto' })
  @IsOptional()
  long?: string;

  @ApiProperty({
    example: '35',
    description: 'Cantidad de espacios disponibles del coworking',
  })
  @IsNotEmpty({ message: 'La capacidad es obligatoria' })
  @IsNumber()
  capacity: number;

  @ApiProperty({
    example: 'Espacios de trabajo flexibles en La Plata',
    description: 'Slogan del coworking',
  })
  @IsString()
  @IsOptional()
  message?: string;

  @ApiProperty({
    example: 'active',
    description: 'Estado del coworking',
  })
  @IsEnum(CoworkingStatus, { message: 'active, inactive, pending' })
  status: CoworkingStatus;

  @ApiProperty({
    example:
      'https://res.cloudinary.com/drwhxgsfu/image/upload/v1715195174/coworkings_coco%2B/gettyimages-1157235072-640x640_uspmdc.jpg',
    description: 'Imagen de portada',
  })
  @IsUrl({}, { message: 'Debe ser una Url válida' })
  // URL
  @IsOptional()
  thumbnail?: string;

  // @IsArray()
  @ApiHideProperty()
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
