import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Companies } from 'src/entities/companies.entity';

@Module({
  controllers: [CompaniesController],
  providers: [CompaniesService],
  imports: [TypeOrmModule.forFeature([Companies])],
})
export class CompaniesModule {
  constructor(private readonly companiesService: CompaniesService) {}

  async onModuleInit() {
    await this.companiesService.preloadCompanies();
  }
}
