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
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UUID } from 'crypto';

import { CoworkingsService } from './coworkings.service';
import { CreateCoworkingsDto, UpdateCoworkingsDto } from './coworkings.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Public } from 'src/decorators/public.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/models/roles.enum';

@ApiTags('corokings')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('coworkings')
export class CoworkingsController {
  constructor(private readonly coworkingsService: CoworkingsService) {}

  @Public()
  @Get()
  getAllCoworkings() {
    return this.coworkingsService.getAllCoworkings();
  }

  @Public()
  @Get(':id')
  getCoworkingById(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.coworkingsService.getCoworkingById(id);
  }

  @Post()
  create(@Body() data: CreateCoworkingsDto) {
    console.log(data);
    return this.coworkingsService.create(data);
  }

  @Roles(Role.SUPERADMIN)
  @UseGuards(RolesGuard)
  @Post('activate')
  activateCoworking(@Body() data: { id: UUID }) {
    console.log(data);
    return this.coworkingsService.activateCoworking(data.id);
  }

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
