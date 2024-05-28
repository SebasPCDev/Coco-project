import { Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Request } from 'src/entities/requests.entity';
import { CoworkingModule } from '../coworkings/coworking.module';
import { CompaniesModule } from '../companies/companies.module';
import { NodemailerModule } from '../nodemailer/nodemailer.module';
import { AmenitiesModule } from '../amenities/amenities.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Request]),
    CoworkingModule,
    CompaniesModule,
    NodemailerModule,
    AmenitiesModule,
  ],
  providers: [RequestsService],
  controllers: [RequestsController],
  exports: [RequestsService],
})
export class RequestsModule {}
