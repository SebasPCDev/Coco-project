import { Module } from '@nestjs/common';
import { NodemailerService } from './nodemailer.service';
import { NodemailerController } from './nodemailer.controller';

@Module({
  providers: [NodemailerService],
  controllers: [NodemailerController],
  exports: [NodemailerService],
})
export class NodemailerModule {}
