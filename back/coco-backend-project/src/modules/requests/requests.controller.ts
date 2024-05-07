import { Body, ConflictException, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RequestDtoCoworking } from './requestCoworking.dto';
import { RequestDtoCompany } from './requestCompany.dto';
import { RequestsService } from './requests.service';

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
}
