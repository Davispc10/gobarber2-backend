import { randomBytes } from 'crypto';
import { diskStorage } from 'multer';
import { resolve } from 'path';

const tmpFolder = resolve('tmp');

export const uploadConfig = {
  tmpFolder,
  uploadsFolder: resolve(tmpFolder, 'uploads'),

  storage: diskStorage({
    destination: tmpFolder,
    filename(req, file, callback) {
      const fileHash = randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),

  fileFilter: (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
  },
};
