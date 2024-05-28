import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  ParseUUIDPipe,
  Put,
  Req,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UUID } from 'crypto';

import { CoworkingsService } from './coworkings.service';
import {
  ActivateCoworkingsDto,
  CoworkingResponseDto,
  CreateCoworkingsDto,
  UpdateCoworkingsDto,
} from './coworkings.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Public } from 'src/decorators/public.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/models/roles.enum';
import { CoworkingStatus } from 'src/models/coworkingStatus.enum';
import { UpdateUsersDto } from '../users/users.dto';
import { CreateUserCoworkingsDto } from '../users/coworkings.dto';
import { UpdateBookingsDto } from '../bookings/bookings.dto';

@ApiTags('coworkings')
@UseGuards(AuthGuard)
@Controller('coworkings')
export class CoworkingsController {
  constructor(private readonly coworkingsService: CoworkingsService) { }

  @Public()
  @Get()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'country', required: false })
  @ApiQuery({ name: 'state', required: false })
  @ApiQuery({ name: 'city', required: false })
  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({ name: 'status', required: false })
  async getAllCoworkings(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(6), ParseIntPipe) limit: number,
    @Query('country') country?: string,
    @Query('state') state?: string,
    @Query('city') city?: string,
    @Query('name') name?: string,
    @Query('status') status?: CoworkingStatus,
  ) {
    return await this.coworkingsService.getAllCoworkings(
      page,
      limit,
      country,
      state,
      city,
      name,
      status,
    ) as CoworkingResponseDto;
  }

  @Get('all')
  @Public()
  getCoworkings() {
    return this.coworkingsService.getCoworkings();
  }

  @Get('countries')
  @Public()
  getCountries() {
    return this.coworkingsService.getCountries();
  }

  @Get('country/:country')
  @Public()
  getStates(@Param('country') country: string) {
    return this.coworkingsService.getStates(country);
  }

  @Get('country/:country/state/:state')
  @Public()
  getCities(@Param('country') country: string, @Param('state') state: string) {
    return this.coworkingsService.getCities(country, state);
  }

  @Roles(Role.ADMIN_COWORKING, Role.COWORKING, Role.SUPERADMIN)
  @UseGuards(RolesGuard)
  @Get(':id/bookings')
  getBookimgsByCoworking(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.coworkingsService.getBookingsByCoworking(id);
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

  @Roles(Role.ADMIN_COWORKING)
  @UseGuards(RolesGuard)
  @Post('create-user-coworking')
  createUserCoworking(@Req() request, @Body() data: CreateUserCoworkingsDto) {
    return this.coworkingsService.createUserCoworking(data);
  }

  @ApiBearerAuth()
  @Roles(Role.SUPERADMIN)
  @UseGuards(RolesGuard)
  @Post('activate')
  activateCoworking(@Body() data: ActivateCoworkingsDto) {
    return this.coworkingsService.activateCoworking(data.id as UUID);
  }

  @Put(':coworkingId/update-receptionist/:userId')
  updateReceptionist(
    @Param('coworkingId', ParseUUIDPipe) coworkingId: UUID,
    @Param('userId', ParseUUIDPipe) userId: UUID,
    @Body() changes: UpdateUsersDto,
    @Req() request,
  ) {
    const adminCoworking = request.user;
    return this.coworkingsService.updateReceptionist(
      adminCoworking,
      coworkingId,
      userId,
      changes,
    );
  }

  @ApiBearerAuth()
  @Roles(Role.COWORKING, Role.ADMIN_COWORKING, Role.SUPERADMIN)
  @UseGuards(RolesGuard)
  @Put(':coworkingId/booking/:bookingId')
  updateBooking(
    @Param('coworkingId', ParseUUIDPipe) coworkingId: UUID,
    @Param('bookingId', ParseUUIDPipe) bookingId: UUID,
    @Body() changes: UpdateBookingsDto,
    // @Req() request
  ) {
    return this.coworkingsService.updateBooking(
      coworkingId,
      bookingId,
      changes,
    );
  }

  @ApiBearerAuth()
  @Roles(Role.COWORKING, Role.ADMIN_COWORKING, Role.SUPERADMIN)
  @UseGuards(RolesGuard)
  @Put('checkIn/:bookingId')
  checkIn(
    @Param('bookingId', ParseUUIDPipe) bookingId: UUID,
    // @Param('coworkingId', ParseUUIDPipe) coworkingId: UUID,
    // @Req() request
  ) {
    // const user = request.user;
    return this.coworkingsService.checkIn(bookingId);
  }

  @ApiBearerAuth()
  @Roles(Role.ADMIN_COWORKING, Role.SUPERADMIN)
  @UseGuards(RolesGuard)
  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() changes: UpdateCoworkingsDto,
  ) {
    return this.coworkingsService.update(id, changes);
  }
}
