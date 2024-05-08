import { Module } from '@nestjs/common';
import { CoworkingService } from './coworking.service';
import { CoworkingController } from './coworking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coworkings } from 'src/entities/coworkings.entity';

@Module({
  controllers: [CoworkingController],
  providers: [CoworkingService],
  imports: [TypeOrmModule.forFeature([Coworkings])],
})
export class CoworkingModule {
  constructor(private readonly coworkingService: CoworkingService) {}

  async onModuleInit() {
    await this.coworkingService.preloadCoworkings();
  }
}
