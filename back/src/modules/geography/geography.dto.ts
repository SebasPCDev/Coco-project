import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateGeographyDto {
  @ApiProperty({
    example: 'Argentina / Buenos Aires / La Plata',
    description: 'Nombre del país, estado o ciudad',
  })
  @IsString({ message: 'El nombre debe ser una cadena de caracteres' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @MaxLength(150, { message: 'El nombre no puede tener más de 150 caracteres' })
  name: string;

  @ApiProperty({
    example: '-34.9214500',
    description: 'Latitud',
  })
  @IsString({ message: 'La latitud debe ser una cadena de caracteres' })
  @IsNotEmpty({ message: 'La latitud es obligatoria' })
  @MaxLength(50, { message: 'La latitud no puede tener más de 50 caracteres' })
  lat: string;

  @ApiProperty({
    example: '-57.9545300',
    description: 'Longitud',
  })
  @IsString({ message: 'La longitud debe ser una cadena de caracteres' })
  @IsNotEmpty({ message: 'La longitud es obligatoria' })
  @MaxLength(50, { message: 'La longitud no puede tener más de 50 caracteres' })
  @IsString()
  @IsNotEmpty()
  long: string;
}

export class UpdateGeographyDto extends PartialType(CreateGeographyDto) { }

export class CreateStateDto extends CreateGeographyDto {
  @IsNumber({}, { message: 'El código de país debe ser un número' })
  @IsNotEmpty({ message: 'El código de país es obligatorio' })
  countryId: number;
}

export class CreateCityDto extends CreateGeographyDto {
  @IsNumber({}, { message: 'El código de estado debe ser un número' })
  @IsNotEmpty({ message: 'El código de estado es obligatorio' })
  stateId: number;
}

