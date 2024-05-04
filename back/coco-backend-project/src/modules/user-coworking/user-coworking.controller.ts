import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserCoworkingService } from './user-coworking.service';
import { CreateUserCoworkingDto } from './user-coworking.dto';
import { UpdateUserCoworkingDto } from './dto/update-user-coworking.dto';

@Controller('user-coworking')
export class UserCoworkingController {
  constructor(private readonly userCoworkingService: UserCoworkingService) {}

  @Post()
  create(@Body() createUserCoworkingDto: CreateUserCoworkingDto) {
    return this.userCoworkingService.create(createUserCoworkingDto);
  }

  @Get()
  findAll() {
    return this.userCoworkingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userCoworkingService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserCoworkingDto: UpdateUserCoworkingDto,
  ) {
    return this.userCoworkingService.update(+id, updateUserCoworkingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userCoworkingService.remove(+id);
  }
}
