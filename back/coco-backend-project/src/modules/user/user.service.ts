import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './user.dto';
import * as bcrypt from 'bcrypt';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  /*   update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  } */

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async preloadSuperAdminUser() {
    const hashedPassword = await bcrypt.hash('Coco123!', 10);

    const adminUser = {
      name: 'Coco',
      lastname: 'Plus',
      phone: '311223332',
      email: 'cocoplus2024@gmail.com',
      identification: '123456789',
      position: 'Superadmin',
      password: hashedPassword,
      role: 'superadmin',
    };

    const userTemp = await this.usersRepository.findOne({
      where: { email: adminUser.email },
    });

    if (!userTemp) {
      console.log('Admin user has been created...');
      return await this.usersRepository.save(adminUser);
    }
    console.log('Admin user already exists...');
  }
}
