const express = require('express');
const authMiddleware = require('../middlewares/auth');
const firebase = require('../config/firebase.config');

const router = express.Router();

const upload = require('../config/multer.config');

const fileModel = require('../models/files.model');

router.get('/home', authMiddleware, async (req, res) => {
  try {
    const userFiles = await fileModel.find({
      user: req.user.userId,
    });

    // throw 'error';

    res.render('home', {
      files: userFiles,
    });
  } catch {
    res.status(500).json({
      message: 'Server Error',
    });
  }
});

router.post(
  '/upload',
  authMiddleware,
  upload.single('file'),
  async (req, res) => {
    const newFile = await fileModel.create({
      path: req.file.path,
      originalname: req.file.originalname,
      user: req.user.userId,
    });
    res.json(newFile);
  }
);

router.get('/download/:path', authMiddleware, async (req, res) => {
  const loggedInUser = req.user.userId;
  const path = req.params.path;

  console.log(req.params);

  const file = await fileModel.findOne({
    user: loggedInUser,
    path: path,
  });

  if (!file) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }

  const signedUrl = await firebase
    .storage()
    .bucket()
    .file(path)
    .getSignedUrl({
      action: 'read',
      expires: Date.now() + 60 * 1000,
    });

  res.redirect(signedUrl[0]);
});

module.exports = router;
