import {
  Controller,
  Get,
  Post,
  Body,
  //Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { CreateCompaniesDto } from './companies.dto';
import { CompaniesService } from './companies.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Role } from 'src/models/roles.enum';
import { Roles } from 'src/decorators/roles.decorator';

@ApiTags('companies')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('companies')
export class CompaniesController {
  constructor(private readonly CompaniesService: CompaniesService) {}

  @Post()
  create(@Body() createCompaniesDto: CreateCompaniesDto) {
    return this.CompaniesService.create(createCompaniesDto);
  }

  @Roles(Role.SUPERADMIN)
  @UseGuards(RolesGuard)
  @Get()
  getAllCompanies() {
    return this.CompaniesService.getAllCompanies();
  }

  @Get(':id')
  getCompanyById(@Param('id') id: string) {
    return this.CompaniesService.getCompanyById(id);
  }

  /* @Put(':id')
  update(@Param('id') id: string, @Body() updateCompaniesDto: UpdateCompaniesDto) {
    return this.CompaniesService.update(+id, updateCompaniesDto);
  } */

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.CompaniesService.remove(+id);
  }
}
