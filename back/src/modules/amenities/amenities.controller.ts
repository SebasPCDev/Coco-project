import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AmenitiesService } from './amenities.service';
import { UUID } from 'crypto';
import { CreateAmenitiesDto, UpdateAmenitiesDto } from './amenities.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/models/roles.enum';
import { RolesGuard } from 'src/guards/roles.guard';
import { Public } from 'src/decorators/public.decorator';

@ApiTags('Amenities')
@UseGuards(AuthGuard)
@Controller('amenities')
export class AmenitiesController {
  constructor(private readonly amenitiesService: AmenitiesService) { }

  @Public()
  @Get()
  findAll() {
    return this.amenitiesService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.amenitiesService.findOne(id);
  }

  @ApiBearerAuth()
  @Roles(Role.SUPERADMIN)
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() amenityData: CreateAmenitiesDto) {
    return this.amenitiesService.create(amenityData);
  }

  @ApiBearerAuth()
  @Roles(Role.SUPERADMIN)
  @UseGuards(RolesGuard)
  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() changes: UpdateAmenitiesDto,
  ) {
    return this.amenitiesService.update(id, changes);
  }

  @ApiBearerAuth()
  @Roles(Role.SUPERADMIN)
  @UseGuards(RolesGuard)
  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.amenitiesService.delete(id);
  }
}
