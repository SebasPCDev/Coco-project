import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Users } from 'src/entities/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [TypeOrmModule.forFeature([Users])],
  exports: [UsersService],
})
export class UsersModule {
  constructor(private readonly usersService: UsersService) {}

  async onModuleInit() {
    await this.usersService.preloadSuperAdminUser();
  }
}
