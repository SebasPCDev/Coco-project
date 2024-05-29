import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
  Put,
  ParseUUIDPipe,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';

import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UUID } from 'crypto';
import { RolesGuard } from 'src/guards/roles.guard';
import { CompaniesResponse, UpdateCompaniesDto } from './companies.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { Role } from 'src/models/roles.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { CompaniesService } from './companies.service';
import { CompanyStatus } from 'src/models/companyStatus.enum';
import { CreateEmployeeDto, UpdateEmployeeDto } from '../users/employees.dto';
import { UserAuthCompanyGuard } from 'src/guards/userAuthCompany.guard';
// import { UserAuthCompanyGuard } from 'src/guards/userAuthCompany.guard';

@ApiTags('Companies')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) { }

  @Roles(Role.SUPERADMIN)
  @UseGuards(RolesGuard)
  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'status', required: false })
  @Get()
  async getAllCompanies(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(6), ParseIntPipe) limit: number,
    @Query('status', new DefaultValuePipe(CompanyStatus.ACTIVE))
    status: CompanyStatus,
    @Query('name') name?: string,
  ) {
    return await this.companiesService.getAllCompanies(status, page, limit, name) as CompaniesResponse;
  }

  // Por pedido hacer nuevo endpoint son filtros ni paginacion
  @Roles(Role.SUPERADMIN)
  @UseGuards(RolesGuard)
  @Get('all')
  getCoworkings() {
    return this.companiesService.getCompanies();
  }

  @UseGuards(UserAuthCompanyGuard)
  @Get(':id')
  getCompanyById(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.companiesService.getCompanyById(id);
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

  @Put('billing/:companyId')
  billing(@Param('companyId', ParseUUIDPipe) companyId: UUID) {
    return this.companiesService.billing(companyId)
  }

  @Put(':companyId/update-employee/:userId')
  updateEmployee(
    @Param('companyId', ParseUUIDPipe) companyId: UUID,
    @Param('userId', ParseUUIDPipe) userId: UUID,
    @Body() changes: UpdateEmployeeDto,
    @Req() request,
  ) {
    const adminCompany = request.user;
    return this.companiesService.updateEmployee(
      adminCompany,
      companyId,
      userId,
      changes,
    );
  }

  @Roles(Role.ADMIN_COMPANY, Role.SUPERADMIN)
  @UseGuards(RolesGuard)
  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() changes: UpdateCompaniesDto,
  ) {
    return this.companiesService.update(id, changes);
  }
}
