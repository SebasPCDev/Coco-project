import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
  UseGuards,
  Req,
  Put,
  Query,
  ParseIntPipe,
  ParseEnumPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto, UpdateDto, UpdateUsersDto, UsersResponseDto } from './users.dto';
import { UUID } from 'crypto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/models/roles.enum';
import { RolesGuard } from 'src/guards/roles.guard';
import { UserAuthGuard } from 'src/guards/userAuth.guard';
import { UpdateBookingsDto } from '../bookings/bookings.dto';
import { UserStatus } from 'src/models/userStatus.enum';
import { Public } from 'src/decorators/public.decorator';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) { }

  @Roles(Role.SUPERADMIN)
  @UseGuards(RolesGuard)
  @Get()
  @ApiQuery({ name: 'status', required: false })
  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({ name: 'role', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  async findAll(
    @Query('status', new ParseEnumPipe(UserStatus, { optional: true }))
    status?: UserStatus,
    @Query('name') name?: string,
    @Query('role', new ParseEnumPipe(Role, { optional: true })) role?: Role,
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
  ) {
    return await this.userService.findAll(status, name, role, page, limit) as UsersResponseDto;
  }

  @Post()
  create(@Body() createUserDto: CreateUsersDto) {
    return this.userService.create(createUserDto);
  }

  @Get('profile')
  getProfile(@Req() request) {
    const userId = request.user.id;
    return this.userService.findOne(userId);
  }

  @Roles(Role.SUPERADMIN)
  @UseGuards(RolesGuard)
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.userService.findOne(id);
  }

  // @UseGuards(UserAuthGuard)
  @Put('updateUser/:id')
  updateUser(@Param('id', ParseUUIDPipe) id: UUID, @Body() changes: UpdateDto) {
    return this.userService.updateUser(id, changes);
  }

  @Roles(Role.COWORKING, Role.ADMIN_COWORKING, Role.SUPERADMIN)
  @UseGuards(RolesGuard)
  @Put('booking/:bookingId')
  updateBooking(
    @Param('bookingId', ParseUUIDPipe) bookingId: UUID,
    @Body() changes: UpdateBookingsDto,
    @Req() request,
  ) {
    const user = request.user;
    return this.userService.updateBooking(user.id, bookingId, changes);
  }

  @Public()
  @Put('checkIn/email')
  checkInByEmail(@Body('token') token: string) {
    return this.userService.checkInByEmail(token);
  }

  @Roles(Role.EMPLOYEE, Role.SUPERADMIN)
  @UseGuards(RolesGuard)
  @Put('checkIn/:bookingId')
  checkIn(@Param('bookingId', ParseUUIDPipe) bookingId: UUID, @Req() request) {
    const user = request.user;
    return this.userService.checkIn(user.id, bookingId);
  }

  @UseGuards(UserAuthGuard)
  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() changes: UpdateUsersDto,
  ) {
    return this.userService.update(id, changes);
  }
}
