import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { Coworkings } from 'src/entities/coworkings.entity';
import { Bookings } from 'src/entities/bookings.entity';
import { NodemailerModule } from '../nodemailer/nodemailer.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Coworkings, Bookings]),
    NodemailerModule,
  ],
  controllers: [BookingsController],
  providers: [BookingsService],
  exports: [BookingsService],
})
export class BookingsModule { }
