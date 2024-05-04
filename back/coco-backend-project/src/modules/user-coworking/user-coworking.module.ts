import { Module } from '@nestjs/common';
import { UserCoworkingService } from './user-coworking.service';
import { UserCoworkingController } from './user-coworking.controller';

@Module({
  controllers: [UserCoworkingController],
  providers: [UserCoworkingService],
})
export class UserCoworkingModule {}
