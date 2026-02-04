import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { uploadConfig } from './upload.config';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', uploadConfig))
  async upload(@UploadedFile() file: Express.Multer.File) {
    return this.filesService.uploadFile(file);
  }
}
