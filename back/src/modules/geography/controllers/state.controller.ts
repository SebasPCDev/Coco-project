import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { StateService } from '../services/state.service';
import { CreateStateDto } from '../geography.dto';

@Controller('states')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Get()
  getAllCountries() {
    return this.stateService.getAllStates();
  }

  @Get(':id')
  getCountry(@Param('id', ParseIntPipe) id: number) {
    return this.stateService.getState(id);
  }

  @Post()
  create(@Body() data: CreateStateDto) {
    return this.stateService.create(data);
  }
}

