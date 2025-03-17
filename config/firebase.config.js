const Firebase = require('firebase-admin');
const serviceAccount = require('../drive-adec9-firebase-adminsdk-fbsvc-16fbfe6bcc.json');
const firebase = Firebase.initializeApp({
credential: Firebase.credential.cert(serviceAccount),
storageBucket: 'drive-adec9.firebasestorage.app',
});

module.exports = firebase;
