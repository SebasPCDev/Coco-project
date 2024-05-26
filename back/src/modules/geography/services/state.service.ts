import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { State } from 'src/entities/state.entity';
import { Repository } from 'typeorm';
import { CreateStateDto } from '../geography.dto';
import { CountryService } from './country.service';

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
    
  }
}
