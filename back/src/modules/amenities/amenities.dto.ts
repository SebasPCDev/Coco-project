import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateAmenityDto {
  @ApiProperty({ example: 'Gimnasio', description: 'El nombre' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString({ message: 'El nombre debe ser una cadena de caracteres' })
  name: string;

  @ApiProperty({ example: 'Área equipada para hacer ejercicio', description: 'Descripción' })
  @IsNotEmpty({ message: 'La descripción es obligatoria' })
  @IsString({ message: 'La descripción debe ser una cadena de caracteres' })
  description: string;
}

export class UpdateAmenityDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'El ID único ' })
  @IsNotEmpty({ message: 'El ID es obligatorio' })
  @IsUUID('all', { message: 'El ID debe ser un UUID válido' })
  id: string;

  @ApiProperty({ example: 'Gimnasio actualizado', description: 'El nombre actualizado ' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString({ message: 'El nombre debe ser una cadena de caracteres' })
  name: string;

  @ApiProperty({ example: 'Descripción actualizada', description: 'La descripción actualizada ' })
  @IsNotEmpty({ message: 'La descripción es obligatoria' })
  @IsString({ message: 'La descripción debe ser una cadena de caracteres' })
  descripcion: string;
}
