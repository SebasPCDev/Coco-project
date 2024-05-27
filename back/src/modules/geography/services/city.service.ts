import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from 'src/entities/city.entity';
import { Repository } from 'typeorm';
import { CreateCityDto } from '../geography.dto';
import { StateService } from './state.service';
import { loadCities } from 'src/utils/loadData';

@Injectable()
export class CityService {
    constructor(
    @InjectRepository(City)
    private cityRepository: Repository<City>,
    private readonly stateService: StateService
  ) {}

  async getAllCities() {
    const cities = await this.cityRepository.find()
    return cities;
  }

  async getCity(id: number) {
    const city = await this.cityRepository.findOneBy({id})

    if (!city) throw new BadRequestException('Ciudad no econtrada')
    return city;
  }

  async create(data: CreateCityDto) {
    const state = await this.stateService.getState(data.stateId);

    const newCity = this.cityRepository.create({...data, state});
    return this.cityRepository.save(newCity)
  }

  async preloadCities() {
    
    const citiesData = loadCities();
    const states = await this.stateService.getAllStates()

    for await (const state of states) {
      const cities = citiesData[state.name];
      if (cities && cities.length > 0) {
        for await (const cityData of cities) {
          const newState = this.cityRepository.create({...cityData, state})
          await this.cityRepository.save(newState)
        }
      }
    }
    console.log("## Load Cities    ##");
    console.log("####################");
    return true
  }
}
