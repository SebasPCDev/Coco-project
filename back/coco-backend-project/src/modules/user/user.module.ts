import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Users } from 'src/entities/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([Users])],
})
export class UserModule {
  constructor(private readonly userService: UserService) {}

  async onModuleInit() {
    await this.userService.preloadSuperAdminUser();
  }
}
