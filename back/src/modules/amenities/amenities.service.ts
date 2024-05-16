import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { Amenities } from 'src/entities/amenities.entity';
import { loadDataAmenities } from 'src/utils/loadData';
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

      async preloadAmenities() {

        const dataAmenities = loadDataAmenities();
            
        for await (const amenities of dataAmenities) {
          const amenitiesExist = await this.amenityRepository.findOne({
            where: { name: amenities.name },
          });
    
          if (!amenitiesExist) {
            await this.amenityRepository.save(amenities);
          }
        }
    
    
        console.log(`
        ###############################################
        ##### Amenities data loaded successfully #####
        ###############################################
    
        `);
        return true;
      }
}
