import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCoworkingsDto } from './coworkings.dto';
import { UUID } from 'crypto';
import { loadData } from 'src/utils/loadData';
import { InjectRepository } from '@nestjs/typeorm';
import { Coworkings } from 'src/entities/coworkings.entity';
import { Repository } from 'typeorm';
import { RequestsService } from '../requests/requests.service';
import { Role } from 'src/models/roles.enum';
import { UserStatus } from 'src/models/userStatus.enum';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUsersDto } from '../users/users.dto';
import { CoworkingStatus } from 'src/models/coworkingStatus.enum';
import { StatusRequest } from 'src/models/statusRequest.enum';
import { NodemailerService } from '../nodemailer/nodemailer.service';

@Injectable()
export class CoworkingsService {
  constructor(
    @InjectRepository(Coworkings)
    private coworkingsRepository: Repository<Coworkings>,
    private readonly requestsService: RequestsService,
    private readonly usersService: UsersService,
    private readonly nodemailerService: NodemailerService,
  ) {}

  async getAllCoworkings() {
    return await this.coworkingsRepository.find();
  }

  async getCoworkingById(id: string) {
    const coworking = await this.coworkingsRepository.findOne({
      where: { id },
    });

    if (!coworking) {
      throw new NotFoundException(`Coworking with id ${id} not found`);
    }

    return coworking;
  }

  create(data: CreateCoworkingsDto) {
    return data;
  }

  async activateCoworking(id: UUID) {
    // 1- Busco la solicitud
    const request = await this.requestsService.findById(id);
    console.log('request', request);

    // 2- Crear user
    // const password = Math.random().toString(36).slice(-8);
    const password = 'Coco123!';
    const hashedPass = await bcrypt.hash(password, 10);
    if (!hashedPass)
      throw new BadRequestException('Password could not be hashed');

    const user: CreateUsersDto = {
      name: request.name,
      lastname: request.lastname,
      phone: request.phone,
      email: request.email,
      password: hashedPass,
      identification: request.identification,
      position: request.position,
      status: UserStatus.ACTIVE,
      role: Role.ADMIN_COWORKING,
    };

    const newUser = await this.usersService.create(user);

    // 2- Crear coworking -> users_coworking
    const coworking: CreateCoworkingsDto = {
      name: request.companyName,
      email: request.companyEmail,
      phone: request.companyPhone,
      address: request.address,
      open: request.open,
      close: request.close,
      capacity: request.capacity,
      message: request.message,
      status: CoworkingStatus.PENDING,
      user: [newUser],
    };
    const newCoworkingTemp = this.coworkingsRepository.create(coworking);
    const newCoworking = await this.coworkingsRepository.save(newCoworkingTemp);

    // 3- Requests pending -> close
    await this.requestsService.update(id, {
      status: StatusRequest.CLOSE,
    });

    //TODO: 4- Enviar email
    this.nodemailerService.confirmacionMailRequest(request.email,request.companyName,password)
    return newCoworking;
  }

  findAll() {
    return `This action returns all coworking`;
  }

  findOne(id: number) {
    return `This action returns a #${id} coworking`;
  }

  /*   update(id: number, updateCoworkingDto: UpdateCoworkingDto) {
    return `This action updates a #${id} coworking`;
  } */

  // remove(id: number) {
  //   return `This action removes a #${id} coworking`;
  // }

  async preloadCoworkings() {
    const data = loadData();

    for await (const coworking of data) {
      const coworkingExists = await this.coworkingsRepository.findOne({
        where: { email: coworking.email },
      });

      if (!coworkingExists) {
        await this.coworkingsRepository.save(coworking);
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
