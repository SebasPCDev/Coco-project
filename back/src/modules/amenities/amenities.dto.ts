import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAmenitiesDto {
  @ApiProperty({ example: 'Gimnasio', description: 'El nombre' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString({ message: 'El nombre debe ser una cadena de caracteres' })
  name: string;

  @ApiProperty({
    example: 'Área equipada para hacer ejercicio',
    description: 'Descripción',
  })
  @IsNotEmpty({ message: 'La descripción es obligatoria' })
  @IsString({ message: 'La descripción debe ser una cadena de caracteres' })
  description: string;
}

export class UpdateAmenitiesDto extends PartialType(CreateAmenitiesDto) {}
