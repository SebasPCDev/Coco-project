import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserCoworkingModule } from './modules/user-coworking/user-coworking.module';
import { CoworkingModule } from './modules/coworking/coworking.module';
import { UserEmployeeModule } from './modules/user-employee/user-employee.module';
import { CompanyModule } from './modules/company/company.module';
import { UserModule } from './modules/user/user.module';
import { BookingsModule } from './modules/bookings/bookings.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [UserCoworkingModule, CoworkingModule, UserEmployeeModule, CompanyModule, UserModule, BookingsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
