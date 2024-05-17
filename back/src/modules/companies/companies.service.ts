import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { CreateCompaniesDto, UpdateCompaniesDto } from './companies.dto';
import { loadDataCompanies } from 'src/utils/loadData';
import { InjectRepository } from '@nestjs/typeorm';
import { Companies } from 'src/entities/companies.entity';
import { DataSource, Repository } from 'typeorm';
import { NodemailerService } from '../nodemailer/nodemailer.service';
import { Users } from 'src/entities/users.entity';
import * as bcrypt from 'bcrypt';
import { CreateEmployeeDto, CreateUsersDto } from '../users/users.dto';
import { UUID } from 'crypto';
import { Request } from 'src/entities/requests.entity';
import { UserStatus } from 'src/models/userStatus.enum';
import { Role } from 'src/models/roles.enum';
import { Employees } from 'src/entities/employees.entity';
import { StatusRequest } from 'src/models/statusRequest.enum';
import { CompanyStatus } from 'src/models/companyStatus.enum';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Companies)
    private companiesRepository: Repository<Companies>,
    @InjectRepository(Request)
    private requestsRepository: Repository<Request>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(Employees)
    private employeesRepository: Repository<Employees>,
    private dataSource: DataSource,
    private readonly nodemailerService: NodemailerService,
  ) { }

  async getAllCompanies() {
    return await this.companiesRepository.find();
  }

  async getCompanyById(id: UUID) {
    return await this.companiesRepository.findOne({
      where: { id },
    });
  }

  create(data: CreateCompaniesDto) {
    console.log('data', data);
    return 'This action adds a new company';
  }

  async activateCompany(id: UUID) {
    // 1- Busco la solicitud
    const requestCoworking = await this.requestsRepository.findOneBy({ id });
    if (!requestCoworking || requestCoworking.status === StatusRequest.CLOSE)
      throw new BadRequestException('solicitud procesada o inexistente');

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      await queryRunner.startTransaction(); // START

      const user = await this.usersRepository.findOneBy({
        email: requestCoworking.email,
      });
      if (user) throw new BadRequestException('Usuario existente');

      // 2- Crear user
      // const password = Math.random().toString(36).slice(-8);
      const password = process.env.SUPERADMIN_PASSWORD;
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
        role: Role.ADMIN_COMPANY,
      };

      const newUserTemp = this.usersRepository.create(userData);
      const newUser = await queryRunner.manager.save(newUserTemp);

      const company: CreateCompaniesDto = {
        name: requestCoworking.companyName,
        phone: requestCoworking.companyPhone,
        email: requestCoworking.companyEmail,
        quantityBeneficiaries: requestCoworking.quantityBeneficiaries,
        businessSector: requestCoworking.businessSector,
        size: requestCoworking.size,
        status: CompanyStatus.PENDING,
        total_passes: 0,
      };

      const newCompanyTemp = this.companiesRepository.create(company);
      const newCompany = await queryRunner.manager.save(newCompanyTemp);

      // Create Employee
      const employee = {
        passes: 1,
        passesAvailable: 1,
        user: newUser,
        company: newCompany,
      };

      const newEmployee = this.employeesRepository.create(employee);
      await queryRunner.manager.save(newEmployee);

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

      return newCompany;
    } catch (err) {
      await queryRunner.rollbackTransaction(); // ROLLBACK
      await queryRunner.release(); // RELEASE
      throw err;
    }
  }

  async createEmployee(adminCompanyId: UUID, data: CreateEmployeeDto) {

    const dbUser = await this.usersRepository.findOneBy({
      email: data.email,
    });
    if (dbUser) throw new BadRequestException('User found');

    const adminCompany = await this.usersRepository.findOne({ where: { id: adminCompanyId }, relations: ['employee.company'] });

    if (adminCompany.employee.company.id !== data.companyId) throw new ForbiddenException('You do not have permission and are not allowed to access this route');

    const company = await this.companiesRepository.findOneBy({ id: data.companyId });
    if (!company) throw new BadRequestException('Company not found');

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {

      await queryRunner.startTransaction(); // START

      const password = process.env.SUPERADMIN_PASSWORD;
      const hashedPass = await bcrypt.hash(password, 10);
      if (!hashedPass)
        throw new BadRequestException('Password could not be hashed');

      data.password = hashedPass;
      data.role = Role.EMPLOYEE;
      const user = this.usersRepository.create(data);
      const newUser = await queryRunner.manager.save(user);

      const employee = {
        passes: data.passes,
        passesAvailable: data.passesAvailable,
        user: newUser,
        company,
      };

      const newEmployee = this.employeesRepository.create(employee);
      await queryRunner.manager.save(newEmployee);

      await queryRunner.commitTransaction(); //COMMIT
      await queryRunner.release(); // RELEASE

      return await this.usersRepository.findOneBy({
        email: data.email,
      });
    } catch (err) {
      await queryRunner.rollbackTransaction(); // ROLLBACK
      await queryRunner.release(); // RELEASE
      throw err;
    }
  }

  async update(id: UUID, changes: UpdateCompaniesDto) {
    const company = await this.getCompanyById(id);

    const updCompany = this.companiesRepository.merge(company, changes);
    return this.companiesRepository.save(updCompany);
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }

  async preloadCompanies() {
    const data = loadDataCompanies();

    for await (const company of data) {
      const companyExists = await this.companiesRepository.findOne({
        where: { email: company.email },
      });

      if (!companyExists) {
        await this.companiesRepository.save(company);
      }
    }
    console.log(`
    ###############################################
    ##### Companies data loaded successfully #####
    ###############################################

    `);
    return true;
  }
}
