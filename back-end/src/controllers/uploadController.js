import multer from 'multer';

const storageConfig = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/images/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({
  storage: storageConfig
});

const uploadFile = async (req, res) => {
  try {
    res.json({
      message: 'success',
      text: 'File saved on server.',
      payload: `File path: /${req.file.path}`
    });
  } catch (error) {
    res.status(500).json({
      message: 'falt',
      text: 'Internal Server Error.',
      payload: { error }
    });
  }
};

export { uploadFile };
