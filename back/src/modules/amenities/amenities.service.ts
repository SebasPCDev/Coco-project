import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { Amenities } from 'src/entities/amenities.entity';
import { Repository } from 'typeorm';
import { CreateAmenitiesDto, UpdateAmenitiesDto } from './amenities.dto';

@Injectable()
export class AmenitiesService {
  constructor(
    @InjectRepository(Amenities)
    private readonly amenitiesRepository: Repository<Amenities>,
  ) {}

  async findAll(): Promise<Amenities[]> {
    return await this.amenitiesRepository.find();
  }

  async findOne(id: UUID): Promise<Amenities> {
    const amenity = await this.amenitiesRepository.findOneBy({ id });
    if (!amenity) throw new BadRequestException('Comodidad no encontrada');
    return amenity;
  }

  async create(data: CreateAmenitiesDto) {
    const amenity = this.amenitiesRepository.create(data);
    return await this.amenitiesRepository.save(amenity);
  }

  async update(id: UUID, changes: UpdateAmenitiesDto) {
    const amenity = await this.findOne(id);

    const updAmenity = this.amenitiesRepository.merge(amenity, changes);
    return await this.amenitiesRepository.save(updAmenity);
  }

  async delete(id: UUID) {
    await this.amenitiesRepository.delete(id);
  }
}
