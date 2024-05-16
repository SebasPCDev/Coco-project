import { Module } from '@nestjs/common';
import { AmenitiesService } from './amenities.service';
import { AmenitiesController } from './amenities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Amenities } from 'src/entities/amenities.entity';

@Module({
  providers: [AmenitiesService],
  controllers: [AmenitiesController],
  imports: [TypeOrmModule.forFeature([Amenities])]
})
export class AmenitiesModule {
  constructor(private readonly amenitiesService:AmenitiesService ) {}

  async onModuleInit() {
    await this.amenitiesService.preloadAmenities();
  }
}
