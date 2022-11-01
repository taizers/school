import multer from 'multer';
import moment from 'moment';

const filesStorage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, 'files/storage/');
  },
  filename(req, file, callback) {
    const date = moment().format('DDMMYYYY-HHmmss_SSS');

    callback(null, `${date}-${file.originalname}`);
  },
});

const galeriesStorage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, 'files/galeries/');
  },
  filename(req, file, callback) {
    const date = moment().format('DDMMYYYY-HHmmss_SSS');

    callback(null, `${date}-${file.originalname}`);
  },
});

const avatarsStorage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, 'files/avatars/');
  },
  filename(req, file, callback) {
    const date = moment().format('DDMMYYYY-HHmmss_SSS');

    callback(null, `${date}-${file.originalname}`);
  },
});

const photoFilter = (req, file, callback) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

const limits = {
  fileSize: 1024 * 1024 * 5,
};

const filesLimits = {
  fileSize: 1024 * 1024 * 20,
};

export const uploadGaleryMiddleware = multer({
  storage: galeriesStorage,
  photoFilter,
  limits,
});

export const uploadAvatarMiddleware = multer({
  storage: avatarsStorage,
  photoFilter,
  limits,
});

export const uploadFilesMiddleware = multer({
  storage: filesStorage,
  filesLimits,
});
