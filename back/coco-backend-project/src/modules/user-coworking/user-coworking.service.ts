import { Injectable } from '@nestjs/common';
import { CreateUserCoworkingDto } from './user-coworking.dto';

@Injectable()
export class UserCoworkingService {
  create(createUserCoworkingDto: CreateUserCoworkingDto) {
    return 'This action adds a new userCoworking';
  }

  findAll() {
    return `This action returns all userCoworking`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userCoworking`;
  }

  /*   update(id: number, updateUserCoworkingDto: UpdateUserCoworkingDto) {
    return `This action updates a #${id} userCoworking`;
  } */

  remove(id: number) {
    return `This action removes a #${id} userCoworking`;
  }
}
