import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { Request } from 'src/entities/requests.entity';
import { StatusRequest } from 'src/models/statusRequest.enum';
import { TypeCompany } from 'src/models/typeCompany.enum';
import { FindOptionsWhere, Repository } from 'typeorm';
import { UpdateRequestCoworkingDto } from './requestCoworking.dto';
import { loadDataRequest, loadDataRequestCompany } from 'src/utils/loadData';
import { CoworkingsService } from '../coworkings/coworkings.service';
import { CompaniesService } from '../companies/companies.service';
import { UpdateRequestDto } from './requestCompany.dto';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(Request)
    private requestsRepository: Repository<Request>,
    private readonly coworkingsService: CoworkingsService,
    private readonly companiesService: CompaniesService,
  ) { }

  async getRequestByEmail(email: string) {
    const existingRequest = await this.requestsRepository.findOne({
      where: { email },
    });
    if (existingRequest) {
      throw new ConflictException('El correo ya está en uso');
    }
  }

  async getCoworkingById(id: UUID) {
    const request = await this.requestsRepository.findOneBy({ id });
    return request;
  }

  async addCowork(cowork: Partial<Request>) {
    // const existingRequest = await this.requestsRepository.findOne({
    //   where: { email: cowork.email },
    // });

    // if (existingRequest) {
    //   throw new ConflictException('El correo ya está en uso');
    // }

    await this.getRequestByEmail(cowork.email);

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

  async getRequest(type: TypeCompany, status: StatusRequest) {
    const where: FindOptionsWhere<Request> = {};
    if (type) where.type = type;
    if (status) where.status = status;

    return await this.requestsRepository.find({ where });
  }

  async findById(id: UUID) {
    const request = await this.requestsRepository.findOneBy({ id });
    if (!request) throw new BadRequestException('Request not found');
    return request;
  }

  async declineRequest(id: UUID, changes: UpdateRequestDto) {
    const request = await this.findById(id);
    const updRequest = this.requestsRepository.merge(request, changes);
    return await this.requestsRepository.save(updRequest);
  }

  async update(id: UUID, changes: UpdateRequestCoworkingDto) {
    const request = await this.getCoworkingById(id);

    const updCoworking = this.requestsRepository.merge(request, changes);
    return await this.requestsRepository.save(updCoworking);
  }


  async preloadRequest() {
    const dataCoworks = loadDataRequest();
    const dataCompanies = loadDataRequestCompany();

    for await (const request of dataCoworks) {
      const requestExist = await this.requestsRepository.findOne({
        where: { email: request.email },
      });

      if (!requestExist) {
        await this.requestsRepository.save(request);
      }
    }

    for await (const request of dataCompanies) {
      const requestExist = await this.requestsRepository.findOne({
        where: { email: request.email },
      });

      if (!requestExist) {
        await this.requestsRepository.save(request);
      }
    }

    const firstCoworking = await this.requestsRepository.find({
      take: 1,
      where: { type: TypeCompany.COWORKING },
    });
    const firtsCompany = await this.requestsRepository.find({
      take: 1,
      where: { type: TypeCompany.COMPANY },
    });

    await this.coworkingsService.activateCoworking(
      firstCoworking[0].id as UUID,
    );
    await this.companiesService.activateCompany(firtsCompany[0].id as UUID);

    return true;
  }
}
