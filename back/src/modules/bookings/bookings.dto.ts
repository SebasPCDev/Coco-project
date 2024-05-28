import { Transform } from 'class-transformer';
import {
  IsDate,
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { UUID } from 'crypto';
import { BookingStatus } from 'src/models/bookingStatus';
import { IsTimeRange } from '../coworkings/coworkings.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookingsDto {
  @ApiProperty({ type: Date, example: '2022-05-31' })
  @IsDate({ message: 'La fecha de reserva debe ser una fecha válida.' })
  @IsNotEmpty({ message: 'La fecha de reserva es obligatoria.' })
  @Transform(({ value }) => new Date(value))
  reservationDate: Date;

  @ApiProperty({ type: Date, example: '2022-05-31T10:00:00' })
  @IsString({
    message: 'El tiempo de reserva debe ser una cadena de caracteres.',
  })
  @IsNotEmpty({ message: 'El tiempo de reserva es obligatorio.' })
  @IsTimeRange({
    message: 'El tiempo de reserva debe estar en un rango válido.',
  })
  reservationTime: Date;

  @IsEmpty({
    message: 'La fecha de creación no debe estar presente en la solicitud.',
  })
  date: Date;

  @IsEmpty({
    message: 'El estado de la reserva no debe estar presente en la solicitud.',
  })
  status: BookingStatus;

  @ApiProperty({ type: String, example: 'Esta es una observación.' })
  @IsString({ message: 'La observación debe ser una cadena de caracteres.' })
  @IsOptional()
  observation: string;

  @ApiProperty({
    type: String,
    example: '7d78f279-7e3c-4b32-bf7e-df4e14571e2b',
  })
  @IsUUID('4', { message: 'El ID del coworking debe ser un UUID válido.' })
  @IsNotEmpty({ message: 'El ID del coworking es obligatorio.' })
  coworkingId: UUID;
}

export class UpdateBookingsDto {
  @ApiProperty({ enum: BookingStatus, example: BookingStatus.PENDING })
  @IsNotEmpty({ message: 'El estado de la reserva es obligatorio.' })
  @IsEnum(BookingStatus, {
    message:
      'El estado de la reserva debe ser uno de los valores permitidos: PENDING, COMPLETED, CANCELLED.',
  })
  status: BookingStatus;

  @ApiProperty({ type: String, example: 'Esta es una observación.' })
  @IsString({ message: 'La observación debe ser una cadena de caracteres.' })
  @IsOptional()
  observation?: string;

  @IsEmpty()
  confirmPhrase?: string;
}
