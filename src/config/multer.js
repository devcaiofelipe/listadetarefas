import multer from 'multer';
import { extname, resolve } from 'path';



export default {
  storage: multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, resolve(__dirname, '..', 'uploads', 'avatars'));
    },
    filename: function(req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
    }
  }),
  fileFilter: (req, file, cb) => {
    if(file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
      return cb(new multer.MulterError('Arquivo precisa ser JPEG ou PNG'));
    };
    return cb(null, true);
  }
};
