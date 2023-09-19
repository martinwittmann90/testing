/*----------------MULTER------------------------------*/
import { __dirname } from './configPath.js';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'public', 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploader = multer({ storage });

export { uploader };

/*----------------------Validate numbre-----------------*/
const validateNumber = (number) => {
  return number && !isNaN(number) && number > 0;
};

export { validateNumber };
