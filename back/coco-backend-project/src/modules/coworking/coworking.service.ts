import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCoworkingDto } from './coworking.dto';
import { loadData } from 'src/utils/loadData';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coworkings } from 'src/entities/coworkings.entity';

@Injectable()
export class CoworkingService {
  constructor(
    @InjectRepository(Coworkings)
    private coworkingRepository: Repository<Coworkings>,
  ) {}
  create(createCoworkingDto: CreateCoworkingDto) {
    console.log(createCoworkingDto);
    return 'This action adds a new coworking';
  }

  async getAllCoworkings() {
    return await this.coworkingRepository.find();
  }

  async getCoworkingById(id: string) {
    const coworking = await this.coworkingRepository.findOne({
      where: { id },
    });

    if (!coworking) {
      throw new NotFoundException(`Coworking with id ${id} not found`);
    }

    return coworking;
  }

  /*   update(id: number, updateCoworkingDto: UpdateCoworkingDto) {
    return `This action updates a #${id} coworking`;
  } */

  remove(id: number) {
    return `This action removes a #${id} coworking`;
  }

  async preloadCoworkings() {
    const data = loadData();

    for await (const coworking of data) {
      const coworkingExists = await this.coworkingRepository.findOne({
        where: { email: coworking.email },
      });

      if (!coworkingExists) {
        await this.coworkingRepository.save(coworking);
      }
    }
    console.log(`
    ###############################################
    ##### Coworkings data loaded successfully #####
    ###############################################

    `);
    return true;
  }
}
