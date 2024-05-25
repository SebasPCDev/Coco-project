import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { Request } from 'src/entities/requests.entity';
import { StatusRequest } from 'src/models/statusRequest.enum';
import { CompanyType } from 'src/models/companyType.enum';
import { FindOptionsWhere, Repository } from 'typeorm';
import { UpdateRequestCoworkingDto, UpdateRequestDto } from './requests.dto';
import { loadDataRequest, loadDataRequestCompany } from 'src/utils/loadData';
import { CoworkingsService } from '../coworkings/coworkings.service';
import { CompaniesService } from '../companies/companies.service';
import { NodemailerService } from '../nodemailer/nodemailer.service';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(Request)
    private requestsRepository: Repository<Request>,
    private readonly coworkingsService: CoworkingsService,
    private readonly companiesService: CompaniesService,
    private readonly nodemailerService: NodemailerService,
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

    await this.getRequestByEmail(cowork.email);

    const newRequest = this.requestsRepository.create(cowork);
    await this.requestsRepository.save(newRequest);
    await this.nodemailerService.NotificationMailRequest(cowork.email,cowork.companyName)
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
    await this.nodemailerService.NotificationMailRequest(company.email,company.companyName)
    return {
      responseCompany: 'Registrado con éxito. Por favor, espere confirmación.',
      request: newRequest,
    };
  }

  async getRequest(type: CompanyType, status: StatusRequest) {
    const where: FindOptionsWhere<Request> = {};
    if (type) where.type = type;
    if (status) where.status = status;

    return await this.requestsRepository.find({ where });
  }

  async findById(id: UUID) {
    const request = await this.requestsRepository.findOneBy({ id });
    if (!request) throw new BadRequestException('Solicitud no encontrada');
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

    const request = await this.requestsRepository.find()
    if (request.length > 0) {
      console.log("Ya existen existen compañías");
      return
    }

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
      where: { type: CompanyType.COWORKING },
    });
    const firtsCompany = await this.requestsRepository.find({
      take: 1,
      where: { type: CompanyType.COMPANY },
    });

    await this.coworkingsService.activateCoworking(
      firstCoworking[0].id as UUID,
    );
    await this.companiesService.activateCompany(firtsCompany[0].id as UUID);

    return true;
  }
}
