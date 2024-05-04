import {
  Controller,
  Get,
  Post,
  Body,
  //Put,
  Param,
  Delete,
} from '@nestjs/common';
import { CoworkingService } from './coworking.service';
import { CreateCoworkingDto } from './coworking.dto';

@Controller('coworking')
export class CoworkingController {
  constructor(private readonly coworkingService: CoworkingService) {}

  @Post()
  create(@Body() createCoworkingDto: CreateCoworkingDto) {
    return this.coworkingService.create(createCoworkingDto);
  }

  @Get()
  findAll() {
    return this.coworkingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coworkingService.findOne(+id);
  }

  /*   @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCoworkingDto: UpdateCoworkingDto,
  ) {
    return this.coworkingService.update(+id, updateCoworkingDto);
  } */

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coworkingService.remove(+id);
  }
}
