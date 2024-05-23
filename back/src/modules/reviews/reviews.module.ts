import { Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { Coworkings } from 'src/entities/coworkings.entity';
import { Reviews } from 'src/entities/reviews.entity';

@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService],
  imports:[
    TypeOrmModule.forFeature([Users, Coworkings, Reviews]),
  ]
})
export class ReviewsModule {}
