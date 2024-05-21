import { Transform } from 'class-transformer';
import { IsDate, IsEmpty, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'
import { UUID } from 'crypto';
import { BookingStatus } from 'src/models/bookingStatus';
import { IsTimeRange } from '../coworkings/coworkings.dto';

export class CreateBookingsDto {

  @IsDate()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  reservationDate: Date;

  @IsString()
  @IsNotEmpty()
  @IsTimeRange()
  reservationTime: Date;

  @IsEmpty()
  date: Date;

  @IsEmpty()
  status: BookingStatus

  @IsString()
  @IsOptional()
  observation: string;

  @IsUUID()
  @IsNotEmpty()
  coworkingId: UUID;
}

export class UpdateBookingsDto {
  @IsNotEmpty()
  @IsEnum(BookingStatus)
  status: BookingStatus

  @IsString()
  @IsOptional()
  observation: string;
}