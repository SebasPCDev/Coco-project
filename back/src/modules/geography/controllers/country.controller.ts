import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CountryService } from '../services/country.service';
import { CreateGeographyDto } from '../geography.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Geography')
@Controller('countries')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  getAllCountries() {
    return this.countryService.getAllCountries();
  }

  @Get(':id')
  getCountry(@Param('id', ParseIntPipe) id: number) {
    return this.countryService.getCountry(id);
  }

  @Post()
  create(@Body() data: CreateGeographyDto) {
    return this.countryService.create(data);
  }
}
