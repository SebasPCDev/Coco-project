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

}
