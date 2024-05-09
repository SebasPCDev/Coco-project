import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NodemailerModule } from '../nodemailer/nodemailer.module';
import { CoworkingsService } from './coworkings.service';
import { CoworkingsController } from './coworkings.controller';
import { Coworkings } from 'src/entities/coworkings.entity';
import { Users } from 'src/entities/users.entity';
import { Request } from 'src/entities/requests.entity';

// imports: [AuthModule, TypeOrmModule.forFeature([Coworking])],
@Module({
  imports: [
    NodemailerModule,
    TypeOrmModule.forFeature([Coworkings, Request, Users]),
  ],
  controllers: [CoworkingsController],
  providers: [CoworkingsService],
})
export class CoworkingModule {
  constructor(private readonly coworkingsService: CoworkingsService) {}

  async onModuleInit() {
    await this.coworkingsService.preloadCoworkings();
  }
}
