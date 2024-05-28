import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  Max,
  Min,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty({
    description: 'Puntuación del espacio de trabajo (1-5)',
    example: 4,
  })
  @IsInt({
    message: 'La puntuación del espacio de trabajo debe ser un número entero',
  })
  @Min(1, { message: 'La puntuación mínima permitida es 1' })
  @Max(5, { message: 'La puntuación máxima permitida es 5' })
  @IsNotEmpty({
    message: 'La puntuación del espacio de trabajo es obligatoria',
  })
  coworking_rating: number;

  @ApiProperty({
    description: 'Comentario opcional',
    example: 'Excelente ambiente y ubicación',
  })
  @IsOptional()
  comment?: string;

  @ApiProperty({
    description: 'ID del usuario (UUID)',
    example: 'e8129079-02ae-4e76-8e80-f09c6c56472a',
  })
  @IsUUID('all', { message: 'El ID del usuario debe ser un UUID válido' })
  @IsOptional()
  user_id?: string;

  @ApiProperty({
    description: 'ID del espacio de trabajo (UUID)',
    example: 'e6129079-02ae-4e76-8e80-f09c6c56472a',
  })
  @IsUUID('all', {
    message: 'El ID del espacio de trabajo debe ser un UUID válido',
  })
  @IsNotEmpty({ message: 'El ID del espacio de trabajo es obligatorio' })
  coworking_id: string;
}
