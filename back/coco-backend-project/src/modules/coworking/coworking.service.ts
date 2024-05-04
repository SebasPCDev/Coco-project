import { Injectable } from '@nestjs/common';
import { CreateCoworkingDto } from './coworking.dto';
import { UpdateCoworkingDto } from './dto/update-coworking.dto';

@Injectable()
export class CoworkingService {
  create(createCoworkingDto: CreateCoworkingDto) {
    return 'This action adds a new coworking';
  }

  findAll() {
    return `This action returns all coworking`;
  }

  findOne(id: number) {
    return `This action returns a #${id} coworking`;
  }

  update(id: number, updateCoworkingDto: UpdateCoworkingDto) {
    return `This action updates a #${id} coworking`;
  }

  remove(id: number) {
    return `This action removes a #${id} coworking`;
  }
}
