import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NodemailerModule } from '../nodemailer/nodemailer.module';
import { CoworkingsService } from './coworkings.service';
import { CoworkingsController } from './coworkings.controller';
import { Coworkings } from 'src/entities/coworkings.entity';
import { Users } from 'src/entities/users.entity';
import { Request } from 'src/entities/requests.entity';
import { CoworkingImages } from 'src/entities/coworkingImages.entity';
import { BookingsModule } from '../bookings/bookings.module';
import { Amenities } from 'src/entities/amenities.entity';

@Module({
  imports: [
    NodemailerModule,
    BookingsModule,
    TypeOrmModule.forFeature([
      Coworkings,
      Amenities,
      Request,
      Users,
      CoworkingImages,
    ]),
  ],
  controllers: [CoworkingsController],
  providers: [CoworkingsService],
  exports: [CoworkingsService],
})
export class CoworkingModule {}
