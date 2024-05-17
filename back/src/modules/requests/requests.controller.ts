import {
  Body,
  ConflictException,
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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateRequestCoworkingDto } from './requestCoworking.dto';
import { RequestDtoCompany, UpdateRequestDto } from './requestCompany.dto';
import { RequestsService } from './requests.service';
import { TypeCompany } from 'src/models/typeCompany.enum';
import { RolesGuard } from 'src/guards/roles.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/models/roles.enum';
import { Public } from 'src/decorators/public.decorator';
import { StatusRequest } from 'src/models/statusRequest.enum';
import { QueryParamsValidator } from 'src/pipes/queryParamsValidator.pipe';
import { UUID } from 'crypto';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('requests')
@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) { }

  @Public()
  @Post('coworking')
  async addCowork(@Body() coworking: CreateRequestCoworkingDto) {
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
      new ParseEnumPipe(TypeCompany, {
        optional: true,
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      }),
      new QueryParamsValidator(),
    )
    type?: TypeCompany,
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
    try {
      const result = await this.requestsService.getRequest(type, status);
      return result;
    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.SUPERADMIN)
  @UseGuards(RolesGuard)
  @Put('decline/:id')
  declineRequest(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() changes: UpdateRequestDto,
  ) {
    return this.requestsService.declineRequest(id, changes);
  }

}
