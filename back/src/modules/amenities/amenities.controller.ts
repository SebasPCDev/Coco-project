import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Amenities } from 'src/entities/amenities.entity';
import { AmenitiesService } from './amenities.service';
import { UUID } from 'crypto';
import { CreateAmenityDto } from './amenities.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('amenities')
@Controller('amenities')
export class AmenitiesController {
    constructor(private readonly amenitiesService: AmenitiesService) {}

  @Get()
  findAll(): Promise<Amenities[]> {
    return this.amenitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: UUID): Promise<Amenities> {
    
    return this.amenitiesService.findOne(id);
  }

  @Post()
  create(@Body() amenityData: CreateAmenityDto): Promise<Amenities> {

    return this.amenitiesService.create(amenityData);
  }

  @Put(':id')
  update(@Param('id') id: UUID, @Body() amenityData: Partial<Amenities>): Promise<Amenities> {

    return this.amenitiesService.update(id, amenityData);
  }

  @Delete(':id')
  delete(@Param('id') id: UUID): Promise<void> {

    return this.amenitiesService.delete(+id);
  }

}
