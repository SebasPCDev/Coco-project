import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { Amenities } from 'src/entities/amenities.entity';
import { loadDataAmenities } from 'src/utils/loadData';
import { Repository } from 'typeorm';

@Injectable()
export class AmenitiesService {
  constructor(
    @InjectRepository(Amenities)
    private readonly amenitiesRepository: Repository<Amenities>,
  ) { }

  async findAll(): Promise<Amenities[]> {
    return await this.amenitiesRepository.find();
  }

  async findOne(id: UUID): Promise<Amenities> {
    const amenity = await this.amenitiesRepository.findOneBy({ id });
    if (!amenity) throw new BadRequestException('Comodidad no encontrada')
    return amenity;
  }

  async create(amenityData: Partial<Amenities>): Promise<Amenities> {
    const amenity = this.amenitiesRepository.create(amenityData);
    return await this.amenitiesRepository.save(amenity);
  }

  async update(id: UUID, amenityData: Partial<Amenities>): Promise<Amenities> {
    const amenity = await this.findOne(id);

    const updAmenity = this.amenitiesRepository.merge(amenity, amenityData);
    return await this.amenitiesRepository.save(updAmenity);
  }

  async delete(id: number): Promise<void> {
    await this.amenitiesRepository.delete(id);
  }
  async preloadAmenities() {

    const dataAmenities = loadDataAmenities();
        
    for await (const amenities of dataAmenities) {
      const amenitiesExist = await this.amenitiesRepository.findOne({
        where: { name: amenities.name },
      });

      if (!amenitiesExist) {
        await this.amenitiesRepository.save(amenities);
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
