import { BadRequestException } from '@nestjs/common';
import { memoryStorage } from 'multer';

export const uploadConfig = {
  storage: memoryStorage(), // <-- important !
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/png', 'image/jpeg', 'application/pdf'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new BadRequestException('Only PNG, JPG, PDF allowed'), false);
    }
    cb(null, true);
  },
};
