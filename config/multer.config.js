const multer = require('multer');
const firebaseStorage = require('multer-firebase-storage');
const firebase = require('./firebase.config');
const admin = require('firebase-admin');
const serviceAccount = require('../drive-adec9-firebase-adminsdk-fbsvc-16fbfe6bcc.json');

const storage = firebaseStorage({
credentials: admin.credential.cert(serviceAccount),
  bucketName: 'drive-adec9.firebasestorage.app',
  unique: true,
});

const upload = multer({
  storage: storage,
});

module.exports = upload;
