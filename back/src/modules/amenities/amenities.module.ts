import { Module } from '@nestjs/common';
import { AmenitiesService } from './amenities.service';
import { AmenitiesController } from './amenities.controller';

@Module({
  providers: [AmenitiesService],
  controllers: [AmenitiesController]
})
export class AmenitiesModule {}
