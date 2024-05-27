import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { State } from 'src/entities/state.entity';
import { Repository } from 'typeorm';
import { CreateStateDto } from '../geography.dto';
import { CountryService } from './country.service';
import { loadStates } from 'src/utils/loadData';

@Injectable()
export class StateService {
  constructor(
    @InjectRepository(State)
    private stateRepository: Repository<State>,
    private readonly countryService: CountryService
  ) {}

  async getAllStates() {
    const states = await this.stateRepository.find()
    return states;
  }

  async getState(id: number) {
    const state = await this.stateRepository.findOne({where: {id}, relations: ['cities']})
    if (!state) throw new BadRequestException('Estado no econtrado')
    return state;
  }

  async create(data: CreateStateDto) {
    const country = await this.countryService.getCountry(data.countryId);
    const newState = this.stateRepository.create({...data, country});
    return this.stateRepository.save(newState)
  }

  async preloadStates() {
    
    const statesData = loadStates();
    const countries = await this.countryService.getAllCountries()

    for await (const country of countries) {
      const states = statesData[country.name];
      if (states && states.length > 0) {
        for await (const stateData of states) {
          const newState = this.stateRepository.create({...stateData, country})
          await this.stateRepository.save(newState)
        }
      }
    }
    console.log("## Load States    ##");
    return true   
  }
}
