import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CityService } from '../services/city.service';
import { CreateCityDto } from '../geography.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Geography')
@Controller('cities')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get()
  getAllCities() {
    return this.cityService.getAllCities();
  }

  @Get(':id')
  getCountry(@Param('id', ParseIntPipe) id: number) {
    return this.cityService.getCity(id);
  }

  @Post()
  create(@Body() data: CreateCityDto) {
    return this.cityService.create(data);
  }
}
