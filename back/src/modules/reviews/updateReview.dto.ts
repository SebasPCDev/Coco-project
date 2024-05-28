import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateReviewDto } from './createReview.dto';

export class UpdateReviewDto extends PartialType(CreateReviewDto) {
  @ApiProperty({
    description: 'Nueva puntuación del espacio de trabajo (1-5)',
    example: 5,
  })
  @IsOptional()
  @IsInt({
    message: 'La puntuación del espacio de trabajo debe ser un número entero',
  })
  @Min(1, { message: 'La puntuación mínima permitida es 1' })
  @Max(5, { message: 'La puntuación máxima permitida es 5' })
  coworking_rating?: number;

  @ApiProperty({
    description: 'Nuevo comentario opcional',
    example: 'El mejor coworking que he visitado hasta ahora',
  })
  @IsOptional()
  comment?: string;

  @ApiProperty({
    description: 'Nuevo comentario opcional de coworking',
    example: 'Respuesta al cliente',
  })
  @IsOptional()
  res_coworking?: string;
}
