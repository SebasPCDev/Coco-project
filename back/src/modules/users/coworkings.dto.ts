import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { UUID } from 'crypto';
import { CreateUsersDto } from './users.dto';

export class CreateUserCoworkingsDto extends CreateUsersDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID del coworking',
  })
  @IsUUID('4', { message: 'coworkingId debe ser un UUID válido' })
  @IsNotEmpty({ message: 'coworkingId no debe estar vacío' })
  coworkingId: UUID;
}
