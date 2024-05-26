import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from 'src/entities/country.entity';
import { Repository } from 'typeorm';
import { CreateGeographyDto } from '../geography.dto';
import { loadCountries } from 'src/utils/loadData';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private countryRepository: Repository<Country>
  ) {}

  async getAllCountries() {
    const countries = await this.countryRepository.find()
    return countries;
  }

  async getCountry(id: number) {
    const country = await this.countryRepository.findOne({where: {id}, relations: ['states']})

    if (!country) throw new BadRequestException('País no econtrado')
    return country;
  }

  async create(data: CreateGeographyDto) {
    const newCountry = this.countryRepository.create(data)
    return this.countryRepository.save(newCountry)
  }
  
  async preloadCountries() {
    const countries = await this.countryRepository.find()
    if (countries.length > 0) {
      console.log("Existen Países");
      return
    }
    
    const countriesData = loadCountries();
  
    for await (const countryData of countriesData) {
      const newCountry = this.countryRepository.create(countryData)
      await this.countryRepository.save(newCountry);
    }
    console.log("Load Countries");
    return true
  }
}
