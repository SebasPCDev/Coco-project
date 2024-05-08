import { Injectable, NotFoundException } from '@nestjs/common';
// import { CreateCoworkingDto } from './coworkings.dto';
import { CreateCoworkingsDto } from './coworkings.dto';
import { UUID } from 'crypto';
import { loadData } from 'src/utils/loadData';
import { InjectRepository } from '@nestjs/typeorm';
import { Coworkings } from 'src/entities/coworkings.entity';
import { Repository } from 'typeorm';
import { RequestsService } from '../requests/requests.service';
import { Role } from 'src/models/roles.enum';
import { UserStatus } from 'src/models/userStatus.enum';

@Injectable()
export class CoworkingsService {
  constructor(
    @InjectRepository(Coworkings)
    private coworkingsRepository: Repository<Coworkings>,
    private readonly requestsService: RequestsService,
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

    const user = {
      name: request.name,
      lastname: request.lastname,
      phone: request.phone,
      email: request.email,
      identification: request.identification,
      position: request.position,
      status: UserStatus.ACTIVE,
      role: Role.ADMIN_COWORKING,
    };
    console.log('User', user);
    // const user = {
    //
    // }

    // const newUser = await this.serviceUser.create(user)

    // 2- Crear coworking -> users_coworking
    // const coworking = {
    //   name:
    //   user: newUser
    // }
    // const newCoworking = this.coworkingRepository.create(coworking)
    // const newCoworking = this.coworkingRepository.save(coworking)

    // 3- Requests pending -> close
    // const request = await this.servicioRequests.update(id, {status: 'close'})

    // 4- Enviar email

    // return newCoworking
    return id;
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

  remove(id: number) {
    return `This action removes a #${id} coworking`;
  }

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
