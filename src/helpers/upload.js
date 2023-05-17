
const multer = require('multer');
const Upload = multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Specify the directory where files should be stored
      },
      filename: (req, file, cb) => {
        const fileName = `${Date.now()}-${file.originalname}`; // Generate a unique filename
        cb(null, fileName);
      },
    }),
  });
  module.exports={Upload}