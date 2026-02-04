import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as Minio from 'minio';
import { randomUUID } from 'crypto';

@Injectable()
export class MinioService {
  private minioClient: Minio.Client;
  private readonly bucketName = 'uploads';

  constructor() {
    this.minioClient = new Minio.Client({
      endPoint: process.env.MINIO_ENDPOINT || 'localhost',
      port: Number(process.env.MINIO_PORT) || 9000,
      useSSL: false,
      accessKey: process.env.MINIO_ACCESS_KEY || 'minioadmin',
      secretKey: process.env.MINIO_SECRET_KEY || 'minioadmin',
    });
  }

  async upload(file: Express.Multer.File) {
    try {
      // Créer le bucket s’il n’existe pas
      const exists = await this.minioClient.bucketExists(this.bucketName);
      if (!exists) {
        await this.minioClient.makeBucket(this.bucketName);
      }

      const fileKey = `${Date.now()}-${randomUUID()}-${file.originalname}`;

      await this.minioClient.putObject(
        this.bucketName,
        fileKey,
        file.buffer,
        file.size,
        { 'Content-Type': file.mimetype }
      );

      return {
        key: fileKey,
        uploadedAt: new Date(),
      };
    } catch (error) {
      throw new InternalServerErrorException('File upload failed');
    }
  }
}
