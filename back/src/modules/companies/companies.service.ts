import { Injectable } from '@nestjs/common';
import { CreateCompaniesDto } from './companies.dto';
import { loadDataCompanies } from 'src/utils/loadData';
import { InjectRepository } from '@nestjs/typeorm';
import { Companies } from 'src/entities/companies.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Companies)
    private companiesRepository: Repository<Companies>,
  ) {}
  create(CreateCompaniesDto: CreateCompaniesDto) {
    return 'This action adds a new company';
  }

  async getAllCompanies() {
    return await this.companiesRepository.find();
  }

  async getCompanyById(id: string) {
    return await this.companiesRepository.findOne({
      where: { id },
    });
  }

  /*   update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }
 */
  remove(id: number) {
    return `This action removes a #${id} company`;
  }

  async preloadCompanies() {
    const data = loadDataCompanies();
    console.log(data);

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
