import { Module } from '@nestjs/common';
import { UserEmployeeService } from './user-employee.service';
import { UserEmployeeController } from './user-employee.controller';

@Module({
  controllers: [UserEmployeeController],
  providers: [UserEmployeeService],
})
export class UserEmployeeModule {}
