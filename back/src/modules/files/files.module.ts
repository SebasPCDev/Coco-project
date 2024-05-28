import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { CoworkingModule } from '../coworkings/coworking.module';
import { CloudinaryConfig } from 'src/config/cloudinary';

@Module({
  imports: [CoworkingModule],
  controllers: [FilesController],
  providers: [FilesService, CloudinaryConfig],
})
export class FilesModule {}
