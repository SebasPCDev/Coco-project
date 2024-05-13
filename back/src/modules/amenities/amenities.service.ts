import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { Amenities } from 'src/entities/amenities.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AmenitiesService {
    constructor(
        @InjectRepository(Amenities)
        private readonly amenityRepository: Repository<Amenities>,
      ) {}
    
      async findAll(): Promise<Amenities[]> {
        return await this.amenityRepository.find({
          relations: ['coworkings'],
        });
      }
    
      async findOne(id: UUID): Promise<Amenities> {
        return await this.amenityRepository.findOne({
          where:{id},
          relations: ['coworkings'],
        });
     }
    
      async create(amenityData: Partial<Amenities>): Promise<Amenities> {
        const amenity = this.amenityRepository.create(amenityData);
        return await this.amenityRepository.save(amenity);
      }
    
      async update(id: UUID, amenityData: Partial<Amenities>): Promise<Amenities> {
        await this.amenityRepository.update(id, amenityData);
        return await this.amenityRepository.findOne({
          where:{id},
          relations: ['coworkings'],
        });
      }
    
      async delete(id: number): Promise<void> {
        await this.amenityRepository.delete(id);
      }
}
