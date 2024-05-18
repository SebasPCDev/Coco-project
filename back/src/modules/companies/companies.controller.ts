import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  // Delete,
  UseGuards,
  Req,
  Put,
  ParseUUIDPipe,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';

import { CreateCompaniesDto, UpdateCompaniesDto } from './companies.dto';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Role } from 'src/models/roles.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { CompaniesService } from './companies.service';
import { UUID } from 'crypto';
import { CreateEmployeeDto } from '../users/users.dto';
import { UserAuthCompanyGuard } from 'src/guards/userAuthCompany.guard';
import { CompanyStatus } from 'src/models/companyStatus.enum';

@ApiTags('companies')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) { }

  @Roles(Role.SUPERADMIN)
  @UseGuards(RolesGuard)
  @Get()
  getAllCompanies(
    @Query('status', new DefaultValuePipe(CompanyStatus.ACTIVE)) status: CompanyStatus,
    @Query('name') name: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(6), ParseIntPipe) limit: number) {
    return this.companiesService.getAllCompanies(status, name, page, limit);
  }

  @Get(':id')
  getCompanyById(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.companiesService.getCompanyById(id);
  }

  @Post()
  create(@Body() createCompaniesDto: CreateCompaniesDto) {
    return this.companiesService.create(createCompaniesDto);
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

  @Roles(Role.ADMIN_COMPANY)
  @UseGuards(RolesGuard, UserAuthCompanyGuard)
  @Put(':id')
  update(@Param('id', ParseUUIDPipe) id: UUID, @Body() changes: UpdateCompaniesDto) {
    return this.companiesService.update(id, changes);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.companiesService.remove(+id);
  // }
}
