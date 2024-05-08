import { Module } from '@nestjs/common';
import { CoworkingsService } from './coworkings.service';
import { CoworkingsController } from './coworkings.controller';
import { RequestsModule } from '../requests/requests.module';
import { Coworkings } from 'src/entities/coworkings.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [RequestsModule, TypeOrmModule.forFeature([Coworkings])],
  controllers: [CoworkingsController],
  providers: [CoworkingsService],
})
export class CoworkingModule {}
