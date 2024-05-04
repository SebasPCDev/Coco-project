import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserEmployeeService } from './user-employee.service';
import { CreateUserEmployeeDto } from './user-employee.dto';
import { UpdateUserEmployeeDto } from './dto/update-user-employee.dto';

@Controller('user-employee')
export class UserEmployeeController {
  constructor(private readonly userEmployeeService: UserEmployeeService) {}

  @Post()
  create(@Body() createUserEmployeeDto: CreateUserEmployeeDto) {
    return this.userEmployeeService.create(createUserEmployeeDto);
  }

  @Get()
  findAll() {
    return this.userEmployeeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userEmployeeService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserEmployeeDto: UpdateUserEmployeeDto,
  ) {
    return this.userEmployeeService.update(+id, updateUserEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userEmployeeService.remove(+id);
  }
}
