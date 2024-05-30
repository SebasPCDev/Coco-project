import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseEnumPipe,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { RequestsService } from './requests.service';
import { CompanyType } from 'src/models/companyType.enum';
import { RolesGuard } from 'src/guards/roles.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/models/roles.enum';
import { Public } from 'src/decorators/public.decorator';
import { StatusRequest } from 'src/models/statusRequest.enum';
import { QueryParamsValidator } from 'src/pipes/queryParamsValidator.pipe';
import { UUID } from 'crypto';
import {
  CreateRequestCompanyDto,
  CreateRequestCoworkingDto,
  UpdateRequestCoworkingDto,
} from './requests.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Requests')
@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) { }

  @Roles(Role.SUPERADMIN)
  @UseGuards(RolesGuard)
  @Get()
  @ApiQuery({ name: 'type', required: false })
  @ApiQuery({ name: 'status', required: false })
  async getrequests(
    @Query(
      'type',
      new ParseEnumPipe(CompanyType, {
        optional: true,
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      }),
      new QueryParamsValidator(),
    )
    type?: CompanyType,
    @Query(
      'status',
      new ParseEnumPipe(StatusRequest, {
        optional: true,
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      }),
      new QueryParamsValidator(),
    )
    status?: StatusRequest,
  ) {
    const result = await this.requestsService.getRequest(type, status);
    return result;
  }

  @Public()
  @Post('coworking')
  async addCowork(@Body() coworking: CreateRequestCoworkingDto) {
    coworking.type = CompanyType.COWORKING;
    return await this.requestsService.addCowork(coworking);
  }

  @Public()
  @Post('company')
  async addCompany(@Body() company: CreateRequestCompanyDto) {
    company.type = CompanyType.COMPANY;
    return await this.requestsService.addCompany(company);
  }

  @Roles(Role.SUPERADMIN)
  @UseGuards(RolesGuard)
  @Put('decline/:id')
  declineRequest(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() changes: UpdateRequestCoworkingDto,
  ) {
    return this.requestsService.declineRequest(id, changes);
  }
}
