import { Module } from '@nestjs/common';
import { CityService } from './services/city.service';
import { CityController } from './controllers/city.controller';
import { CountryController } from './controllers/country.controller';
import { StateController } from './controllers/state.controller';
import { CountryService } from './services/country.service';
import { StateService } from './services/state.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from 'src/entities/city.entity';
import { State } from 'src/entities/state.entity';
import { Country } from 'src/entities/country.entity';

@Module({
  imports: [TypeOrmModule.forFeature([City, State, Country])],
  controllers: [CityController, CountryController, StateController],
  providers: [CityService, CountryService, StateService],
  exports: [CityService, CountryService, StateService],
})
export class GeographyModule {
  constructor(
    private readonly countryService: CountryService,
    private readonly stateService: StateService,
    private readonly cityService: CityService,
  ) {}

  async onModuleInit() {}
}
