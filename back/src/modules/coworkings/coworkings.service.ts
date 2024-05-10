import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UUID } from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { NodemailerService } from '../nodemailer/nodemailer.service';
import { loadDataCoworkings } from 'src/utils/loadData';
import { StatusRequest } from 'src/models/statusRequest.enum';
import { Coworkings } from 'src/entities/coworkings.entity';
import { Users } from 'src/entities/users.entity';
import { Request } from 'src/entities/requests.entity';
import { CreateCoworkingsDto, UpdateCoworkingsDto } from './coworkings.dto';
import { CreateUsersDto } from '../users/users.dto';
import { Role } from 'src/models/roles.enum';
import { UserStatus } from 'src/models/userStatus.enum';
import { CoworkingStatus } from 'src/models/coworkingStatus.enum';

@Injectable()
export class CoworkingsService {
  constructor(
    @InjectRepository(Coworkings)
    private coworkingsRepository: Repository<Coworkings>,
    private readonly nodemailerService: NodemailerService,
    private dataSource: DataSource,
    @InjectRepository(Request)
    private requestsRepository: Repository<Request>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
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
    const requestCoworking = await this.requestsRepository.findOneBy({ id });
    if (!requestCoworking || requestCoworking.status === StatusRequest.CLOSE)
      throw new BadRequestException('socolitud procesada o inexistente');

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      await queryRunner.startTransaction(); // START
      // 2- Crear user
      // const password = Math.random().toString(36).slice(-8);
      const password = 'Coco123!';
      const hashedPass = await bcrypt.hash(password, 10);
      if (!hashedPass)
        throw new BadRequestException('Password could not be hashed');

      const userData: CreateUsersDto = {
        name: requestCoworking.name,
        lastname: requestCoworking.lastname,
        phone: requestCoworking.phone,
        email: requestCoworking.email,
        password: hashedPass,
        identification: requestCoworking.identification,
        position: requestCoworking.position,
        status: UserStatus.ACTIVE,
        role: Role.ADMIN_COWORKING,
      };

      const user = await this.usersRepository.findOneBy({
        email: requestCoworking.email,
      });

      if (user) throw new BadRequestException('Usuario existente');

      const newUserTemp = this.usersRepository.create(userData);
      const newUser = await queryRunner.manager.save(newUserTemp);

      // 2- Crear coworking -> users_coworking
      const coworking: CreateCoworkingsDto = {
        name: requestCoworking.companyName,
        email: requestCoworking.companyEmail,
        phone: requestCoworking.companyPhone,
        address: requestCoworking.address,
        open: requestCoworking.open,
        close: requestCoworking.close,
        capacity: requestCoworking.capacity,
        message: requestCoworking.message,
        status: CoworkingStatus.PENDING,
        user: [newUser],
      };

      const newCoworkingTemp = this.coworkingsRepository.create(coworking);
      const newCoworking = await queryRunner.manager.save(newCoworkingTemp);

      // 3- Requests pending -> close
      const updRequest = this.requestsRepository.merge(requestCoworking, {
        status: StatusRequest.CLOSE,
      });
      await queryRunner.manager.save(updRequest);

      // 4- Enviar email
      this.nodemailerService.confirmacionMailRequest(
        requestCoworking.email,
        requestCoworking.companyName,
        password,
      );

      await queryRunner.commitTransaction(); //COMMIT
      await queryRunner.release(); // RELEASE

      return newCoworking;
    } catch (err) {
      await queryRunner.rollbackTransaction(); // ROLLBACK
      await queryRunner.release(); // RELEASE
      throw err;
    }
  }

  async update(id: UUID, changes: UpdateCoworkingsDto) {
    // return `This action updates a #${id} ${changes} coworking`;
    const coworking = await this.getCoworkingById(id);

    const updCoworking = this.coworkingsRepository.merge(coworking, changes);
    return await this.coworkingsRepository.save(updCoworking);
  }

  // remove(id: number) {
  //   return `This action removes a #${id} coworking`;
  // }

  async preloadCoworkings() {
    const data = loadDataCoworkings();

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
