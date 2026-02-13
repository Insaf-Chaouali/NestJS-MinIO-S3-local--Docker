import { Test, TestingModule } from '@nestjs/testing';
import { FilesService } from './files.service';
import { MinioService } from '../storage/minio.service'; // Ajuste le chemin si besoin

describe('FilesService', () => {
  let service: FilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilesService,
        {
          provide: MinioService,
          useValue: {
            // Liste ici les méthodes que FilesService appelle, par exemple :
            upload: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<FilesService>(FilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});