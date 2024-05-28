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
import { FindOptionsOrderValue, FindOptionsWhere, Repository } from 'typeorm';
import { CreateRequestCompanyDto, CreateRequestCoworkingDto, UpdateRequestCoworkingDto, UpdateRequestDto } from './requests.dto';
import { NodemailerService } from '../nodemailer/nodemailer.service';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(Request)
    private requestsRepository: Repository<Request>,
    private readonly nodemailerService: NodemailerService,
  ) { }

  async getRequest(type: CompanyType, status: StatusRequest) {
    const where: FindOptionsWhere<Request> = {};
    if (type) where.type = type;
    if (status) where.status = status;

    return await this.requestsRepository.find({
      where,
      order: { updatedAt: 'DESC' as FindOptionsOrderValue }
    });
  }

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

  async findById(id: UUID) {
    const request = await this.requestsRepository.findOneBy({ id });
    if (!request) throw new BadRequestException('Solicitud no encontrada');
    return request;
  }

  async addCowork(cowork: CreateRequestCoworkingDto, email = true) {
    await this.getRequestByEmail(cowork.email);

    const newRequest = this.requestsRepository.create(cowork);
    await this.requestsRepository.save(newRequest);
    if (email)
      await this.nodemailerService.NotificationMailRequest(
        cowork.email,
        cowork.companyName,
      );
    return {
      responseCowork: 'Registrado con éxito. Por favor, espere confirmación.',
      request: newRequest,
    };
  }

  async addCompany(company: CreateRequestCompanyDto, email = true) {
    const existingRequest = await this.requestsRepository.findOne({
      where: { email: company.email },
    });

    if (existingRequest) {
      throw new ConflictException('El correo ya está en uso');
    }

    const newRequest = this.requestsRepository.create(company);
    await this.requestsRepository.save(newRequest);
    if (email)
      await this.nodemailerService.NotificationMailRequest(
        company.email,
        company.companyName,
      );
    return {
      responseCompany: 'Registrado con éxito. Por favor, espere confirmación.',
      request: newRequest,
    };
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
}
