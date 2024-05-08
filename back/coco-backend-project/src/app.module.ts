import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserCoworkingModule } from './modules/user-coworking/user-coworking.module';
import { CoworkingModule } from './modules/coworking/coworking.module';
import { UserEmployeeModule } from './modules/user-employee/user-employee.module';
import { CompanyModule } from './modules/company/company.module';
import { UsersModule } from './modules/user/users.module';
import { BookingsModule } from './modules/bookings/bookings.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestsModule } from './modules/requests/requests.module';
import { JwtModule } from '@nestjs/jwt';
import { AmenitiesModule } from './modules/amenities/amenities.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    UserCoworkingModule,
    CoworkingModule,
    UserEmployeeModule,
    CompanyModule,
    UsersModule,
    BookingsModule,
    AuthModule,
    RequestsModule,
    JwtModule.register({
      global: true,
      // signOptions: { expiresIn: '1h' },
      secret: process.env.JWT_SECRET,
    }),
    AmenitiesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
