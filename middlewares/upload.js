const multer = require('multer');
const path = require('path');

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});

let upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg'
    ) {
      callback(null, true);
    } else {
      console.log('File Format not supported');
      callback(new Error('File Format not supported'), false);
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 5
  }
});

module.exports = upload;
