import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  UseGuards,
  Put,
  ParseUUIDPipe,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingsDto, UpdateBookingsDto } from './bookings.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { UUID } from 'crypto';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/models/roles.enum';
import { RolesGuard } from 'src/guards/roles.guard';
import { Users } from 'src/entities/users.entity';

@ApiTags('bookings')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) { }

  @Get()
  findAll() {
    return this.bookingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.bookingsService.findOne(id);
  }

  @Post()
  create(@Req() request, @Body() data: CreateBookingsDto) {
    const user = request.user;
    return this.bookingsService.create(user.id, data);
  }

  @Roles(Role.SUPERADMIN)
  @UseGuards(RolesGuard)
  @Put(':id')
  update(@Param('id', ParseUUIDPipe) id: UUID, @Body() updateBookingDto: UpdateBookingsDto) {
    return this.bookingsService.update(id, updateBookingDto);
  }

  //!Endpoint para cancelar-> recibe como parametro id de booking ->body recibe el estado
  @Roles(Role.SUPERADMIN,Role.EMPLOYEE,Role.COWORKING,Role.ADMIN_COWORKING)
  @UseGuards(RolesGuard)
  @Put('cancel/:id')
  CancelBooking(@Param('id', ParseUUIDPipe) id: UUID, @Body() updateBooking: UpdateBookingsDto,@Req() request) {

    const user = request.user;
    return this.bookingsService.CancelBooking(id, updateBooking,user.id);
  }
  

}
