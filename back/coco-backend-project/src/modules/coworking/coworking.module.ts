import { Module } from '@nestjs/common';
import { CoworkingService } from './coworking.service';
import { CoworkingController } from './coworking.controller';

@Module({
  controllers: [CoworkingController],
  providers: [CoworkingService],
})
export class CoworkingModule {}
