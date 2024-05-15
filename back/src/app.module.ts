import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoworkingModule } from './modules/coworkings/coworking.module';
import { UsersModule } from './modules/users/users.module';
import { BookingsModule } from './modules/bookings/bookings.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestsModule } from './modules/requests/requests.module';
import { JwtModule } from '@nestjs/jwt';
import { AmenitiesModule } from './modules/amenities/amenities.module';
import { NodemailerModule } from './modules/nodemailer/nodemailer.module';
import { CompaniesModule } from './modules/companies/companies.module';
import { FilesModule } from './modules/files/files.module';

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
    UsersModule,
    CompaniesModule,
    CoworkingModule,
    BookingsModule,
    AuthModule,
    RequestsModule,
    JwtModule.register({
      global: true,
      // signOptions: { expiresIn: '1h' },
      secret: process.env.JWT_SECRET,
    }),
    AmenitiesModule,
    NodemailerModule,
    FilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
