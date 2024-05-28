import { ApiHideProperty, ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { UUID } from 'crypto';
import { Coworkings } from 'src/entities/coworkings.entity';
import { Users } from 'src/entities/users.entity';
import { CoworkingStatus } from 'src/models/coworkingStatus.enum';

export function IsTimeRange(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'isTimeRange',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        validate(value: any, args: ValidationArguments) {
          const timeRegex = /^(0?[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
          if (!value.match(timeRegex)) {
            return false;
          }
          const [hours, minutes] = value.split(':').map(Number);
          if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
            return false;
          }
          return true;
        },
        defaultMessage(args: ValidationArguments) {
          return `El campo ${args.property} debe ser una hora válida en formato HH:mm y estar en el rango de 00:00 a 23:59`;
        },
      },
    });
  };
}

export class CreateCoworkingsDto {
  @ApiProperty({
    example: 'Coworking La Fábrica',
    description: 'Nombre del Coworking',
  })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @Matches(/^[a-zA-Z\s]+$/, {
    message: 'El nombre no debe contener caracteres especiales',
  })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(50, { message: 'El nombre no puede tener más de 50 caracteres' })
  name: string;

  @ApiProperty({
    example: '541145454545',
    description: 'Número de teléfono del coworking',
  })
  @IsString({ message: 'El teléfono debe ser una cadena de caracteres' })
  @IsNotEmpty({ message: 'El teléfono no puede estar vacío' })
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
  @IsTimeRange({
    message: 'El horario de apertura debe estar en el rango de 00:00 a 23:59',
  })
  open: string;

  @ApiProperty({
    example: '18:00',
    description: 'Horario de cierre del coworking',
  })
  @IsString({ message: 'El horario de cierre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El horario de cierre es obligatorio' })
  @IsTimeRange({
    message: 'El horario de apertura debe estar en el rango de 00:00 a 23:59',
  })
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

export class CoworkingResponseDto {
  page: number;
  limit: number;
  total: number;
  coworking: Coworkings[];
}

export class UpdateCoworkingsDto extends PartialType(CreateCoworkingsDto) {
  @IsArray()
  @IsOptional()
  amenitiesIds?: UUID[];
}

export class ActivateCoworkingsDto {
  @ApiProperty({
    example: 'df316546-4992-46ee-8b2e-03c5e7be0792',
    description: 'Id de la solicitud (requests)',
  })
  @IsUUID()
  id: string;
}
