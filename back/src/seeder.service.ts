import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import {
  loadCities,
  loadCountries,
  loadDataAmenities,
  loadImagesCoworkings,
  loadReceptionists,
  loadRequestCompanies,
  loadRequestCoworkings,
  loadStates,
  loadEmployees,
} from './utils/loadData';
import { AmenitiesService } from './modules/amenities/amenities.service';
import { Role } from './models/roles.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { Repository } from 'typeorm';
import { CountryService } from './modules/geography/services/country.service';
import { StateService } from './modules/geography/services/state.service';
import { CityService } from './modules/geography/services/city.service';
import { RequestsService } from './modules/requests/requests.service';
import { CreateRequestCoworkingDto } from './modules/requests/requests.dto';
import { CoworkingsService } from './modules/coworkings/coworkings.service';
import { UUID } from 'crypto';
import { UpdateCoworkingsDto } from './modules/coworkings/coworkings.dto';
import { CoworkingStatus } from './models/coworkingStatus.enum';
import { UserStatus } from './models/userStatus.enum';
import { CompaniesService } from './modules/companies/companies.service';
import { CompanySize } from './models/companySize.enum';
import { CompanyStatus } from './models/companyStatus.enum';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private readonly amenitiesService: AmenitiesService,
    private readonly countryService: CountryService,
    private readonly stateService: StateService,
    private readonly cityService: CityService,
    private readonly requestsService: RequestsService,
    private readonly coworkingsService: CoworkingsService,
    private readonly companiesService: CompaniesService,
  ) { }

  async seed() {
    console.log('PRELOAD DATA');

    const users = await this.usersRepository.find();
    if (users.length > 0) {
      console.log('Preload ready');
      return;
    }

    await this.preloadSuperAdminUser();
    await this.preloadAmenities();
    await this.preloadGeography();
    await this.preloadCoworkings();
    this.preloadCompanies();
  }

  async preloadSuperAdminUser() {
    const hashedPassword = await bcrypt.hash(
      process.env.SUPERADMIN_PASSWORD,
      10,
    );

    const adminUser = {
      name: process.env.SUPERADMIN_NAME,
      lastname: process.env.SUPERADMIN_LASTNAME,
      phone: process.env.SUPERADMIN_PHONE,
      email: process.env.SUPERADMIN_EMAIL,
      identification: process.env.SUPERADMIN_IDENTIFICATION,
      position: process.env.SUPERADMIN_POSITION,
      password: hashedPassword,
      role: Role.SUPERADMIN,
    };
    return await this.usersRepository.save(adminUser);
  }

  async preloadAmenities() {
    const dataAmenities = loadDataAmenities();

    for await (const amenities of dataAmenities) {
      await this.amenitiesService.create(amenities);
    }
    return true;
  }

  async preloadGeography() {
    const arrCountries = [];
    const arrStates = [];

    const countriesData = loadCountries();
    for await (const countryData of countriesData) {
      const country = await this.countryService.create(countryData);
      arrCountries.push(country);
    }

    const statesData = loadStates();
    for await (const country of arrCountries) {
      const states = statesData[country.name];
      if (states && states.length > 0) {
        for await (const stateData of states) {
          const state = await this.stateService.create({
            ...stateData,
            countryId: country.id,
          });
          arrStates.push(state);
        }
      }
    }

    const citiesData = loadCities();
    for await (const state of arrStates) {
      const cities = citiesData[state.name];
      if (cities && cities.length > 0) {
        for await (const cityData of cities) {
          await this.cityService.create({ ...cityData, stateId: state.id });
        }
      }
    }
  }

  async preloadCoworkings() {
    const dataCoworks = loadRequestCoworkings();
    const images = loadImagesCoworkings();
    const recepciontists = loadReceptionists();

    let coworkingCount = 0;
    const amenities = await this.amenitiesService.findAll();
    for await (const sol of dataCoworks) {
      console.log('Create Coworking', sol.companyName);
      const dominio = `${sol.companyName.replaceAll(' ', '').toLowerCase()}.com`;
      sol.email = `${sol.lastname.toLowerCase()}${sol.name.toLowerCase()}@${dominio}`;

      sol.companyPhone = sol.phone.slice(0, 9) + '0000';
      sol.companyEmail = `ventas@${dominio}`;
      sol.position = 'Gerente de ventas';
      sol.website = `http://${dominio}`;
      sol.status = 'pending';
      sol.type = 'coworking';
      sol.capacity = Math.floor(Math.random() * (41 - 10)) + 10;

      const openHours = [7, 8, 9, 10];
      const minutes = [0, 30];
      const randomOpenHour =
        openHours[Math.floor(Math.random() * openHours.length)];
      const randomMinute = minutes[Math.floor(Math.random() * minutes.length)];
      sol.open = `${randomOpenHour.toString().padStart(2, '0')}:${randomMinute.toString().padStart(2, '0')}`;

      const closeHours = [17, 18, 19, 20];
      const randomCloseHour =
        closeHours[Math.floor(Math.random() * closeHours.length)];
      sol.close = `${randomCloseHour.toString()}:${randomMinute.toString().padStart(2, '0')}`;

      sol.thumbnail = images[coworkingCount];

      const data = await this.requestsService.addCowork(
        sol as CreateRequestCoworkingDto,
        false,
      );

      const coworking = await this.coworkingsService.activateCoworking(
        data.request.id as UUID,
        false,
      );

      const randomAmenity1 = Math.floor(Math.random() * 10);
      const randomAmenity2 = Math.floor(Math.random() * 10);

      const changesCoworking: UpdateCoworkingsDto = {
        city: sol.city,
        state: sol.state,
        country: sol.country,
        lat: sol.lat,
        long: sol.long,
        thumbnail: sol.thumbnail,
        amenitiesIds: [
          amenities[randomAmenity1].id as UUID,
          amenities[randomAmenity2].id as UUID,
        ],
      };

      await this.coworkingsService.update(
        coworking.id as UUID,
        changesCoworking,
      );
      await this.coworkingsService.update(coworking.id as UUID, {
        status: CoworkingStatus.ACTIVE,
      });

      for (let i = 0; i < 4; i++) {
        const image = Math.floor(Math.random() * 40);
        await this.coworkingsService.addImage(
          coworking.id as UUID,
          images[image],
        );
      }

      const newReceptionist = recepciontists[coworkingCount];
      newReceptionist.coworkingId = coworking.id as UUID;
      newReceptionist.email = `${newReceptionist.lastname.toLowerCase()}${newReceptionist.name.toLowerCase()}@${dominio}`;
      newReceptionist.position = 'Recepcionista';
      newReceptionist.role = Role.COWORKING;
      newReceptionist.status = UserStatus.ACTIVE;
      newReceptionist.password = process.env.SUPERADMIN_PASSWORD;

      await this.coworkingsService.createUserCoworking(newReceptionist, false);
      coworkingCount++;
    }
  }

  async preloadCompanies() {
    const dataCompanies = loadRequestCompanies();

    const requestsCompanies = [];
    for await (const sol of dataCompanies) {
      console.log('Create Company ', sol.companyName);
      const dominio = `${sol.companyName.replaceAll(' ', '').toLowerCase()}.com`;
      sol.email = `${sol.lastname.toLowerCase()}${sol.name.toLowerCase()}@${dominio}`;
      sol.companyEmail = `info@${dominio}`;
      const sizes = Object.values(CompanySize);
      const randomIndex = Math.floor(Math.random() * sizes.length);
      sol.size = sizes[randomIndex];
      sol.type = 'company';
      const requestCompany = await this.requestsService.addCompany(sol, false);
      requestsCompanies.push(requestCompany.request);
    }

    const firtsCompany = requestsCompanies[0];
    const company = await this.companiesService.activateCompany(
      firtsCompany.id as UUID,
      false,
    );

    const dataEmployees = loadEmployees();

    await this.companiesService.update(company.id as UUID, {
      totalPasses: 500,
      status: CompanyStatus.ACTIVE,
      businessSector: 'Tecnología',
      quantityBeneficiaries: dataEmployees.length,
    });

    const adminCompany = await this.companiesService.getCompanyById(
      company.id as UUID,
    );

    for await (const employee of dataEmployees) {
      const dominio = `${company.name.replaceAll(' ', '').toLowerCase()}.com`;
      employee.email = `${employee.lastname.toLowerCase()}${employee.name.toLowerCase()}@${dominio}`;

      employee.role = 'employee';
      employee.status = 'active';
      employee.passes = 50;
      employee.passesAvailable = 50;
      employee.companyId = company.id;

      await this.companiesService.createEmployee(
        adminCompany.employees[0].user.id as UUID,
        employee,
        false
      );
    }
  }
}
