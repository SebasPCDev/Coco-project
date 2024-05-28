import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUsersDto } from './users.dto';
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class CreateEmployeeDto extends CreateUsersDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID de la compañía',
  })
  @IsUUID('4', { message: 'companyId debe ser un UUID válido' })
  @IsNotEmpty({ message: 'companyId no debe estar vacío' })
  companyId: UUID;

  @ApiProperty({
    example: 5,
    description: 'Número de pases',
  })
  @IsNumber({}, { message: 'passes debe ser un número' })
  @IsNotEmpty({ message: 'passes no debe estar vacío' })
  passes: number;

  @ApiProperty({
    example: 2,
    description: 'Número de pases disponibles',
  })
  @IsNumber({}, { message: 'passesAvailable debe ser un número' })
  @IsNotEmpty({ message: 'passesAvailable no debe estar vacío' })
  passesAvailable: number;
}

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {}
