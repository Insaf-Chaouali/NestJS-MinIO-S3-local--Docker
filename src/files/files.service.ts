import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { promises as fs } from 'fs';
import { MinioService } from '../storage/minio.service';

@Injectable()
export class FilesService {
  private uploadPath = join(__dirname, '../../uploads');

  constructor(private readonly minioService: MinioService) {}

  async uploadFile(file: Express.Multer.File) {
    if (!file) throw new Error('No file provided');

    // 1️⃣ Sauvegarde locale
    await fs.mkdir(this.uploadPath, { recursive: true });
    const localFileName = `${Date.now()}-${file.originalname}`;
    const localFilePath = join(this.uploadPath, localFileName);
    await fs.writeFile(localFilePath, file.buffer);

    // 2️⃣ Sauvegarde sur MinIO
    const minioResult = await this.minioService.upload(file);

    return {
      originalName: file.originalname,
      local: {
        filename: localFileName,
        path: localFilePath,
        url: `http://localhost:3000/uploads/${localFileName}`,
      },
      minio: {
        key: minioResult.key,
        uploadedAt: minioResult.uploadedAt,
      },
      size: file.size,
      type: file.mimetype,
    };
  }
}
