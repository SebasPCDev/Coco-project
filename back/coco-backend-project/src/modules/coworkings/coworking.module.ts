import { Module } from '@nestjs/common';
import { CoworkingsService } from './coworkings.service';
import { CoworkingsController } from './coworkings.controller';
import { RequestsModule } from '../requests/requests.module';
import { Coworkings } from 'src/entities/coworkings.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule,
    RequestsModule,
    TypeOrmModule.forFeature([Coworkings]),
  ],
  controllers: [CoworkingsController],
  providers: [CoworkingsService],
})
export class CoworkingModule {
  constructor(private readonly coworkingService: CoworkingsService) {}

  async onModuleInit() {
    await this.coworkingService.preloadCoworkings();
  }
}
