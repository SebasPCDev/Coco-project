import {
  Controller,
  Get,
  Post,
  Body,
  //Put,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';

import { CreateCompaniesDto } from './companies.dto';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Role } from 'src/models/roles.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { CompaniesService } from './companies.service';
import { UUID } from 'crypto';
import { CreateEmployeeDto } from '../users/users.dto';

@ApiTags('companies')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) { }

  @Get(':id')
  getCompanyById(@Param('id') id: string) {
    return this.companiesService.getCompanyById(id);
  }

  @Post()
  create(@Body() createCompaniesDto: CreateCompaniesDto) {
    return this.companiesService.create(createCompaniesDto);
  }

  @Roles(Role.SUPERADMIN)
  @UseGuards(RolesGuard)
  @Get()
  getAllCompanies() {
    return this.companiesService.getAllCompanies();
  }

  @Roles(Role.SUPERADMIN)
  @UseGuards(RolesGuard)
  @Post('activate')
  activateCoworking(@Body() data: { id: UUID }) {
    return this.companiesService.activateCompany(data.id as UUID);
  }

  @Roles(Role.ADMIN_COMPANY)
  @UseGuards(RolesGuard)
  @Post('create-employee')
  createEmployee(@Req() request, @Body() data: CreateEmployeeDto) {
    const adminCompanyId = request.user.id;
    return this.companiesService.createEmployee(adminCompanyId as UUID, data);
  }


  /* @Put(':id')
  update(@Param('id') id: string, @Body() updateCompaniesDto: UpdateCompaniesDto) {
    return this.CompaniesService.update(+id, updateCompaniesDto);
  } */

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companiesService.remove(+id);
  }
}
