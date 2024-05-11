import {
  Controller,
  Get,
  Post,
  Body,
  //Put,
  Param,
  //Delete,
  UseGuards,
  ParseUUIDPipe,
  Put,
  Req,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UUID } from 'crypto';

import { CoworkingsService } from './coworkings.service';
import {
  ActivateCoworkingsDto,
  CreateCoworkingsDto,
  UpdateCoworkingsDto,
} from './coworkings.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Public } from 'src/decorators/public.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/models/roles.enum';

@ApiTags('corokings')
@UseGuards(AuthGuard)
@Controller('coworkings')
export class CoworkingsController {
  constructor(private readonly coworkingsService: CoworkingsService) {}

  @Get()
  @Public()
  getAllCoworkings( 
    @Query('country') country: string,
    @Query('state') state: string,
    @Query('city') city: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(6), ParseIntPipe) limit: number) {
      console.log("page", page, "number", limit);
    return this.coworkingsService.getAllCoworkings(page, limit, country, state, city);
  }

  @Public()
  @Get(':id')
  getCoworkingById(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.coworkingsService.getCoworkingById(id);
  }

  @ApiBearerAuth()
  @Roles(Role.ADMIN_COWORKING)
  @UseGuards(RolesGuard)
  @Post()
  create(@Req() request, @Body() data: CreateCoworkingsDto) {
    const user = request.user;
    return this.coworkingsService.create(user.id as UUID, data);
  }

  @ApiBearerAuth()
  @Roles(Role.SUPERADMIN)
  @UseGuards(RolesGuard)
  @Post('activate')
  activateCoworking(@Body() data: ActivateCoworkingsDto) {
    return this.coworkingsService.activateCoworking(data.id as UUID);
  }

  @ApiBearerAuth()
  @Roles(Role.ADMIN_COWORKING)
  @UseGuards(RolesGuard)
  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() changes: UpdateCoworkingsDto,
  ) {
    return this.coworkingsService.update(id, changes);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.coworkingsService.remove(+id);
  // }
}
