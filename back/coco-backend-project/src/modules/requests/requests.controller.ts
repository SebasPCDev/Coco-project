import {
  Body,
  ConflictException,
  Controller,
  DefaultValuePipe,
  Get,
  ParseEnumPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RequestDtoCoworking } from './requestCoworking.dto';
import { RequestDtoCompany } from './requestCompany.dto';
import { RequestsService } from './requests.service';
import { TypeCompany } from 'src/models/typeCompany.enum';
import { CoworkingStatus } from 'src/models/coworkingStatus.enum';
import { RolesGuard } from 'src/guards/roles.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/models/roles.enum';
import { Public } from 'src/decorators/public.decorator';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('requests')
@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Public()
  @Post('coworking')
  async addCowork(@Body() coworking: RequestDtoCoworking) {
    coworking.type = TypeCompany.COWORKING;

    try {
      const result = await this.requestsService.addCowork(coworking);
      return result;
    } catch (error) {
      if (error instanceof ConflictException) {
        return { message: 'El correo ya está en uso' };
      }
      throw error;
    }
  }

  @Public()
  @Post('company')
  async addCompany(@Body() company: RequestDtoCompany) {
    company.type = TypeCompany.COMPANY;

    try {
      const result = await this.requestsService.addCompany(company);
      return result;
    } catch (error) {
      if (error instanceof ConflictException) {
        return { message: 'El correo ya está en uso' };
      }
      throw error;
    }
  }

  @Roles(Role.SUPERADMIN)
  @UseGuards(RolesGuard)
  @Get()
  async getrequests(
    @Query(
      'type',
      new DefaultValuePipe(TypeCompany.COMPANY),
      new ParseEnumPipe(TypeCompany),
    )
    type: TypeCompany,
    @Query(
      'status',
      new DefaultValuePipe(CoworkingStatus.PENDING),
      new ParseEnumPipe(CoworkingStatus),
    )
    status: CoworkingStatus,
  ) {
    try {
      const result = await this.requestsService.getRequest(type, status);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
