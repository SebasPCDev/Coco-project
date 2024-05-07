import { Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Request } from 'src/entities/requests.entity';

@Module({
  providers: [RequestsService],
  controllers: [RequestsController],
  imports: [
    TypeOrmModule.forFeature([Request]),
    
  ]
})
export class RequestsModule {}
