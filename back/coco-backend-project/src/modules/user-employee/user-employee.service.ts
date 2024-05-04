import { Injectable } from '@nestjs/common';
import { CreateUserEmployeeDto } from './user-employee.dto';

@Injectable()
export class UserEmployeeService {
  create(createUserEmployeeDto: CreateUserEmployeeDto) {
    return 'This action adds a new userEmployee';
  }

  findAll() {
    return `This action returns all userEmployee`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userEmployee`;
  }

  /*   update(id: number, updateUserEmployeeDto: UpdateUserEmployeeDto) {
    return `This action updates a #${id} userEmployee`;
  } */

  remove(id: number) {
    return `This action removes a #${id} userEmployee`;
  }
}
