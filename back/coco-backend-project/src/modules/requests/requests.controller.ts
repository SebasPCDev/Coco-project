import { Body, ConflictException, Controller, DefaultValuePipe, Get, ParseEnumPipe, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RequestDtoCoworking } from './requestCoworking.dto';
import { RequestDtoCompany } from './requestCompany.dto';
import { RequestsService } from './requests.service';
import { TypeCompany } from 'src/models/typeCompany.enum';
import { CoworkingStatus } from 'src/models/coworkingStatus.enum';


@ApiTags("requests")
@Controller('requests')
export class RequestsController {

    constructor(private readonly requestsService: RequestsService) {}

    @Post('coworking')
    async addCowork(@Body()coworking:RequestDtoCoworking) {
        coworking.type = "coworking"

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

    @Post('company')
    async addCompany(@Body() company: RequestDtoCompany) {
        company.type = "company";

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

    @Get()
    async getrequests(
        @Query("type",new DefaultValuePipe(TypeCompany.COMPANY),new ParseEnumPipe(TypeCompany)) type:TypeCompany,
        @Query("status",new DefaultValuePipe(CoworkingStatus.PENDING),new ParseEnumPipe(CoworkingStatus)) status:CoworkingStatus
    ) {
        try {
            const params = {
                type:type,
                status:status
            }
            const result = await this.requestsService.getRequest(params)
            return result;
        } catch (error) {
          
            throw error;
        }
    }
}
