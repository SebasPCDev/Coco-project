import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Companies } from 'src/entities/companies.entity';
import { Users } from 'src/entities/users.entity';
import { Employees } from 'src/entities/employees.entity';
import { NodemailerModule } from '../nodemailer/nodemailer.module';
import { Request } from 'src/entities/requests.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    NodemailerModule,
    UsersModule,
    TypeOrmModule.forFeature([Companies, Request, Users, Employees]),
  ],
  controllers: [CompaniesController],
  providers: [CompaniesService],
  exports: [CompaniesService],
})
export class CompaniesModule {
  constructor(private readonly companiesService: CompaniesService) {}

  async onModuleInit() {}
}
