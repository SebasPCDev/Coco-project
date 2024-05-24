import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  // Delete,
  ParseUUIDPipe,
  UseGuards,
  Req,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto, UpdateDto, UpdateUsersDto } from './users.dto';
import { UUID } from 'crypto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/models/roles.enum';
import { RolesGuard } from 'src/guards/roles.guard';
// import { UserAuthGuard } from 'src/guards/userAuth.guard';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) { }

  @Roles(Role.SUPERADMIN)
  @UseGuards(RolesGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Post()
  create(@Body() createUserDto: CreateUsersDto) {
    return this.userService.create(createUserDto);
  }

  @Get('profile')
  getProfile(@Req() request) {
    const userId = request.user.id
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

  // @UseGuards(UserAuthGuard)
  @Put(':id')
  update(@Param('id', ParseUUIDPipe) id: UUID, @Body() changes: UpdateUsersDto) {
    return this.userService.update(id, changes);
  }

 }
