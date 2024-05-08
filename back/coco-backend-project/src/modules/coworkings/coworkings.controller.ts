import {
  Controller,
  Get,
  Post,
  Body,
  //Put,
  Param,
  Delete,
} from '@nestjs/common';
import { CoworkingsService } from './coworkings.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateCoworkingsDto } from './coworkings.dto';
import { UUID } from 'crypto';

@ApiTags('corokings')
@Controller('coworkings')
export class CoworkingsController {
  constructor(private readonly coworkingService: CoworkingsService) {}

  @Post()
  create(@Body() data: CreateCoworkingsDto) {
    console.log(data);
    return this.coworkingService.create(data);
  }

  @Post('activate')
  activateCoworking(@Body() data: { id: UUID }) {
    console.log(data);
    return this.coworkingService.activateCoworking(data.id);
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
