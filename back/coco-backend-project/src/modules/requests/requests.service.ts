import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { equal } from 'assert';
import { Request } from 'src/entities/requests.entity';
import { CoworkingStatus } from 'src/models/coworkingStatus.enum';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(Request)
    private requestsRepository: Repository<Request>,
  ) {}

  async addCowork(cowork: Partial<Request>) {
    const existingRequest = await this.requestsRepository.findOne({
      where: { email: cowork.email },
    });

    if (existingRequest) {
      throw new ConflictException('El correo ya está en uso');
    }

    const newRequest = this.requestsRepository.create(cowork);
    await this.requestsRepository.save(newRequest);
    return {
      responseCowork: 'Registrado con éxito. Por favor, espere confirmación.',
      request: newRequest,
    };
  }

  async addCompany(company: Partial<Request>) {
    const existingRequest = await this.requestsRepository.findOne({
      where: { email: company.email },
    });

    if (existingRequest) {
      throw new ConflictException('El correo ya está en uso');
    }

    const newRequest = this.requestsRepository.create(company);
    await this.requestsRepository.save(newRequest);
    return {
      responseCompany: 'Registrado con éxito. Por favor, espere confirmación.',
      request: newRequest,
    };
  }

  async getRequest(type: string, status: CoworkingStatus) {
    const where: FindOptionsWhere<Request> = {};
    if (type) where.type = type;
    if (status) where.status = status;

    console.log(where);

    return this.requestsRepository.find({ where });
  }
}
