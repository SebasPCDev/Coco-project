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
// import { loadRequestCoworkings, loadImagesCoworkings, loadReceptionists, loadDataRequestCompany } from 'src/utils/loadData';
import { CoworkingsService } from '../coworkings/coworkings.service';
import { NodemailerService } from '../nodemailer/nodemailer.service';
// import { UpdateCoworkingsDto } from '../coworkings/coworkings.dto';
// import { CoworkingStatus } from 'src/models/coworkingStatus.enum';
// import { Role } from 'src/models/roles.enum';
// import { UserStatus } from 'src/models/userStatus.enum';
import { AmenitiesService } from '../amenities/amenities.service';
import { CompaniesService } from '../companies/companies.service';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(Request)
    private requestsRepository: Repository<Request>,
    private readonly amenitiesService: AmenitiesService,
    private readonly coworkingsService: CoworkingsService,
    private readonly nodemailerService: NodemailerService,
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

  async addCowork(cowork: Partial<Request>, email=true) {

    await this.getRequestByEmail(cowork.email);

    const newRequest = this.requestsRepository.create(cowork);
    await this.requestsRepository.save(newRequest);
    if (email)
      await this.nodemailerService.NotificationMailRequest(cowork.email,cowork.companyName)
    return {
      responseCowork: 'Registrado con éxito. Por favor, espere confirmación.',
      request: newRequest,
    };
  }

  async addCompany(company: Partial<Request>, email=true) {
    const existingRequest = await this.requestsRepository.findOne({
      where: { email: company.email },
    });

    if (existingRequest) {
      throw new ConflictException('El correo ya está en uso');
    }

    const newRequest = this.requestsRepository.create(company);
    await this.requestsRepository.save(newRequest);
    if (email)
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

//   async preloadRequest() {

//     const request = await this.requestsRepository.find()
//     if (request.length > 0) {
//       console.log("Ya existen existen compañías");
//       return
//     }

//     const dataCoworks = loadRequestCoworkings();
//     const images = loadImagesCoworkings();
//     const recepciontists = loadReceptionists();
//     const dataCompanies = loadDataRequestCompany();

//     let coworkingCount = 0;
//     const amenities = await this.amenitiesService.findAll();
//     for await (const sol of dataCoworks) {
//       console.log("coworkingCount", coworkingCount);
//       const dominio = `${sol.companyName.replaceAll(' ', '').toLowerCase()}.com`
//       sol.email = `${sol.lastname.toLowerCase()}${sol.name.toLowerCase()}@${dominio}`;
      
//       const requestExist = await this.requestsRepository.findOne({
//         where: { email: sol.email },
//       });

//       if (requestExist) continue;

//       sol.companyPhone = sol.phone.slice(0,9)+'0000';
//       sol.companyEmail = `ventas@${dominio}`;
//       sol.position= 'Gerente de ventas';
//       sol.website = `http://${dominio}`;
//       sol.status = 'pending';
//       sol.type= "coworking";
//       sol.capacity = Math.floor(Math.random() * (41 - 10)) + 10;    
      
//       const openHours = [7, 8, 9, 10];
//       const minutes = [0, 30];
//       const randomOpenHour = openHours[Math.floor(Math.random() * openHours.length)];
//       const randomMinute = minutes[Math.floor(Math.random() * minutes.length)];
//       sol.open = `${randomOpenHour.toString().padStart(2,'0')}:${randomMinute.toString().padStart(2, '0')}`;

//       const closeHours = [17, 18, 19, 20];
//       const randomCloseHour = closeHours[Math.floor(Math.random() * closeHours.length)];
//       sol.close = `${randomCloseHour.toString()}:${randomMinute.toString().padStart(2, '0')}`;

//       sol.thumbnail = images[coworkingCount];

//       const data = this.requestsRepository.create(sol as CreateRequestDto);
//       const requestCowork = await this.requestsRepository.save(data);

//       const coworking = await this.coworkingsService.activateCoworking(requestCowork.id as UUID, false);

//       const randomAmenity1 = Math.floor(Math.random() * 10);
//       const randomAmenity2 = Math.floor(Math.random() * 10);

//       const changesCoworking: UpdateCoworkingsDto = {
//         city: sol.city,
//         state: sol.state,
//         country: sol.country,
//         lat: sol.lat,
//         long: sol.long,
//         thumbnail: sol.thumbnail,
//         amenitiesIds: [amenities[randomAmenity1].id as UUID, amenities[randomAmenity2].id as UUID]
//       }
            
//       await this.coworkingsService.update(coworking.id as UUID, changesCoworking )
//       await this.coworkingsService.update(coworking.id as UUID, {status: CoworkingStatus.ACTIVE} )

//       for (let i=0; i< 4; i++) {
//         const image = Math.floor(Math.random() * 40);
//         await this.coworkingsService.addImage(coworking.id as UUID, images[image])
//       }

//       const newReceptionist = recepciontists[coworkingCount];
//       newReceptionist.coworkingId = coworking.id as UUID;
//       newReceptionist.email = `${newReceptionist.lastname.toLowerCase()}${newReceptionist.name.toLowerCase()}@${dominio}`;
//       newReceptionist.position = "Recepcionista";
//       newReceptionist.role = Role.COWORKING;
//       newReceptionist.status = UserStatus.ACTIVE;
//       newReceptionist.password= process.env.SUPERADMIN_PASSWORD;

//       await this.coworkingsService.createUserCoworking(newReceptionist, false)
//       coworkingCount++;
//     }

//       for await (const request of dataCompanies) {
//       const requestExist = await this.requestsRepository.findOne({
//         where: { email: request.email },
//       });

//       if (!requestExist) {
//         await this.requestsRepository.save(request);
//       }
//     }
    
//        const firtsCompany = await this.requestsRepository.find({
//       take: 1,
//       where: { type: CompanyType.COMPANY },
//     });

//     await this.companiesService.activateCompany(firtsCompany[0].id as UUID);

//     return true;
//   }
}
